import os
from datetime import datetime, timezone

from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import get_db, create_tables
from app.models import (
    Room, Participant, Answer,
    RoomOut, ParticipantCreate, ParticipantOut,
    AnswerCreate, AnswerOut, RoomStatus,
    ParticipantJoinEvent, ParticipantLeaveEvent, StageUpdateEvent,
)
from app.rooms import (
    generate_room_code, manager,
    record_stage_start, record_stage_complete,
    HIGH_VULNERABILITY_STAGES,
)


def _now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


_raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
_origins = ["*"] if _raw_origins == "*" else [o.strip() for o in _raw_origins.split(",")]

app = FastAPI(title="Identity Purpose Workshop")

# CORS configuration: allow all origins for development, or specific origins for production
# WebSocket connections require explicit origin support
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
def startup():
    create_tables()


# ---------------------------------------------------------------------------
# Room endpoints
# ---------------------------------------------------------------------------

@app.post("/rooms", response_model=RoomOut, status_code=201)
def create_room(db: Session = Depends(get_db)):
    code = generate_room_code(db)
    room = Room(code=code)
    db.add(room)
    db.commit()
    db.refresh(room)
    return room


@app.get("/rooms/{code}/status", response_model=RoomStatus)
def room_status(code: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.code == code).first()
    if not room:
        raise HTTPException(404, "Room not found")
    return RoomStatus(code=room.code, participants=room.participants)


@app.delete("/rooms/{code}", status_code=204)
async def delete_room(code: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.code == code).first()
    if not room:
        raise HTTPException(404, "Room not found")
    db.delete(room)
    db.commit()


# ---------------------------------------------------------------------------
# Participant endpoints
# ---------------------------------------------------------------------------

@app.post("/participants", response_model=ParticipantOut, status_code=201)
def join_room(body: ParticipantCreate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.code == body.room_code).first()
    if not room:
        raise HTTPException(404, "Room not found")
    participant = Participant(room_id=room.id, display_name=body.display_name)
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant


@app.get("/participants/{participant_id}/answers", response_model=list[AnswerOut])
def get_answers(participant_id: int, db: Session = Depends(get_db)):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(404, "Participant not found")
    return participant.answers


@app.post("/participants/{participant_id}/answers", response_model=AnswerOut, status_code=201)
def save_answer(
    participant_id: int, body: AnswerCreate, db: Session = Depends(get_db)
):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(404, "Participant not found")

    existing = (
        db.query(Answer)
        .filter_by(participant_id=participant_id, stage_id=body.stage_id, question_key=body.question_key)
        .first()
    )
    if existing:
        existing.answer_text = body.answer_text
        existing.updated_at = _now()
        db.commit()
        db.refresh(existing)
        return existing

    answer = Answer(
        participant_id=participant_id,
        stage_id=body.stage_id,
        question_key=body.question_key,
        answer_text=body.answer_text,
    )
    db.add(answer)
    db.commit()
    db.refresh(answer)
    return answer


@app.delete("/participants/{participant_id}", status_code=204)
async def delete_participant(participant_id: int, db: Session = Depends(get_db)):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(404, "Participant not found")
    room_code = participant.room.code
    db.delete(participant)
    db.commit()
    await manager.broadcast_to_facilitators(
        room_code, ParticipantLeaveEvent(participant_id=participant_id).model_dump()
    )


# ---------------------------------------------------------------------------
# WebSocket — participant
# ---------------------------------------------------------------------------

@app.websocket("/ws/participant/{participant_id}")
async def participant_ws(
    participant_id: int, ws: WebSocket, db: Session = Depends(get_db)
):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        await ws.close(code=4004)
        return

    room_code = participant.room.code
    await manager.connect_participant(participant_id, ws)

    participant.last_seen = _now()
    db.commit()

    await manager.broadcast_to_facilitators(
        room_code,
        ParticipantJoinEvent(
            participant_id=participant_id, display_name=participant.display_name
        ).model_dump(),
    )

    try:
        while True:
            data = await ws.receive_json()
            event_type = data.get("type")

            if event_type == "stage_update":
                stage_id = data.get("stage_id")
                if stage_id:
                    participant.current_stage = stage_id
                    participant.last_seen = _now()
                    db.commit()

                    record_stage_start(db, participant_id, stage_id)

                    payload = StageUpdateEvent(
                        participant_id=participant_id,
                        display_name=participant.display_name,
                        stage_id=stage_id,
                    ).model_dump()

                    if stage_id in HIGH_VULNERABILITY_STAGES:
                        payload["sensitive"] = True

                    await manager.broadcast_to_facilitators(room_code, payload)

            elif event_type == "stage_complete":
                stage_id = data.get("stage_id")
                if stage_id:
                    record_stage_complete(db, participant_id, stage_id)

    except WebSocketDisconnect:
        manager.disconnect_participant(participant_id)
        participant.last_seen = _now()
        db.commit()
        await manager.broadcast_to_facilitators(
            room_code, ParticipantLeaveEvent(participant_id=participant_id).model_dump()
        )


# ---------------------------------------------------------------------------
# WebSocket — facilitator
# ---------------------------------------------------------------------------

@app.websocket("/ws/facilitator/{room_code}")
async def facilitator_ws(room_code: str, ws: WebSocket, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.code == room_code).first()
    if not room:
        await ws.close(code=4004)
        return

    await manager.connect_facilitator(room_code, ws)

    # Send current room snapshot on connect
    snapshot = {
        "type": "snapshot",
        "participants": [
            {
                "participant_id": p.id,
                "display_name": p.display_name,
                "current_stage": p.current_stage,
                "joined_at": p.joined_at.isoformat(),
            }
            for p in room.participants
        ],
    }
    await ws.send_json(snapshot)

    try:
        while True:
            await ws.receive_text()  # keep connection alive; facilitator is read-only
    except WebSocketDisconnect:
        manager.disconnect_facilitator(room_code, ws)

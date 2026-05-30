import random
import string
from datetime import datetime
from fastapi import WebSocket

from sqlalchemy.orm import Session
from app.models import Room, Participant


def generate_room_code(db: Session) -> str:
    """Generate a unique 4-letter room code."""
    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=4))
        if not db.query(Room).filter(Room.code == code).first():
            return code


# ---------------------------------------------------------------------------
# WebSocket connection manager
# ---------------------------------------------------------------------------

class ConnectionManager:
    def __init__(self):
        # participant_id -> WebSocket
        self._participants: dict[int, WebSocket] = {}
        # room_code -> set of facilitator WebSockets
        self._facilitators: dict[str, set[WebSocket]] = {}

    async def connect_participant(self, participant_id: int, ws: WebSocket):
        await ws.accept()
        self._participants[participant_id] = ws

    def disconnect_participant(self, participant_id: int):
        self._participants.pop(participant_id, None)

    async def connect_facilitator(self, room_code: str, ws: WebSocket):
        await ws.accept()
        self._facilitators.setdefault(room_code, set()).add(ws)

    def disconnect_facilitator(self, room_code: str, ws: WebSocket):
        if room_code in self._facilitators:
            self._facilitators[room_code].discard(ws)

    async def broadcast_to_facilitators(self, room_code: str, message: dict):
        dead: set[WebSocket] = set()
        for ws in self._facilitators.get(room_code, set()):
            try:
                await ws.send_json(message)
            except Exception:
                dead.add(ws)
        for ws in dead:
            self._facilitators[room_code].discard(ws)

    async def send_to_participant(self, participant_id: int, message: dict):
        ws = self._participants.get(participant_id)
        if ws:
            try:
                await ws.send_json(message)
            except Exception:
                self.disconnect_participant(participant_id)


manager = ConnectionManager()


# ---------------------------------------------------------------------------
# Stage helpers
# ---------------------------------------------------------------------------

HIGH_VULNERABILITY_STAGES = {"I-4", "I-5", "P-3"}

STAGE_ORDER = [
    "I-1", "I-2", "I-3", "I-4", "I-5", "I-6",
    "P-1", "P-2", "P-3", "P-4", "P-5", "P-6", "P-7",
]


def record_stage_start(db: Session, participant_id: int, stage_id: str):
    from app.models import StageProgress
    existing = (
        db.query(StageProgress)
        .filter_by(participant_id=participant_id, stage_id=stage_id)
        .first()
    )
    if not existing:
        db.add(StageProgress(participant_id=participant_id, stage_id=stage_id))
        db.commit()


def record_stage_complete(db: Session, participant_id: int, stage_id: str):
    from app.models import StageProgress
    progress = (
        db.query(StageProgress)
        .filter_by(participant_id=participant_id, stage_id=stage_id)
        .first()
    )
    if progress and not progress.completed_at:
        progress.completed_at = datetime.utcnow()
        db.commit()

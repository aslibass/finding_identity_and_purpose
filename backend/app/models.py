from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import ForeignKey, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel, ConfigDict

from app.database import Base


def _now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


# ---------------------------------------------------------------------------
# ORM Models
# ---------------------------------------------------------------------------

class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(4), unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)

    participants: Mapped[list["Participant"]] = relationship(
        back_populates="room", cascade="all, delete-orphan"
    )


class Participant(Base):
    __tablename__ = "participants"

    id: Mapped[int] = mapped_column(primary_key=True)
    room_id: Mapped[int] = mapped_column(ForeignKey("rooms.id", ondelete="CASCADE"))
    display_name: Mapped[str] = mapped_column(String(100))
    current_stage: Mapped[str] = mapped_column(String(10), default="I-1")
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=_now)
    last_seen: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    room: Mapped["Room"] = relationship(back_populates="participants")
    stage_progress: Mapped[list["StageProgress"]] = relationship(
        back_populates="participant", cascade="all, delete-orphan"
    )
    answers: Mapped[list["Answer"]] = relationship(
        back_populates="participant", cascade="all, delete-orphan"
    )


class StageProgress(Base):
    __tablename__ = "stage_progress"

    id: Mapped[int] = mapped_column(primary_key=True)
    participant_id: Mapped[int] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE")
    )
    stage_id: Mapped[str] = mapped_column(String(10))
    started_at: Mapped[datetime] = mapped_column(DateTime, default=_now)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    participant: Mapped["Participant"] = relationship(back_populates="stage_progress")


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    participant_id: Mapped[int] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE")
    )
    stage_id: Mapped[str] = mapped_column(String(10))
    question_key: Mapped[str] = mapped_column(String(100))
    answer_text: Mapped[str] = mapped_column(Text)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=_now)

    participant: Mapped["Participant"] = relationship(back_populates="answers")


# ---------------------------------------------------------------------------
# Pydantic Schemas
# ---------------------------------------------------------------------------

class RoomCreate(BaseModel):
    pass


class RoomOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    code: str
    created_at: datetime


class ParticipantCreate(BaseModel):
    display_name: str
    room_code: str


class ParticipantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    display_name: str
    current_stage: str
    joined_at: datetime


class AnswerCreate(BaseModel):
    stage_id: str
    question_key: str
    answer_text: str


class AnswerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    stage_id: str
    question_key: str
    answer_text: str
    updated_at: datetime


class StageProgressOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    stage_id: str
    started_at: datetime
    completed_at: Optional[datetime]


class RoomStatus(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    code: str
    participants: list[ParticipantOut]


# ---------------------------------------------------------------------------
# WebSocket Event Schemas
# ---------------------------------------------------------------------------

class StageUpdateEvent(BaseModel):
    type: str = "stage_update"
    participant_id: int
    display_name: str
    stage_id: str


class ParticipantJoinEvent(BaseModel):
    type: str = "join"
    participant_id: int
    display_name: str


class ParticipantLeaveEvent(BaseModel):
    type: str = "leave"
    participant_id: int

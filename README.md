# Identity & Purpose Workshop

A live small-group digital workshop for experienced professionals exploring who they are before God and what they are called to do.

Participants work through 13 reflective stages at their own pace. Facilitators monitor progress in real time. Answers stay private — only name and current stage are shared.

---

## What it is

A workshop in two arcs:

**Identity** — six stages that surface where participants currently derive their worth, how they experience God's presence, what false narratives they carry, and what they are being invited to release.

**Purpose** — seven stages that test values under pressure, identify God-given strengths, name the burden that keeps returning, converge story, gifts, and calling into one accountable next step, and close with a theological review prompt.

Each stage uses a mix of structured exercises and multiple-choice questions with space for concrete examples. Stage P-4 (The Convergence) pulls the participant's prior answers as read-only context for synthesis. Stage P-6 (What's Mine to Do) generates a printable commitment card. Stage P-7 (The Trusted Voice) assembles the participant's key answers into a structured prompt they can paste into an AI conversation to receive a theological review grounded in the workshop's trusted sources.

---

## Stack

| Layer | Technology |
| ----- | ---------- |
| Backend | Python · FastAPI · WebSocket · SQLite via SQLAlchemy |
| Frontend | React · Vite · TypeScript · Tailwind CSS |
| Fonts | Cormorant Garamond · IBM Plex Sans (Google Fonts) |

---

## Running locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The SQLite database (`workshop.db`) is created automatically on first run.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`. Backend must be running at `http://localhost:8000`.

---

## Project structure

```text
/backend
  /app
    main.py        FastAPI app, REST endpoints, WebSocket handlers
    models.py      SQLAlchemy ORM models + Pydantic schemas
    rooms.py       Room code generation, WebSocket connection manager
    database.py    SQLite engine, session factory, create_tables()

/frontend
  /src
    /api           API client (client.ts) and shared types (types.ts)
    /components    JoinScreen, LandingPage, WorkshopShell, ProgressBar,
                   StageTabBar, QuestionBlock
    /hooks         useWebSocket, useAnswers
    /stages        One component per stage + shared StageTemplate,
                   ReflectionBlock, GenericStage, stageConfigs.ts
    /stores        session.ts — localStorage session + answer cache
    App.tsx        View router (landing → join → workshop)

/workshop-stages   Source content files for all 12 stages (Markdown)
/tests             Persona test documents + personas.ts

decisions.md       Log of deliberate deviations from the expert panel
review_expert_panel.md  Review criteria and trusted sources
trusted_sources.md      Theological source list by theme
```

---

## Workshop stages

### Identity Arc

| Stage | Name | Invitation |
| ----- | ---- | ---------- |
| I-1 | The Honest Inventory | Where do I actually derive my worth right now? |
| I-2 | The Divine Signature | Who does God say I am before I do anything? |
| I-3 | The Unshakable Ground | What does it mean that God is near by promise, not feeling? |
| I-4 | Lies & True Names | What false stories do I carry — and what does God say instead? |
| I-5 | The Shaped Story | What experiences, wounds, and graces have most formed me? |
| I-6 | Repentance & Remaking | What am I turning from — and who am I becoming? |

### Purpose Arc

| Stage | Name | Invitation |
| ----- | ---- | ---------- |
| P-1 | Values & Convictions | What do I consistently choose when it costs me something? |
| P-2 | How You're Made | What has God built into me that energises rather than depletes? |
| P-3 | What Breaks Your Heart | What injustice or need keeps finding me? |
| P-4 | The Convergence | Where do my story, gifts, and burden point together? |
| P-5 | Community & Discernment | How are my gifts and calling confirmed and sharpened in the body? |
| P-6 | What's Mine to Do | What is the one obedient step I'm being invited into? |
| P-7 | The Trusted Voice | Take your journey to a trusted theological voice for review and deeper discernment. |

---

## API reference

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/rooms` | Create a room — returns 4-letter code |
| GET | `/rooms/{code}/status` | All participants and their current stages |
| DELETE | `/rooms/{code}` | Delete room and all participant data |
| POST | `/participants` | Join a room — returns participant record |
| GET | `/participants/{id}/answers` | Retrieve participant's own answers |
| POST | `/participants/{id}/answers` | Save or update a single answer |
| DELETE | `/participants/{id}` | Hard-delete participant and all their data |
| WS | `/ws/participant/{id}` | Participant WebSocket — sends stage updates |
| WS | `/ws/facilitator/{code}` | Facilitator WebSocket — receives room events |

### WebSocket events (participant → server)

```json
{ "type": "stage_update",   "stage_id": "I-2" }
{ "type": "stage_complete", "stage_id": "I-1" }
```

### WebSocket events (server → facilitator)

```json
{ "type": "snapshot",    "participants": [...] }
{ "type": "join",        "participant_id": 4, "display_name": "Alex" }
{ "type": "stage_update","participant_id": 4, "display_name": "Alex", "stage_id": "I-2", "sensitive": false }
{ "type": "leave",       "participant_id": 4 }
```

High-vulnerability stages (I-4, I-5, P-3) include `"sensitive": true` in stage_update events. The facilitator dashboard shows completion rate only for these stages — no content, no word count.

---

## Data and privacy

- Answers are persisted to SQLite server-side (required for AI synthesis in a future phase) and cached in localStorage as a write-through buffer.
- Participants can delete their own data at any time. Cascade removes answers, stage progress, and the participant record.
- Facilitators can delete an entire room.
- The facilitator dashboard never exposes answer content.

---

## The Trusted Voice — P-7

The final stage assembles the participant's answers from across all stages into a structured theological prompt. The prompt instructs an AI to act as a spiritual director drawing strictly from the workshop's trusted sources (Barton, Guinness, Reeves, Nouwen, Allender, Peterson, Willard, and others).

The generated review covers:

1. **Calling review** — is the calling statement biblically grounded, concrete, and testable?
2. **Convergence check** — does story, gift, and burden genuinely point together, or is the participant resolving tension too quickly?
3. **The wound and the call** — the connection between the lie named in I-4 and the calling arrived at in P-4
4. **Reading recommendations** — 2–3 books from the trusted sources list, chosen specifically for this person's journey
5. **One honest question** — something worth sitting with before acting, drawn from what the participant wrote
6. **A short blessing** — rooted in a specific Scripture passage relevant to their journey

The AI is constrained to recommend only from the trusted sources list and to avoid generic self-help framing, vague mystical language, and platitudes.

---

## Deferred (Phase 4+)

- Facilitator dashboard (Phase 3) — real-time participant grid with stage progress
- P-6 commitment card server-side PDF generation (print-to-PDF is implemented; server generation deferred)
- Witness moments — private shareable link after I-5 and P-3
- AI-assisted group synthesis for facilitators (themes across participants, never individual answers)
- Multi-facilitator role management

# Identity Purpose Workshop App

## Pre-Build Decisions (locked)

**Persistence**: SQLite via SQLAlchemy. Tables: rooms, participants, stage_progress, answers.

**Answer storage**: Answers ARE persisted to SQLite (not localStorage-only) — required for AI synthesis in Phase 4+. localStorage is used only as a write-through cache / offline buffer.

**Participant data control**:

- **Export**: Participant can download their own answers as a formatted document (JSON or styled HTML). Server returns their answers for the room session; client renders and downloads.
- **Delete**: Participant can permanently delete their answers and participation record from SQLite. Cascades: removes answers, stage_progress, and participant row. Facilitator dashboard reflects the removal in real-time via WebSocket.
- Facilitator can also delete an entire room (and all participant data within it).

**Session persistence**: SQLite means room state survives server restarts. Participants can rejoin using their room code + display name; server restores their last stage.

---

## Workshop Content

**Audience**: Small groups of 10–15 experienced professionals. Multiple facilitators possible.

**Format**: Two sessions — Identity Arc then Purpose Arc. Participants move at their own pace; facilitators monitor via dashboard.

**Tone**: Warm and reflective, intellectually honest. Not a corporate survey, not shallow emotionalism. Experienced professionals will intellectualise — stages need depth to prevent that.

### Identity Arc (6 stages)

| Stage | Name | Invitation | Key Sources |
| ----- | ---- | ---------- | ----------- |
| I-1 | The Honest Inventory | Where do I actually derive my worth right now? | C.S. Lewis, Tim Keller |
| I-2 | The Divine Signature | Who does God say I am before I do anything? | Michael Reeves, J.I. Packer, N.T. Wright |
| I-3 | The Unshakable Ground | What does it mean that God is near by promise, not feeling? | Dallas Willard, Brother Lawrence, D.A. Carson |
| I-4 | Lies & True Names | What false stories do I carry — and what does God say instead? | Leanne Payne, Thom Gardner, Eugene Peterson |
| I-5 | The Shaped Story | What experiences, wounds and graces have most formed me? | Henri Nouwen, Dan Allender, Brennan Manning |
| I-6 | Repentance & Remaking | What am I turning from — and who am I becoming? | Henri Nouwen, Thom Gardner, Leanne Payne |

**Sequencing note**: I-4 (Lies) precedes I-5 (Story) deliberately — name the false narrative first, then mine the story that fed it (Allender/Payne logic). I-6 completes the movement: naming and storying without turning is incomplete. This is dying and rising, not just reframing.

### Purpose Arc (6 stages)

| Stage | Name | Invitation | Key Sources |
| ----- | ---- | ---------- | ----------- |
| P-1 | Values & Convictions | What do I consistently choose when it costs me something? | Ruth Haley Barton, Dallas Willard, J.I. Packer |
| P-2 | How You're Made | What has God built into me that energises rather than depletes? | J.I. Packer, Os Guinness |
| P-3 | What Breaks Your Heart | What injustice or need keeps finding me? | Os Guinness, Eugene Peterson |
| P-4 | The Convergence | Where do my story, gifts and burden point together? | Os Guinness *The Call*, Tim Keller |
| P-5 | Community & Discernment | How are my gifts and calling confirmed and sharpened in the body? | Roy Godwin, Ruth Haley Barton, Michael Reeves |
| P-6 | What's Mine to Do | What is the one obedient step I'm being invited into? | Oswald Chambers, Ruth Haley Barton |

**Sequencing note**: P-4 (Convergence) must pull the participant's prior answers from I-5, P-1, P-2, and P-3 as read-only context — without this injection the participant repeats themselves rather than synthesises. P-5 grounds purpose in community before committing to action. P-6 closes the arc.

### High-Vulnerability Stages

I-4, I-5, and P-3 carry high emotional risk for experienced professionals who will default to intellectualising. Rules:

- Group sharing is **optional**, never mandatory
- Facilitator dashboard shows **completion rate only** — no answer content
- Dashboard shows "participant paused here" flags (signals stuck, not skipped)
- Dashboard shows aggregate word count (signals depth of reflection)
- Individual answers are **never** visible to facilitators

### Export & Artefacts

- All stages except P-6: answers export as a **reflective journal** (styled HTML or JSON)
- P-6 only: generates a **personal commitment card** — date-stamped, formatted for print, with space for an accountability partner name. Distinct from journal export.
- Optional **witness moments** after I-5 and P-3: participant can generate a private shareable link to send to one trusted person (not the facilitator).

### Stage Files

Each stage should live in its own file under `workshop-stages/`.

- The files are the working source for stage prompts, follow-up probes, and facilitator notes.
- Keep each file focused on one stage's truth-extraction goal.
- Use concrete incidents, costs, tensions, and repeated patterns instead of abstract reflection prompts.

### Stage Interaction Flow

- Each stage should have a separate `Exercise` tab and `Questions` tab.
- `Exercise` tab contains instructions and a visual example only.
- `Exercise` tab should not include interpretive or reflective questions.
- Participant must complete the exercise step before the `Questions` tab unlocks.
- All reflective and probing questions belong only in the `Questions` tab.
- In the `Questions` tab, use multiple-choice answers where possible so participants can pick the closest fit first.
- Every multiple-choice item should include `None of these fit me yet` and `Other (my own words)` options.
- For high-depth prompts, use a two-step pattern: pick closest answer first, then add a short explanation.
- Avoid using multiple-choice as a replacement for discernment; use it as vocabulary scaffolding.

### Truth-Extraction Rules

- Ask for a recent example before asking for interpretation.
- Ask what the participant does under pressure, not only what they believe.
- Ask what they avoid, protect, repeat, or fear losing.
- Ask for names, dates, choices, and consequences.
- Push every answer toward something observable enough to test later.
- Where vocabulary is difficult, provide recognisable multiple-choice language first, then ask for one concrete personal example.

## Design Direction

This app serves a small-group Christian workshop for experienced adults who will intellectualise unless the interface feels calm, honest, and grounded. The design should feel like a quiet, well-edited retreat workbook translated into the web: warm, reflective, tactile, and serious.

### Visual tone

- Editorial and devotional rather than corporate
- Warm and restrained rather than flashy
- Human and pastoral rather than clinical
- Clear and spacious rather than dense
- Tactile and paper-like rather than glossy

### Visual motif

- Treat the app like a calm workbook with margin notes, section dividers, and a strong reading path
- Use soft ruled lines, numbered prompts, and inset panels to create the feeling of a guided page rather than a dashboard grid
- Let the participant flow feel like turning through a well-edited devotional notebook
- Let the facilitator view feel like a clean status board attached to the same notebook

### Colour direction

- Base on warm ivory, sand, parchment, camel, and deep burgundy
- Use one dark grounding tone for text and hierarchy
- Reserve a muted rose or terracotta accent for emphasis, not decoration
- Avoid bright primary colours, neon contrast, and generic purple gradients

### Typography direction

- Use a refined old-style serif for headings and stage invitations, such as Cormorant Garamond or Literata
- Use a warm humanist sans for body copy, such as Source Sans 3 or IBM Plex Sans
- Keep type calm, literate, and pastoral, with generous line-height and measured tracking
- Avoid default system stacks and overused modern startup fonts

### Layout direction

- Use generous whitespace and clear hierarchy
- Favor editorial sections, soft dividers, and measured pacing
- Make the workshop feel easy to follow in a live facilitation setting
- Avoid card-heavy dashboards, loud shadows, and crowded UI

### Motion direction

- Use minimal, purposeful motion only
- Prefer gentle reveals, fades, and progress cues
- Nothing should feel playful, bouncy, or attention-seeking

### Signature interactions

- Participant flow: selected lines, drawings, and forced-choice responses are completed in an `Exercise` tab first, then the `Questions` tab unlocks
- Facilitator flow: each participant card should expand smoothly to show current stage, pause state, and time on stage without adding visual clutter
- Use the web to create a small moment of recognition, not entertainment

### UI character

- The participant experience should feel reassuring, readable, and reflective
- The facilitator dashboard should feel calm, legible, and operational
- The overall app should feel spiritually serious without becoming austere

## Claude Build Workflow

Use Claude to build the app in small, reviewable phases.

1. Start by asking Claude to read this plan, `CLAUDE.md`, `review_expert_panel.md`, and the current stage files.
2. Give Claude exactly one phase at a time to implement.
3. After each phase, ask Claude to review the result against the review panel and trusted sources.
4. If Claude finds drift, fix that phase before moving on.
5. Do not move to the next phase until the current one is implemented, reviewed, and stable.

### Suggested Claude prompt

Build Phase X of the Identity Purpose Workshop App from `the_plan.md`.

Read `CLAUDE.md`, `review_expert_panel.md`, `trusted_sources.md`, and the relevant stage files first.

Implement only this phase:
- [insert the phase scope here]

After implementation, review the work against the review panel and trusted sources, then report any issues or gaps.

---

## Build Instructions

Read CLAUDE.md and scaffold this project from scratch. Build it in this order:

### Phase 1: Backend (do this first, verify it works)

1. Create the FastAPI backend with WebSocket support
2. Implement SQLite via SQLAlchemy — tables: rooms, participants, stage_progress, answers
3. Implement room management: create room (returns a 4-letter code), join room, leave room
4. WebSocket endpoint that tracks connected participants and their current stage
5. REST endpoints:
   - `GET /rooms/{code}/status` — returns all participants and their stages
   - `GET /participants/{id}/answers` — returns participant's own answers (for export)
   - `DELETE /participants/{id}` — hard delete with cascade
   - `DELETE /rooms/{code}` — facilitator deletes entire room
6. Run the server and verify with a quick curl test

### Phase 2: Participant Frontend (core flow)

1. Create React + Vite + TypeScript + Tailwind project
2. Use the `frontend-design` skill for all participant-facing UI — commit to a bold aesthetic direction before writing code
3. Build the join screen: enter display name + room code
4. Build the stage navigation system (progress bar, next/back) — supports 12 content stages across two arcs
5. Build **I-1: The Honest Inventory** as the first real stage — warm and reflective, not a corporate survey
6. Hook up localStorage as write-through cache for answers; sync answers to server via REST
7. Hook up WebSocket to send stage progress (not answers) to the server
8. Verify: open two browser tabs, both should appear in the room

### Phase 3: Facilitator Dashboard

1. Build the facilitator view at `/facilitator`
2. "Create Room" button that generates a code
3. Live grid of participant cards showing: name, current stage, time on stage
4. Colour-code stages (not started = grey, in progress = amber, complete = green)
5. For high-vulnerability stages (I-4, I-5, P-3): show completion status only, display "paused" flag if participant has been on stage > threshold time
6. Verify: facilitator sees participants joining and progressing in real-time

**UI note**: Use the `frontend-design` skill for the facilitator dashboard as well; choose the visual direction before writing the dashboard UI.

Stop after Phase 3 and show the result. Phases 4+ will add the remaining stages (I-2 through P-6), the Convergence answer-injection, commitment card export, witness moments, and AI-assisted synthesis.

---

## Deferred (Phase 4+)

- Remaining 11 stages (I-2 through P-6) beyond the first stage built in Phase 2
- P-4 Convergence: auto-populate prior answers (values, story, gifts, burden) as read-only context above synthesis prompt
- P-6 commitment card: date-stamped PDF export with accountability partner field
- Witness moments: private shareable link after I-5 and P-3
- AI-assisted synthesis for facilitators (summary of group themes, not individual answers)
- Multi-facilitator role management

# Identity Purpose Workshop App

## Project Structure

```text
/backend
  /app
    main.py           # FastAPI app + WebSocket
    models.py         # Pydantic models
    rooms.py          # Room management
/frontend
  /src
    /components       # Reusable UI components
    /stages           # One component per workshop stage
    /facilitator      # Facilitator dashboard
    /hooks            # Custom hooks (useLocalAnswers, useWebSocket)
    /stores           # State management
    App.tsx
    main.tsx
/tests
README.md
CLAUDE.md
```

## Standing Instructions

### Frontend UI

Use the `frontend-design` skill (`/frontend-design`) whenever building any frontend component, page, or screen. This includes the join screen, stage components, facilitator dashboard, export UI, and any shared UI components. Follow the skill's design thinking process before writing code — commit to a bold aesthetic direction suited to warm, reflective workshop work.

### Ollama MCP

Claude is the supervisor. Ollama is the worker. Claude plans, coordinates, judges output quality, and handles anything requiring theological or architectural nuance. Ollama does the execution — code generation, review, testing, refactoring. This keeps Claude credit usage low.

Ollama costs nothing to run. Default to it. Only do work in Claude directly when Ollama's output is clearly wrong or the task requires Claude-level judgment.

#### Ollama handles

- Code generation → `ollama_generate_code` / `ollama_generate_code_with_context`
- Code review → `ollama_general_task` with file content in the context field
- Bug fixing → `ollama_fix_code`
- Refactoring → `ollama_refactor_code`
- Test writing → `ollama_write_tests`
- Code explanation → `ollama_explain_code`
- Expert panel reviews for structure, architecture, naming, and delivery risk
- First-pass drafts of workshop content

#### Claude handles

- Theological review (trusted sources, biblical fidelity, pastoral sensitivity)
- Final judgment on Ollama output before committing
- Tasks that require reading many files and synthesising across them
- Anything Ollama tried and got wrong

#### Rules

- Use `ollama_general_task` not `ollama_review_file` — the file review tool is unreliable on Windows paths; pass file content in the context field instead
- No screenshot-based verification loops — use `tsc --noEmit` and describe manual steps
- No parallel Claude sub-agents for reviews — one `ollama_general_task` call instead

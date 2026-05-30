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

Use the Ollama MCP server tools throughout the build:

- `ollama_generate_code` / `ollama_generate_code_with_context` — for generating backend and frontend code
- `ollama_review_code` / `ollama_review_file` — before committing any new module
- `ollama_fix_code` — when debugging or resolving errors
- `ollama_write_tests` — when adding tests in /tests
- `ollama_explain_code` — when context on existing code is needed
- `ollama_refactor_code` — for cleanup and simplification passes

Use Ollama tools proactively, not just reactively — run a review pass after each Phase before moving to the next.

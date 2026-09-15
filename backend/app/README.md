# app

The FastAPI application code lives here.

- `main.py` — creates the FastAPI app, creates tables on startup, seeds demo user, mounts routers
- `database.py` — PostgreSQL connection (SQLAlchemy engine + sessions)
- `demo_user.py` — temporary Alex Kim row until real login
- `event_payload.py` — builds event JSON including RSVP name lists
- `models/` — table definitions
- `schemas/` — request/response JSON shapes
- `routers/` — HTTP endpoints

Config and package lists stay one level up in `backend/` (`requirements.txt`, `.env`).

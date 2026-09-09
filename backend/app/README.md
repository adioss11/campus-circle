# app

The FastAPI application code lives here.

- `main.py` — creates the FastAPI app, creates tables on startup, mounts routers
- `database.py` — PostgreSQL connection (SQLAlchemy engine + sessions)
- `models/` — table definitions
- `schemas/` — request/response JSON shapes
- `routers/` — HTTP endpoints

Config and package lists stay one level up in `backend/` (`requirements.txt`, `.env`).

# app

The FastAPI application code lives here.

- `main.py` — creates the FastAPI app, creates tables on startup, seeds demo user, mounts routers
- `database.py` — PostgreSQL connection (SQLAlchemy engine + sessions)
- `passwords.py` — turns a password into a hash, and checks a password against that hash
- `schema_updates.py` — adds email and password_hash columns if an older `users` table is missing them
- `demo_user.py` — temporary Alex Kim row. RSVPs still use this person.
- `event_payload.py` — builds event JSON including RSVP name lists
- `models/` — table definitions
- `schemas/` — request/response JSON shapes
- `routers/` — HTTP endpoints

Config and package lists stay one level up in `backend/` (`requirements.txt`, `.env`).

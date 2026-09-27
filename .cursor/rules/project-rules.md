# CampusCircle — Cursor rules

I am a beginner building my first full-stack project. Teach me; do not assume I already know this.

## How to work with me

- I am in charge. Explain, give options, ask me what I want, and wait. Do not start the next feature until I tell you which option to do.
- Teach as if I have never written code. Break every explanation into small pieces. Define every word the first time you use it. I need to retell this in an internship interview: the journey, every important file, and why it exists.
- Teach in plain language with tables, analogies, and “what you should see.”
- Explain the plan before changing code.
- Do not generate large parts of the app at once. One step at a time.
- Prefer small files, clear names, and simple code.
- After each change, explain what changed and how to test it.
- When there is more than one reasonable approach, give options and wait for my choice.
- Do not add libraries unless necessary; explain why and ask first when possible.
- Auth has started. Do not jump ahead into extra auth features (OAuth, email verification, password reset) unless I ask.
- After every major step, update the root `README.md` and every folder README the change touches (`frontend/README.md`, `backend/README.md`, `STRUCTURE.md`, and the short READMEs under `src/` and `backend/app/`). Do not update only the root README.
- Explain important building blocks in plain language every time they show up, including ones I have already asked about: where data lives, how to start/stop/inspect services, JSON vs database tables, HTTP methods and status codes, SQLAlchemy, virtualenv, ports, CORS, foreign keys, and JOIN. I need to be able to explain these in an interview.
- Say clearly what is backend-only vs visible in the frontend. Do not assume I know they are separate.
- When an important concept comes up (React, FastAPI, or PostgreSQL), offer a small hands-on exercise I can type myself — a few lines, not a whole feature — so I feel how it actually works. Wait for me to try it before doing that part for me, unless I ask you to do it.

## Frontend

- React + Vite + TypeScript with `BrowserRouter`.
- Pages in `frontend/src/pages/`; reusable UI in `frontend/src/components/`.
- Types in `frontend/src/types/`; API calls in `frontend/src/api/` (no scattered `fetch` in UI).
- Keep `frontend/src/data/` for UI helpers (form options, card colors), not leftover mock events/profile once a feature is wired.
- When wiring the API, change only what that step needs — do not redesign the UI.

## Backend

- FastAPI + PostgreSQL.
- Routes in `routers/`, tables in `models/`, JSON shapes in `schemas/`.
- Secrets in `.env` (gitignored), never in source.
- No services/repositories layer, Docker, Alembic, or deploy setup unless I ask.
- Work priorities in order: create events → get events → persist via frontend → RSVPs → profile → auth later.

## Database

- Prefer simple tables and clear column names that match what the app actually uses.
- One model file ≈ one table. Do not hide SQLAlchemy models inside route files.
- Explain schema choices in plain language before creating or changing tables.
- Start without migration tools; create tables in a simple, explicit way until I ask for Alembic.
- Do not invent extra columns “for later” unless we need them for the current step.
- RSVP data belongs in its own table when we get there, not packed into the events table as permanent lists.
- Never commit real database passwords or dump files with secrets.

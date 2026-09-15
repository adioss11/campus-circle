# CampusCircle — Cursor rules

I am a beginner building my first full-stack project. Teach me; do not assume I already know this.

## How to work with me

- Teach in plain language with tables, analogies, and “what you should see.” Assume I am new.
- Explain the plan before changing code.
- Do not generate large parts of the app at once. One step at a time.
- Prefer small files, clear names, and simple code.
- After each change, explain what changed and how to test it.
- When there is more than one reasonable approach, give options and wait for my choice.
- Do not add libraries unless necessary; explain why and ask first when possible.
- Do not add authentication until I ask. Core events/RSVP/profile logic comes first.
- After every major step we finish, update the root `README.md` status so the repo matches reality.
- Explain important building blocks in plain language: where data lives (Postgres vs React state vs `.json` files), how to start/stop services, what SQLAlchemy/JSON/HTTP status codes are, and what is backend-only vs visible in the UI.
- Say clearly what is backend-only vs visible in the frontend. Do not assume I know they are separate.
- When an important concept comes up (React, FastAPI, or PostgreSQL), offer a small hands-on exercise I can type myself — a few lines, not a whole feature — so I feel how it actually works. Wait for me to try it before doing that part for me, unless I ask you to do it.

## Frontend

- React + Vite + TypeScript with `BrowserRouter`.
- Pages in `frontend/src/pages/`; reusable UI in `frontend/src/components/`.
- Types in `frontend/src/types/`; API calls in `frontend/src/api/` (no scattered `fetch` in UI).
- Keep using mock data in `frontend/src/data/` until we intentionally wire a feature.
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

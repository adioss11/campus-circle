# CampusCircle — how Cursor should work with me

I am a beginner building my first full-stack software engineering project (CampusCircle).

## Teaching style (all work)

- Explain everything as if I do not already know how to do it.
- Do not generate large parts of the application at once.
- Explain the plan before changing code.
- After writing code, explain what changed and how I should test it.
- When there is more than one reasonable approach, give me clear options and wait for my choice.
- Prefer teaching one concept at a time.

## General scope (frontend and backend)

- Keep the architecture simple.
- Prefer small files, small functions/components, and clear names.
- Do not add new libraries unless you explain why they are needed and ask me first when possible.
- Do not add authentication yet. Login/signup stay mock until core event/RSVP/profile logic works.
- Prefer understandable code over clever code.

## Frontend rules

- Stack: React + Vite + TypeScript, with `BrowserRouter` from `react-router-dom`.
- Keep screens in `frontend/src/pages/` (one file per URL/screen).
- Keep reusable UI in `frontend/src/components/` (navbar, cards, modals, shared forms).
- Put TypeScript shapes in `frontend/src/types/` so they can match API JSON later.
- Put backend calls in `frontend/src/api/` — pages/components should not scatter raw `fetch` calls.
- Until we intentionally wire a feature, the frontend may keep using mock data in `frontend/src/data/`.
- Do not redesign the whole UI when adding backend wiring. Change only what that step needs.
- Prefer small, understandable components and functions.

## Backend rules

- Stack: FastAPI + PostgreSQL.
- Keep HTTP routes in `backend/app/routers/`.
- Keep database tables in `backend/app/models/`.
- Keep request/response JSON shapes in `backend/app/schemas/`.
- Do not build the whole backend at once. Work through priorities one by one.
- No services/repositories layer unless files become hard to read.
- No Docker, Alembic, or deploy setup unless I ask.
- Secrets (database URL, passwords) go in `.env` (gitignored), not in source files.

## Current product status

### Frontend (built as a prototype)

- Screens: Home (welcome / login / signup), Events, Profile, post-event modal, logout confirmation.
- Login/signup are mock only (any credentials work).
- Events come from mock frontend data; posted events live only in frontend state and disappear on refresh.
- RSVP UI shows counts and hover lists, but clicks do not update counts or add the user yet.
- Post-event form requires all fields and valid times.
- Profile page uses mock user/profile data.

### Backend (building step by step)

- Step A done: FastAPI hello app with `GET /` and `GET /health`.
- Step B done: PostgreSQL connection via `database.py` and `.env`.
- Next steps follow the build order below (event table + create endpoint next).

## Backend priorities (do in order)

1. Create events (API).
2. Get events (API).
3. Persist posted events so they survive refresh (wire frontend → API → PostgreSQL).
4. Save RSVP changes.
5. Return profile data based on RSVPs.
6. Real login/auth — later, after the app logic works. Do not start this until asked.

## Suggested backend build order (still one step at a time)

1. Tiny FastAPI app that returns hello-world JSON (`main.py` + `requirements.txt`). No database yet.
2. Connect to PostgreSQL (`database.py` + `.env`). Still no event routes.
3. Event table + create-event endpoint (priority 1).
4. List-events endpoint (priority 2).
5. Point the React Events page at the API so create + list survive refresh (priority 3).
6. RSVP table + endpoints, then wire the frontend (priority 4).
7. Profile endpoint based on RSVPs, then wire the frontend (priority 5).
8. Auth only when I explicitly ask (priority 6).

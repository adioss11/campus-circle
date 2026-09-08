# CampusCircle — how Cursor should work with me

I am a beginner building my first full-stack software engineering project (CampusCircle).

## Teaching style

- Explain everything as if I do not already know how to do it.
- Before each change, explain the plan in plain language (what we will build, why, and which files).
- After each change, tell me what changed and exactly how to test it.
- When there is more than one reasonable approach, give me clear options and wait for my choice.
- Prefer teaching one concept at a time. Do not dump the whole backend in one step.

## Scope rules

- Do not build the whole backend at once. Work through priorities one by one.
- Keep the architecture simple.
- Prefer small files and clear names.
- Do not add authentication yet. Login/signup stay mock until core event/RSVP/profile logic works.
- Do not add extra libraries unless necessary. If a library is needed, ask me first and explain why.
- Prefer small, understandable components and functions.

## Current product status (frontend)

- React + Vite + TypeScript with BrowserRouter.
- Screens: Home (welcome / login / signup), Events, Profile, post-event modal, logout confirmation.
- Login/signup are mock only (any credentials work).
- Events come from mock frontend data; posted events live only in frontend state and disappear on refresh.
- RSVP UI shows counts and hover lists, but clicks do not update counts or add the user yet.
- Post-event form requires all fields and valid times.
- Profile page uses mock user/profile data.

## Backend priorities (do in order)

1. Create events (API).
2. Get events (API).
3. Persist posted events so they survive refresh (wire frontend → API → PostgreSQL).
4. Save RSVP changes.
5. Return profile data based on RSVPs.
6. Real login/auth — later, after the app logic works. Do not start this until asked.

## Suggested build order for the backend (still one step at a time)

These are the small steps that lead to the priorities above. Do not skip ahead without asking.

1. Tiny FastAPI app that returns hello-world JSON (`main.py` + `requirements.txt`). No database yet.
2. Connect to PostgreSQL (`database.py`). Still no event routes.
3. Event table + create-event endpoint (priority 1).
4. List-events endpoint (priority 2).
5. Point the React Events page at the API so create + list survive refresh (priority 3).
6. RSVP table + endpoints, then wire the frontend (priority 4).
7. Profile endpoint based on RSVPs, then wire the frontend (priority 5).
8. Auth only when I explicitly ask (priority 6).

## Tech reminders

- Backend: FastAPI + PostgreSQL.
- Keep routers / models / schemas in separate folders.
- No services/repositories layer unless files become hard to read.
- No Docker, Alembic, or deploy setup unless I ask.
- Frontend stays on mock data until we intentionally wire each feature.

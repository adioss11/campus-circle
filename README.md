# CampusCircle

CampusCircle helps students find campus events and see who else is going, so showing up feels less awkward.

Campus events already exist, but they are often only posted on university social accounts. Rooms look empty, and a lot of people — especially students without a car, or who are not into nightlife — do not want to be the first to walk in. CampusCircle puts those events in one place. You can mark **Going** or **Looking for someone** so others can reach out and go together.

## Status

| Area | Status |
| --- | --- |
| Welcome, login, and signup screens | Done (mock auth — any credentials work) |
| Events feed, post-event form, RSVP UI | Done (frontend mock data) |
| Profile page | Done (mock data) |
| FastAPI hello + health routes | Done |
| PostgreSQL connection via `.env` | Done |
| Create event API (`POST /events`) | Done |
| List events API (`GET /events`) | Next |
| Wire frontend to save events & RSVPs | Later |
| Real login / auth | Later |

**Frontend** is a working React + TypeScript prototype. **Backend** can create events in PostgreSQL via `POST /events`. Listing events and wiring the React UI come next. Posted events in the browser still disappear on refresh until that wiring is done.

## Screenshots

### Welcome
![Welcome screen](docs/screenshots/01-welcome.png)

### Login
![Login screen](docs/screenshots/02-login.png)

### Events feed
![Events feed](docs/screenshots/03-events.png)

### Post an event
![Post event form](docs/screenshots/04-post-event.png)

### Profile
![Profile page](docs/screenshots/05-profile.png)

## What’s working today

- Browse campus events (title, date, time, location, description) from mock data
- RSVP UI: **Going** and **Looking for someone** (hover / tap name lists; clicks not saved yet)
- Post-event form with validated dropdowns, start/end times, and campus locations (browser-only for now)
- Profile page with avatar placeholder and event lists (mock)
- Logout confirmation dialog
- Backend `GET /` and `GET /health` (health also checks the database)
- Backend `POST /events` — saves an event row in PostgreSQL

Not yet: list-events API, saved events after refresh in the UI, saved RSVPs, real accounts, photo upload, clubs, chat, maps, or admin tools.

## Tech stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** FastAPI
- **Database:** PostgreSQL (`events` table created on API startup)

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Log in with any email and password (credentials are not checked yet).

## Run the backend

See [backend/README.md](backend/README.md) for PostgreSQL setup and `.env`.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # once
uvicorn app.main:app --reload
```

- http://localhost:8000/ — hello JSON
- http://localhost:8000/health — should show `"database": "ok"`
- http://localhost:8000/docs — interactive API docs

## Repository layout

This repo is a **monorepo**: the React app and the FastAPI app live side by side.

```
campus-circle/
├── docs/screenshots/         # README screenshots
├── frontend/                 # React + TypeScript (Vite)
│   └── src/
│       ├── api/              # backend calls (next)
│       ├── components/       # reusable UI
│       ├── data/             # mock events and profile data
│       ├── pages/            # Welcome, Events, Profile
│       └── types/            # TypeScript shapes (Event, User, …)
└── backend/                  # FastAPI + PostgreSQL
    ├── .env.example
    ├── requirements.txt
    └── app/
        ├── main.py           # FastAPI app
        ├── database.py       # Postgres connection
        ├── routers/          # HTTP URLs (`events.py`)
        ├── models/           # PostgreSQL tables (`event.py`)
        └── schemas/          # JSON in/out (`event.py`)
```

Read [STRUCTURE.md](STRUCTURE.md) for why each folder exists.

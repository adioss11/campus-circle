# CampusCircle

CampusCircle helps students find campus events and see who else is going, so showing up feels less awkward.

Campus events already exist, but they are often only posted on university social accounts. Rooms look empty, and a lot of people — especially students without a car, or who are not into nightlife — do not want to be the first to walk in. CampusCircle puts those events in one place. You can mark **Going** or **Looking for someone** so others can reach out and go together.

## Status

**Frontend is complete** as a working React + TypeScript prototype. Screens use **mock data** in the browser (no API calls yet). Auth, RSVP persistence, and photo upload will wire up when the FastAPI + PostgreSQL backend is added.

| Area | Status |
| --- | --- |
| Welcome, login, and signup screens | Done (prototype navigation) |
| Events feed, post-event form, RSVP UI | Done (mock data) |
| Profile page | Done (mock data) |
| FastAPI + PostgreSQL + real auth / RSVP | Next |

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

## What’s in the frontend prototype

- Browse campus events (title, date, time, location, description)
- RSVP UI: **Going** and **Looking for someone** (hover / tap name lists)
- Post-event form with validated dropdowns, start/end times, and campus locations
- Profile page with avatar placeholder and event lists
- Logout confirmation dialog

Not in this version yet: real accounts, saved RSVPs, photo upload, clubs, chat, maps, or admin tools.

## Tech stack

- **Frontend:** React + TypeScript (Vite) — complete for v1 UI
- **Backend:** FastAPI — folder structure ready, implementation next
- **Database:** PostgreSQL — planned with the API

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Log in with any email and password to explore the prototype (credentials are not checked until the API exists).

## Repository layout

This repo is a **monorepo**: the React app and the FastAPI app live side by side.

```
campus-circle/
├── docs/screenshots/         # README screenshots
├── frontend/                 # React + TypeScript (Vite) — UI complete
│   └── src/
│       ├── api/              # backend calls (next)
│       ├── components/       # reusable UI
│       ├── data/             # mock events and profile data
│       ├── pages/            # Welcome, Events, Profile
│       └── types/            # TypeScript shapes (Event, User, …)
└── backend/                  # FastAPI — structure ready
    └── app/
        ├── routers/          # HTTP URLs
        ├── models/           # PostgreSQL tables
        └── schemas/          # JSON in/out of the API
```

Read [STRUCTURE.md](STRUCTURE.md) for why each folder exists.

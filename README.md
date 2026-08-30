# CampusCircle

CampusCircle helps students find campus events and see who else is going, so showing up feels less awkward.

Campus events already exist, but they are often only posted on university social accounts. Rooms look empty, and a lot of people — especially students without a car, or who are not into nightlife — do not want to be the first to walk in. CampusCircle puts those events in one place. You can mark **Going** or **Looking for someone** so others can reach out and go together.

This is a first-version, resume-ready project. The current site is a **static frontend preview** with fake events. Login, RSVP logic, a real API, and a database come after the mock screens are in place.

## V1 (simple on purpose)

- Browse campus events (title, time, location)
- RSVP: Going, or Looking for someone
- Public counts of who is going or looking
- Sign up / login and a simple profile (name + picture)

Not in v1: clubs, chat, maps, recommendations, or admin dashboards.

## Tech stack

- React + TypeScript (frontend)
- FastAPI (backend, not started yet)
- PostgreSQL (later)

## Status

| Area | Status |
| --- | --- |
| Homepage mock | In progress |
| Event feed, login, profile screens | Next |
| FastAPI + database + real RSVP | After the fake frontend |

## Repository layout

```
campus-circle/
├── frontend/                 # React + TypeScript (Vite)
│   └── src/
│       ├── api/              # backend calls (later)
│       ├── components/       # reusable UI — EventCard lives here
│       ├── data/             # hardcoded fake events for the mock
│       ├── pages/            # one file per screen (later)
│       └── types/            # TypeScript shapes (Event, User, RSVP)
└── backend/                  # FastAPI — folders only for now
```

Read [STRUCTURE.md](STRUCTURE.md) for why these folders exist.

# CampusCircle

CampusCircle is a full-stack campus event platform designed to help students discover events, RSVP, and see who else is interested or going.

The idea came from noticing that many campus events exist, but students often do not attend because events are scattered, under-advertised, or feel awkward to attend alone.

## Planned Features
- User sign up and login
- Simple student profiles with name and picture
- Admin-created event posts
- Event title, time, location, description, and image
- RSVP buttons: Going, Looking for someone to go with
- Public counts and lists of who is going or interested

## Tech Stack
- React
- TypeScript
- FastAPI
- PostgreSQL

## Repository layout

This repo is a **monorepo**: the React app and the FastAPI app live side by side.

```
campus-circle/
├── frontend/                 # React + TypeScript (Vite) — in progress
│   └── src/
│       ├── api/              # calls to the FastAPI backend
│       ├── components/       # reusable UI (navbar, event card, …)
│       ├── pages/            # one file per screen
│       └── types/            # TypeScript shapes (Event, User, RSVP)
└── backend/                  # FastAPI — folders only for now
    └── app/
        ├── routers/          # HTTP URLs
        ├── models/           # PostgreSQL tables
        └── schemas/          # JSON in/out of the API
```

Read [STRUCTURE.md](STRUCTURE.md) for why each folder exists. Folders are empty on purpose in this step; there is no backend code yet.

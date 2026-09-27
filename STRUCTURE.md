# Folder map

This file explains why the monorepo folders exist.

CampusCircle is two programs that talk to each other over HTTP:

- **frontend** — React + TypeScript. Students see this in the browser on port 5174.
- **backend** — FastAPI + Python on port 8000. It stores users, events, RSVPs, and login tokens in PostgreSQL.

They live in **one git repo** (a monorepo) so you can work on both sides together, but they stay in separate folders because they use different languages and tools.

```
campus-circle/
├── README.md                 # what the product is
├── STRUCTURE.md              # this file: why folders exist
├── frontend/                 # React + TypeScript (already started)
└── backend/                  # FastAPI — structure ready, implementation next
```

During development you will usually run **two servers**:

1. Vite on port 5174 (the React app)
2. FastAPI on port 8000 (the API)

The browser talks to FastAPI. FastAPI talks to PostgreSQL. PostgreSQL is a database **server**, not a folder of files you edit. The connection string lives in `backend/.env`.

---

## What you already have

`frontend/` was created with Vite. These files are the starter template plus your landing page:

| Path | Job |
| --- | --- |
| `frontend/index.html` | The single HTML page the browser loads |
| `frontend/src/main.tsx` | Starts React and mounts it onto the page |
| `frontend/src/App.tsx` | Your current landing page (navbar + hero) |
| `frontend/src/App.css` / `index.css` | Styles |
| `frontend/src/assets/` | Images and icons |
| `frontend/package.json` | Frontend libraries and npm scripts |

Vite put almost everything in a few files. That is fine for a first screen. As you add Events, Login, and RSVP, `App.tsx` would get too large if everything stayed there. The new `src/` folders below give those pieces a home **before** you start splitting code.

---

## Frontend folders we are adding

All of these sit under `frontend/src/`. Each one has a short README that repeats the rule for that folder.

```
frontend/src/
├── api/            # functions that call the FastAPI backend
├── assets/         # images (already existed)
├── components/     # reusable UI pieces (navbar, event card, buttons)
├── pages/          # one file per screen (Home, Events, Login, Profile)
└── types/          # TypeScript shapes for Event, User, RSVP
```

### `pages/` vs `components/`

This is the most useful frontend distinction.

- A **page** is a whole screen: “the Events list”, “the Login form”, “one Event’s details”.
- A **component** is a reusable piece that can appear on more than one page: a navbar, an event card, an RSVP button.

Your current `App.tsx` is acting as the Home page **and** the navbar. Later you will likely move the navbar into `components/` and the home content into `pages/`. Do not rush that split until you add a second screen.

### `api/` and `types/`

These two folders are how the frontend stays honest with the backend.

- `types/` holds TypeScript types such as `Event` (title, time, location, …). They should match what FastAPI returns.
- `api/` holds small functions such as `getEvents()` that `fetch` a URL like `/events` and return typed data.

Pages and components should not scatter raw `fetch` calls. When a URL or response shape changes, you want **one** place to update.

You do not need these files filled in yet. The folders exist so you know where those files will go.

---

## Backend folders we are adding

```
backend/
└── app/
    ├── routers/    # URL endpoints (what the frontend calls)
    ├── models/     # database tables (SQLAlchemy)
    └── schemas/    # request/response JSON shapes (Pydantic)
```

FastAPI projects often look confusing because of **three similar-sounding folders**. They are three different jobs:

| Folder | Question it answers | CampusCircle example |
| --- | --- | --- |
| `routers/` | “What URLs exist?” | `GET /events`, `POST /rsvps` |
| `models/` | “What is stored in PostgreSQL?” | an `events` table with title, time, location |
| `schemas/` | “What JSON is sent and received?” | `{ "title": "...", "location": "..." }` |

A common beginner mix-up is putting table definitions inside route files. Keep HTTP in `routers/`, tables in `models/`, and JSON shapes in `schemas/`.

### How that maps to your planned features

From the README:

- **Sign up / login / profiles** → `routers/` for auth and users, `models/` for a `users` table
- **Admin-created events** (title, time, location, description, image) → `routers/` + `models/` + `schemas/` for events
- **RSVP: Going / Looking for someone** → `routers/` + a table that links a user to an event with a status

Those Python files exist now:

- `backend/app/main.py` — creates the FastAPI app and attaches routers
- `backend/app/database.py` — connects to PostgreSQL
- `backend/requirements.txt` — Python packages (FastAPI, database driver, …)
- `backend/app/models/` — tables
- `backend/app/routers/` — URLs
- `backend/app/schemas/` — JSON shapes

---

## How a request will travel (later)

When a student opens the Events page, the path will look like this:

```
Browser
  → React page in frontend/src/pages/
    → getEvents() in frontend/src/api/
      → FastAPI route in backend/app/routers/
        → Event table in backend/app/models/
          → PostgreSQL
        ← JSON matching backend/app/schemas/
      ← data typed as Event in frontend/src/types/
    ← page renders EventCard in frontend/src/components/
```

This pipeline is what the Events page does today. Login uses the same idea with `/signup` and `/login`.

---

## What we are intentionally not adding

Keeping the first architecture small:

- No `services/` or `repositories/` layer. Route functions can talk to the database until the files get hard to read.
- No Docker, Nginx, or deploy folders.
- No test folders yet.
- No database migration tool yet (Alembic). That comes when you create real tables.
- No extra npm or Python libraries in this step.

If a folder is not on this map, you probably do not need it yet.

---

## What to do next

1. Be able to say, in your own words, **pages vs components** and **routers vs models vs schemas**.
2. Next product step, when you choose it: make RSVPs and the profile use the logged-in person instead of Alex Kim.

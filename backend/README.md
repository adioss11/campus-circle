# backend

Python FastAPI app. This is the API server. It talks to PostgreSQL and will send JSON to the React frontend.

## What exists now

### Step A — hello API
- `requirements.txt` — Python packages
- `app/main.py` — FastAPI app with `GET /` and `GET /health`

### Step B — PostgreSQL connection
- `app/database.py` — reads `DATABASE_URL` from `.env` and connects with SQLAlchemy
- `.env.example` — safe template you can copy (committed)
- `.env` — your local secrets (gitignored; create it yourself)

### Step C — create events (priority 1)
- `app/models/event.py` — `events` table
- `app/schemas/event.py` — create/response JSON shapes
- `app/routers/events.py` — `POST /events`
- On startup, `create_all` creates the table if it is missing

### Step D — list events (priority 2)
- `GET /events` — returns all saved events (newest id first)

### Step E — wire React events to the API (priority 3)
- CORS on the API so the browser allows calls from the Vite app
- `frontend/src/api/events.ts` — `getEvents()` / `createEvent()`
- Events page loads and posts through those helpers (refresh keeps events)

### Step F — save RSVPs (priority 4)
- `users` table. An early version seeded one demo person so an RSVP had someone to attach to. That seed is gone.
- `rsvps` table linking a user to an event with `going` or `looking`
- `POST /events/{id}/rsvp` toggles or switches that RSVP (Step I: only for the logged-in person)
- Event JSON includes `goingPeople` and `lookingPeople` name lists

### Step G — profile from RSVPs (priority 5)
- `GET /profile` — one person plus their Going / Looking lists from the `rsvps` table
- An early version returned the demo person. It now returns whoever is logged in.
- Profile page loads that JSON instead of mock `FAKE_ME` lists

### Step H — real login (priority 6, first slice)
- `users.email` and `users.password_hash` (hash, not the password)
- `sessions` table holds a random login token
- `POST /signup`, `POST /login`, `POST /logout`, `GET /me`
- React stores the token in `localStorage` and sends `Authorization: Bearer …`

### Step I — RSVPs belong to the logged-in person
- `POST /events/{id}/rsvp` and `GET /profile` read the token
- No token means HTTP 401
- The website sends the token on those calls

### Step J — events list requires login
- `GET /events`, `POST /events`, and `GET /events/{id}` read the token
- No token means HTTP 401
- The list is still shared. Login is the gate. It does not hide other people's events.


## One-time local database setup

On a Cloud machine built with this setup, `.cursor/install.sh` installs PostgreSQL, copies `.env`, and creates the user and database. `.cursor/start.sh` starts the database on each boot. `sudo service postgresql start` is often blocked here. This command starts cluster 16:

```bash
sudo pg_ctlcluster 16 main start
```

On a machine that does not have PostgreSQL yet, install it, then create the user and database (the password matches `.env.example`):

```bash
sudo apt-get update
sudo apt-get install -y postgresql
sudo pg_ctlcluster 16 main start
sudo -u postgres psql -c "CREATE USER campuscircle WITH PASSWORD 'campuscircle';"
sudo -u postgres psql -c "CREATE DATABASE campuscircle OWNER campuscircle;"
```

Then in `backend/`:

```bash
cp .env.example .env
```

## Run the API

`.venv` holds the installed Python packages for this API. It is listed in `.gitignore`, and so is `.env`. Cloud setup creates both, and it creates the `campuscircle` database. If activate is missing, create the folder once:

```bash
cd backend
sudo apt-get update
sudo apt-get install -y python3-venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

- http://localhost:8000/ — hello message
- http://localhost:8000/health — should include `"database": "ok"`
- http://localhost:8000/docs — interactive API docs (auth, events, RSVP, profile)

List saved events. Replace TOKEN with the token from login. No token returns 401.

```bash
curl -s http://localhost:8000/events \
  -H "Authorization: Bearer TOKEN"
```

Create one event. Same TOKEN.

```bash
curl -s -X POST http://localhost:8000/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Welcome Back Social",
    "day": "15",
    "month": "SEP",
    "time": "6:00 PM – 8:00 PM",
    "location": "Student Center",
    "description": "Low-key hang before the semester gets loud."
  }'
```

Log in, then mark Going. Replace TOKEN with the token from login:

```bash
curl -s -X POST http://localhost:8000/events/1/rsvp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"status":"going"}'
```

Load that person's profile. Same TOKEN. No token returns 401.

```bash
curl -s http://localhost:8000/profile \
  -H "Authorization: Bearer TOKEN"
```

Stop the server with `Ctrl+C`. Leave the virtual environment with `deactivate`.

API tests use a second database so they do not touch `campuscircle`:

```bash
sudo -u postgres psql -c "CREATE DATABASE campuscircle_test OWNER campuscircle;"
pytest
```

## Packages used so far (and why)

| Package | Why |
| --- | --- |
| `fastapi` | Define HTTP routes and return JSON |
| `uvicorn` | Run the FastAPI app as a server |
| `sqlalchemy` | Talk to PostgreSQL from Python |
| `psycopg2-binary` | PostgreSQL driver SQLAlchemy uses |
| `python-dotenv` | Load `DATABASE_URL` from `.env` |
| `pytest` | Run the API tests |
| `httpx` | Lets the tests call the FastAPI app without a running server |

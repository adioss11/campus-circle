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

Still no event routes or tables yet.

## One-time local database setup

Install PostgreSQL, then create a user and database (example matches `.env.example`):

```bash
sudo service postgresql start
sudo -u postgres psql -c "CREATE USER campuscircle WITH PASSWORD 'campuscircle';"
sudo -u postgres psql -c "CREATE DATABASE campuscircle OWNER campuscircle;"
```

Then in `backend/`:

```bash
cp .env.example .env
```

## Run the API

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

- http://localhost:8000/ — hello message
- http://localhost:8000/health — should include `"database": "ok"`
- http://localhost:8000/docs — interactive API docs

Stop the server with `Ctrl+C`. Leave the virtual environment with `deactivate`.

## Packages used so far (and why)

| Package | Why |
| --- | --- |
| `fastapi` | Define HTTP routes and return JSON |
| `uvicorn` | Run the FastAPI app as a server |
| `sqlalchemy` | Talk to PostgreSQL from Python |
| `psycopg2-binary` | PostgreSQL driver SQLAlchemy uses |
| `python-dotenv` | Load `DATABASE_URL` from `.env` |

# backend

Python FastAPI app. This is the API server. Later it will talk to PostgreSQL and send JSON to the React frontend.

## What exists now (Step A)

- `requirements.txt` — Python packages for this step (`fastapi`, `uvicorn`)
- `app/main.py` — starts the API with two routes: `GET /` and `GET /health`
- No database yet. No events yet.

## Run the API

From the `backend/` folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

- http://localhost:8000/ — hello message
- http://localhost:8000/health — `{"status":"ok"}`
- http://localhost:8000/docs — interactive API docs (built into FastAPI)

Stop the server with `Ctrl+C`. Leave the virtual environment with `deactivate`.

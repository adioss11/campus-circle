# models

Database tables, defined with SQLAlchemy.

- `event.py` — `events` table (title, day, month, time, location, description)

One model ≈ one table. This is stored data, not the JSON the frontend sees (`schemas/`) and not the URLs (`routers/`).

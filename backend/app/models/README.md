# models

Database tables, defined with SQLAlchemy.

- `event.py` — `events` table
- `user.py` — `users` table (demo person Alex Kim for now; later all accounts)
- `rsvp.py` — `rsvps` table (which user, which event, going vs looking)

One model ≈ one table. This is stored data, not the JSON the frontend sees (`schemas/`) and not the URLs (`routers/`).

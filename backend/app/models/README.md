# models

Database tables, defined with SQLAlchemy.

- `event.py` — `events` table
- `user.py` — `users` table (name, email, password hash)
- `session.py` — `sessions` table (login token)
- `rsvp.py` — `rsvps` table (which user, which event, going vs looking)

One model ≈ one table. This is stored data, not the JSON the frontend sees (`schemas/`) and not the URLs (`routers/`).

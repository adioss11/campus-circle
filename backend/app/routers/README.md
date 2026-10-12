# routers

URL endpoints. Each file is a group of related HTTP routes.

- `events.py` — `GET /events`, `POST /events`
- `rsvps.py` — `POST /events/{id}/rsvp` (needs the login token)
- `profile.py` — `GET /profile` (needs the login token)
- `auth.py` — `POST /signup`, `POST /login`, `POST /logout`, `GET /me`

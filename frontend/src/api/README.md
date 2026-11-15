# api

Functions that call the FastAPI backend (`fetch`).

- `config.ts` — API base URL (`http://127.0.0.1:8000` by default)
- `session.ts` — login token, your name, and your user id in the browser
- `auth.ts` — `signup()`, `login()`, `logout()`
- `events.ts` — `getEvents()`, `createEvent()` (sends the login token)
- `rsvps.ts` — `toggleRsvp()`
- `profile.ts` — `getProfile()`

Pages should call these helpers instead of writing `fetch` inline.

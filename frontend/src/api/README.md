# api

Functions that call the FastAPI backend (`fetch`).

- `config.ts` — API base URL (`http://127.0.0.1:8000` by default)
- `session.ts` — login token in `localStorage`
- `auth.ts` — `signup()`, `login()`, `logout()`
- `currentUser.ts` — temporary name until real login (`Alex Kim`)
- `events.ts` — `getEvents()`, `createEvent()`
- `rsvps.ts` — `toggleRsvp()`
- `profile.ts` — `getProfile()`

Pages should call these helpers instead of writing `fetch` inline.

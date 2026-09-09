# api

Functions that call the FastAPI backend (`fetch`).

- `config.ts` — API base URL (`http://127.0.0.1:8000` by default)
- `events.ts` — `getEvents()`, `createEvent()`

Pages should call these helpers instead of writing `fetch` inline.

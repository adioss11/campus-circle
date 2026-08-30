# api

Functions that call the FastAPI backend (`fetch` or similar).

Example idea (not real code yet): `getEvents()` → `GET /events`.

Pages and components should call these functions instead of writing `fetch` inline. Then a URL change happens in one place.

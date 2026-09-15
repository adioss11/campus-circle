# schemas

Pydantic models: the shape of JSON that goes in and out of the API.

- `event.py` — `EventCreate` (POST body) and `EventOut` (response, including name lists)
- `rsvp.py` — `{ "status": "going" | "looking" }`

# schemas

Pydantic models: the shape of JSON that goes in and out of the API.

- `event.py` — `EventCreate` (POST body) and `EventOut` (response)

Why this is separate from `models/`: the database stores rows; schemas decide exactly which fields the API accepts and returns.

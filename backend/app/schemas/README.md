# schemas

Pydantic models: the shape of JSON that goes in and out of the API.

Example idea (not real code yet): an event response might include `title`, `time`, `location`. A create-event request might include those fields plus an image URL.

Why this is separate from `models/`:

- The database might store a password hash. The JSON sent to the browser must not.
- The frontend only needs some fields. Schemas let you choose what to expose.

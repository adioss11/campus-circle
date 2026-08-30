# types

TypeScript types for data the frontend uses.

Right now:

- `event.ts` — one campus event (title, time, location, fake RSVP counts)

Later this folder will also hold `User` and `Rsvp` types. They should follow the JSON from FastAPI.

Keeping types here means `EventCard` and the Events page share the same definition of “what an event is.”

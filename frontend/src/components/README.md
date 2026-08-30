# components

Reusable UI pieces used by more than one page, or used several times on one page.

Right now:

- `EventCard.tsx` — one event on the homepage (and later on the event feed)

Likely later:

- Navbar
- RSVP buttons as their own piece, if they get reused

Keep a component focused on display and clicks. Fetching lists of events belongs in `api/`, called from a page. For the mock, events come from `src/data/fakeEvents.ts`.

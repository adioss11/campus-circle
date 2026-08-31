# components

Reusable UI pieces used by more than one page, or used several times on one page.

Right now:

- `EventCard.tsx` — one event in the feed
- `AuthForm.tsx` — shared Log in / Sign up panel
- `Sidebar.tsx` — left nav on the events page
- `PostEventModal.tsx` — fake “post an event” popup

Keep a component focused on display and clicks. Fetching lists of events belongs in `api/`, called from a page. For the mock, events come from `src/data/fakeEvents.ts`.

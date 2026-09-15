# components

Reusable UI pieces used by more than one page, or used several times on one page.

Right now:

- `EventCard.tsx` — one event in the feed
- `AuthForm.tsx` — shared Log in / Sign up panel
- `Sidebar.tsx` — left nav on Events / Profile
- `PostEventModal.tsx` — “post an event” popup (saves through the API)
- `ProfileEventList.tsx` — Going / Looking lists on the profile page
- `LogoutConfirmModal.tsx` — confirm logout

Keep a component focused on display and clicks. Fetching belongs in `api/`, called from a page.

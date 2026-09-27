# frontend

This is the website students see in the browser. It is React + TypeScript, started by Vite.

Vite is the tool that serves the website while you are coding. Default address: http://localhost:5174

## Run it

```bash
cd frontend
npm install
npm run dev
```

The API must also be running on port 8000, or login, events, and profile cannot load.

## What is inside `src/`

| Folder | Job |
| --- | --- |
| `pages/` | One whole screen (home, events, profile) |
| `components/` | Pieces reused on those screens (card, form, sidebar) |
| `api/` | Functions that talk to FastAPI |
| `types/` | The shape of an event in TypeScript |
| `data/` | Form choices and card colors. Not the database. |

Login and signup call the API. A wrong password does not enter the app. RSVP clicks and the profile lists still use the demo person Alex Kim until we connect them to the logged-in account.

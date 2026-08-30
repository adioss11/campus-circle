import type { CampusEvent } from "../types/event";

// Hardcoded events for the static homepage.
// Later, an api/ function will fetch this list from FastAPI.

export const FAKE_EVENTS: CampusEvent[] = [
  {
    id: "welcome-back",
    title: "Welcome Back Social",
    day: "15",
    month: "SEP",
    time: "6:00 PM",
    location: "Student Center",
    goingCount: 14,
    lookingCount: 5,
  },
  {
    id: "international-potluck",
    title: "International Potluck",
    day: "18",
    month: "SEP",
    time: "5:30 PM",
    location: "Campus Commons",
    goingCount: 9,
    lookingCount: 6,
  },
  {
    id: "game-night",
    title: "Board Game Night",
    day: "21",
    month: "SEP",
    time: "7:30 PM",
    location: "Student Lounge",
    goingCount: 11,
    lookingCount: 4,
  },
];

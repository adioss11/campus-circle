import type { CampusEvent } from "../types/event";

export const FAKE_EVENTS: CampusEvent[] = [
  {
    id: "welcome-back",
    title: "Welcome Back Social",
    day: "15",
    month: "SEP",
    time: "6:00 PM",
    location: "Student Center",
    description:
      "Low-key hang in the student center. Come meet people before the semester gets loud.",
    goingPeople: ["Amina K.", "Luis R.", "Priya S.", "Jordan M."],
    lookingPeople: ["Noah T.", "Hana L."],
  },
  {
    id: "international-potluck",
    title: "International Potluck",
    day: "18",
    month: "SEP",
    time: "5:30 PM",
    location: "Campus Commons",
    description:
      "Bring a dish from home — or just bring yourself. Good food, no car required.",
    goingPeople: ["Mei W.", "Omar A.", "Sofia G."],
    lookingPeople: ["Chris P.", "Leila N.", "Theo B."],
  },
  {
    id: "game-night",
    title: "Board Game Night",
    day: "21",
    month: "SEP",
    time: "7:30 PM",
    location: "Student Lounge",
    description:
      "Casual games, extra chairs, and no pressure to already have a group.",
    goingPeople: ["Riley C.", "Sam D.", "Ivy Q.", "Kenji O."],
    lookingPeople: ["Maya F."],
  },
];

const COVERS: [string, string][] = [
  ["#f0a8e8", "#6c4cff"],
  ["#ff9ec8", "#7c6bff"],
  ["#c084fc", "#4f46e5"],
];

export function coverForEvent(id: string): [string, string] {
  let n = 0;
  for (const char of id) {
    n += char.charCodeAt(0);
  }
  return COVERS[n % COVERS.length];
}

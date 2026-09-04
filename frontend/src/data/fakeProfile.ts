import { FAKE_EVENTS } from "./fakeEvents";
import type { CampusEvent } from "../types/event";
import type { CampusUser } from "../types/user";

export const FAKE_ME: CampusUser = {
  id: "me",
  name: "Alex Kim",
  initials: "AK",
  goingEventIds: ["welcome-back", "international-potluck"],
  lookingEventIds: ["game-night"],
};

export function eventsForIds(ids: string[]): CampusEvent[] {
  return ids.flatMap((id) => {
    const match = FAKE_EVENTS.find((event) => event.id === id);
    return match ? [match] : [];
  });
}

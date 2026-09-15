import { API_BASE_URL } from "./config";
import { type ApiEvent, toCampusEvent } from "./events";
import type { CampusEvent } from "../types/event";

export type RsvpStatus = "going" | "looking";

export async function toggleRsvp(
  eventId: string,
  status: RsvpStatus,
): Promise<CampusEvent> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(`Could not save RSVP (HTTP ${response.status})`);
  }
  const data = (await response.json()) as ApiEvent;
  return toCampusEvent(data);
}

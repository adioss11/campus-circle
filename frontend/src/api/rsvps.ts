import { API_BASE_URL } from "./config";
import { authHeaders } from "./session";
import { type ApiEvent, toCampusEvent } from "./events";
import type { CampusEvent } from "../types/event";

export type RsvpStatus = "going" | "looking";

export async function toggleRsvp(
  eventId: string,
  status: RsvpStatus,
): Promise<CampusEvent> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  });
  if (response.status === 401) {
    throw new Error("Log in to save an RSVP.");
  }
  if (!response.ok) {
    let detail = `Could not save RSVP (HTTP ${response.status})`;
    try {
      const body = (await response.json()) as { detail?: unknown };
      if (typeof body.detail === "string" && body.detail) {
        detail = body.detail;
      }
    } catch {
      // The body was not JSON. Keep the status message.
    }
    throw new Error(detail);
  }
  const data = (await response.json()) as ApiEvent;
  return toCampusEvent(data);
}

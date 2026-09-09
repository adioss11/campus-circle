import type { CampusEvent } from "../types/event";
import { API_BASE_URL } from "./config";

/** JSON shape returned by the FastAPI events routes. */
type ApiEvent = {
  id: number;
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
};

export type EventCreatePayload = {
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
};

function toCampusEvent(apiEvent: ApiEvent): CampusEvent {
  // Backend id is a number; the React type uses string. RSVP lists come later.
  return {
    id: String(apiEvent.id),
    title: apiEvent.title,
    day: apiEvent.day,
    month: apiEvent.month,
    time: apiEvent.time,
    location: apiEvent.location,
    description: apiEvent.description,
    goingPeople: [],
    lookingPeople: [],
  };
}

export async function getEvents(): Promise<CampusEvent[]> {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error(`Could not load events (HTTP ${response.status})`);
  }
  const data = (await response.json()) as ApiEvent[];
  return data.map(toCampusEvent);
}

export async function createEvent(
  payload: EventCreatePayload,
): Promise<CampusEvent> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Could not create event (HTTP ${response.status})`);
  }
  const data = (await response.json()) as ApiEvent;
  return toCampusEvent(data);
}

import type { CampusEvent } from "../types/event";
import { API_BASE_URL } from "./config";
import { authHeaders } from "./session";

/** JSON shape returned by the FastAPI events routes. */
export type ApiEvent = {
  id: number;
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  goingPeople: string[];
  lookingPeople: string[];
  goingUserIds?: number[];
  lookingUserIds?: number[];
};

export type EventCreatePayload = {
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
};

export function toCampusEvent(apiEvent: ApiEvent): CampusEvent {
  return {
    id: String(apiEvent.id),
    title: apiEvent.title,
    day: apiEvent.day,
    month: apiEvent.month,
    time: apiEvent.time,
    location: apiEvent.location,
    description: apiEvent.description,
    goingPeople: apiEvent.goingPeople ?? [],
    lookingPeople: apiEvent.lookingPeople ?? [],
    goingUserIds: apiEvent.goingUserIds ?? [],
    lookingUserIds: apiEvent.lookingUserIds ?? [],
  };
}

export async function getEvents(): Promise<CampusEvent[]> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    headers: authHeaders(),
  });
  if (response.status === 401) {
    throw new Error("Log in to see events.");
  }
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
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (response.status === 401) {
    throw new Error("Log in to post an event.");
  }
  if (!response.ok) {
    throw new Error(`Could not create event (HTTP ${response.status})`);
  }
  const data = (await response.json()) as ApiEvent;
  return toCampusEvent(data);
}

import { API_BASE_URL } from "./config";
import { type ApiEvent, toCampusEvent } from "./events";
import type { CampusEvent } from "../types/event";

export type CampusProfile = {
  id: string;
  name: string;
  initials: string;
  going: CampusEvent[];
  looking: CampusEvent[];
};

type ApiProfile = {
  id: number;
  name: string;
  initials: string;
  going: ApiEvent[];
  looking: ApiEvent[];
};

export async function getProfile(): Promise<CampusProfile> {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) {
    throw new Error(`Could not load profile (HTTP ${response.status})`);
  }
  const data = (await response.json()) as ApiProfile;
  return {
    id: String(data.id),
    name: data.name,
    initials: data.initials,
    going: data.going.map(toCampusEvent),
    looking: data.looking.map(toCampusEvent),
  };
}

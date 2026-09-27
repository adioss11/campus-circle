import { API_BASE_URL } from "./config";
import { authHeaders, clearToken, saveToken } from "./session";

export type AuthResult = {
  id: number;
  name: string;
  email: string;
  token: string;
};

async function readError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { detail?: string };
    if (typeof data.detail === "string") {
      return data.detail;
    }
  } catch {
    // ignore non-JSON errors
  }
  return `Request failed (HTTP ${response.status})`;
}

export async function signup(input: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  const data = (await response.json()) as AuthResult;
  saveToken(data.token);
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  const data = (await response.json()) as AuthResult;
  saveToken(data.token);
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: authHeaders(),
    });
  } finally {
    clearToken();
  }
}

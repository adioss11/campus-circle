/** Browser storage keys. These live in the browser, not in PostgreSQL. */
export const TOKEN_KEY = "campusCircleToken";
export const NAME_KEY = "campusCircleName";

export function saveSession(token: string, name: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME_KEY, name);
}

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function readUserName(): string {
  return localStorage.getItem(NAME_KEY) ?? "";
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

export function authHeaders(): HeadersInit {
  const token = readToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

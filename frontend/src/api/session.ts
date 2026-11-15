/** Browser storage keys. These live in the browser, not in PostgreSQL. */
export const TOKEN_KEY = "campusCircleToken";
export const NAME_KEY = "campusCircleName";
export const USER_ID_KEY = "campusCircleUserId";

export function saveSession(token: string, name: string, userId: number) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME_KEY, name);
  localStorage.setItem(USER_ID_KEY, String(userId));
}

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function readUserName(): string {
  return localStorage.getItem(NAME_KEY) ?? "";
}

export function readUserId(): number | null {
  const raw = localStorage.getItem(USER_ID_KEY);
  if (!raw) {
    return null;
  }
  const id = Number(raw);
  return Number.isInteger(id) ? id : null;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function authHeaders(): HeadersInit {
  const token = readToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

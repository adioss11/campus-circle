/** Browser storage key for the login token. Not the database. */
export const TOKEN_KEY = "campusCircleToken";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders(): HeadersInit {
  const token = readToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

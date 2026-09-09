/** Base URL for the FastAPI server (kitchen). Override with VITE_API_BASE_URL if needed. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

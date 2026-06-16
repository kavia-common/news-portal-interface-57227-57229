/**
 * Centralized API client for the Boca News backend.
 * Backend expected endpoints:
 * - GET /news?q=&category=
 * - GET /news/{id}
 * - GET /categories
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

class ApiError extends Error {
  constructor(message, { status, url, payload } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
    this.payload = payload;
  }
}

/**
 * Performs a JSON fetch with robust error messages.
 */
async function fetchJson(path, { method = "GET", signal } = {}) {
  const url = `${API_BASE_URL}${path}`;
  let res;
  try {
    res = await fetch(url, {
      method,
      signal,
      headers: { Accept: "application/json" }
    });
  } catch (e) {
    throw new ApiError("Network error. Is the backend running?", { url });
  }

  let payload = null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
  } else {
    try {
      payload = await res.text();
    } catch {
      payload = null;
    }
  }

  if (!res.ok) {
    const message =
      (payload && payload.detail) ||
      `Request failed (${res.status}). Please try again.`;
    throw new ApiError(message, { status: res.status, url, payload });
  }

  return payload;
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Return API base URL for display/debug. */
  return API_BASE_URL;
}

// PUBLIC_INTERFACE
export async function fetchCategories({ signal } = {}) {
  /** Fetch list of available categories. */
  return fetchJson("/categories", { signal });
}

// PUBLIC_INTERFACE
export async function fetchNews({ q = "", category = "", signal } = {}) {
  /** Fetch news feed with optional search query and category filter. */
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const qs = params.toString();
  return fetchJson(`/news${qs ? `?${qs}` : ""}`, { signal });
}

// PUBLIC_INTERFACE
export async function fetchNewsById(id, { signal } = {}) {
  /** Fetch a single news item by id. */
  return fetchJson(`/news/${encodeURIComponent(id)}`, { signal });
}

export { ApiError };

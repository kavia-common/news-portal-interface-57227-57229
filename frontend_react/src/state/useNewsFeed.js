import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchNews } from "../api/client.js";

function normalizeNews(payload) {
  // Backend may return { items: [...] } or plain [...]
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.news)) return payload.news;
  return [];
}

// PUBLIC_INTERFACE
export function useNewsFeed({ q, category }) {
  /** Fetch news feed with loading/error/empty support and refetch. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(
    async ({ signal } = {}) => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNews({ q, category, signal });
        setItems(normalizeNews(data));
      } catch (e) {
        setError(e?.message || "Failed to load news.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [q, category]
  );

  useEffect(() => {
    const ctrl = new AbortController();
    load({ signal: ctrl.signal });
    return () => ctrl.abort();
  }, [load]);

  const hasFilters = useMemo(() => Boolean(q || category), [q, category]);

  return { items, loading, error, refetch: load, hasFilters };
}

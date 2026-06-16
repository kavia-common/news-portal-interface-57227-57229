import { useCallback, useEffect, useState } from "react";
import { fetchCategories } from "../api/client.js";

function normalizeCategories(payload) {
  // Backend may return { categories: [...] } or plain [...]
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.categories)) return payload.categories;
  return [];
}

// PUBLIC_INTERFACE
export function useCategories() {
  /** Fetch categories from backend with loading/error state. */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async ({ signal } = {}) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCategories({ signal });
      setCategories(normalizeCategories(data));
    } catch (e) {
      setError(e?.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load({ signal: ctrl.signal });
    return () => ctrl.abort();
  }, [load]);

  return { categories, loading, error, refetch: load };
}

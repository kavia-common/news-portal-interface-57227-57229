import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DEFAULTS = { q: "", category: "" };

function normalize(v) {
  return (v ?? "").toString();
}

// PUBLIC_INTERFACE
export function useNewsQueryParams() {
  /** Manage feed query params (q, category) via URLSearchParams. */
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const q = normalize(params.get("q"));
  const category = normalize(params.get("category"));

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(params);
      const v = normalize(value);
      if (!v) next.delete(key);
      else next.set(key, v);
      // keep on same page, update query
      navigate({ search: next.toString() ? `?${next.toString()}` : "" }, { replace: false });
    },
    [navigate, params]
  );

  const setQ = useCallback((value) => setParam("q", value), [setParam]);
  const setCategory = useCallback((value) => setParam("category", value), [setParam]);

  const reset = useCallback(() => {
    navigate({ search: "" }, { replace: false });
  }, [navigate]);

  const hasAny = useMemo(() => q !== DEFAULTS.q || category !== DEFAULTS.category, [q, category]);

  return { q, category, setQ, setCategory, reset, hasAny };
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { clearFavorites, getFavoriteIds, toggleFavorite } from "./favorites.js";

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Hook exposing favorite IDs and operations. */
  const [ids, setIds] = useState(() => getFavoriteIds());

  // Sync across tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "bocaNews:favorites:v1") {
        setIds(getFavoriteIds());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id) => {
    toggleFavorite(id);
    setIds(getFavoriteIds());
  }, []);

  const clear = useCallback(() => {
    clearFavorites();
    setIds(getFavoriteIds());
  }, []);

  const count = useMemo(() => ids.size, [ids]);

  return { favoriteIds: ids, toggleFavorite: toggle, clearFavorites: clear, count };
}

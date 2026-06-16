const STORAGE_KEY = "bocaNews:favorites:v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function getFavoriteIds() {
  /** Returns a Set of favorite news IDs from localStorage. */
  const raw = localStorage.getItem(STORAGE_KEY);
  const arr = raw ? safeParse(raw, []) : [];
  return new Set(Array.isArray(arr) ? arr : []);
}

function writeFavoriteIds(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

// PUBLIC_INTERFACE
export function isFavorite(id) {
  /** True if the given id is a favorite. */
  return getFavoriteIds().has(String(id));
}

// PUBLIC_INTERFACE
export function toggleFavorite(id) {
  /** Toggle favorite state for an id and return the new boolean value. */
  const key = String(id);
  const set = getFavoriteIds();
  if (set.has(key)) {
    set.delete(key);
    writeFavoriteIds(set);
    return false;
  }
  set.add(key);
  writeFavoriteIds(set);
  return true;
}

// PUBLIC_INTERFACE
export function clearFavorites() {
  /** Remove all favorites from localStorage. */
  localStorage.removeItem(STORAGE_KEY);
}

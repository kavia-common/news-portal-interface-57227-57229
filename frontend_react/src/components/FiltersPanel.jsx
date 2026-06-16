import React, { useMemo } from "react";
import LoadingState from "./states/LoadingState.jsx";
import ErrorState from "./states/ErrorState.jsx";

export default function FiltersPanel({
  categories,
  categoriesLoading,
  categoriesError,
  onRetryCategories,
  q,
  category,
  onChangeQ,
  onChangeCategory,
  onReset
}) {
  const categoryOptions = useMemo(() => {
    const arr = Array.isArray(categories) ? categories : [];
    // Normalize: accept [{name}] or strings
    return arr
      .map((c) => (typeof c === "string" ? c : c?.name))
      .filter(Boolean);
  }, [categories]);

  return (
    <div className="filtersPanel">
      <div className="filtersTitleRow">
        <h2 className="sectionTitle">Buscar y filtrar</h2>
        <button className="btn btnGhost btnSmall" onClick={onReset}>
          Reset
        </button>
      </div>

      <label className="fieldLabel" htmlFor="search">
        Búsqueda
      </label>
      <input
        id="search"
        className="input"
        value={q}
        onChange={(e) => onChangeQ(e.target.value)}
        placeholder="Buscar noticias..."
      />

      <div className="spacer" />

      <label className="fieldLabel" htmlFor="category">
        Categoría
      </label>

      {categoriesLoading ? (
        <LoadingState title="Cargando categorías..." compact />
      ) : categoriesError ? (
        <ErrorState
          title="No se pudieron cargar las categorías"
          description={categoriesError}
          onRetry={onRetryCategories}
          compact
        />
      ) : (
        <select
          id="category"
          className="select"
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      <div className="filtersHint">
        Tip: usá búsqueda + categoría para encontrar noticias rápido.
      </div>
    </div>
  );
}

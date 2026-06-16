import React, { useMemo } from "react";
import FiltersPanel from "../components/FiltersPanel.jsx";
import NewsGrid from "../components/NewsGrid.jsx";
import LoadingState from "../components/states/LoadingState.jsx";
import ErrorState from "../components/states/ErrorState.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import { useFavorites } from "../state/useFavorites.js";
import { useCategories } from "../state/useCategories.js";
import { useNewsFeed } from "../state/useNewsFeed.js";
import { useNewsQueryParams } from "../state/useNewsQueryParams.js";

export default function FavoritesPage() {
  const { favoriteIds, clearFavorites } = useFavorites();
  const { q, category, setQ, setCategory, reset } = useNewsQueryParams();
  const { categories, loading: catLoading, error: catError, refetch: refetchCats } = useCategories();
  const { items, loading, error, refetch } = useNewsFeed({ q, category });

  const favoriteItems = useMemo(() => {
    return items.filter((it) => favoriteIds.has(String(it?.id)));
  }, [items, favoriteIds]);

  return (
    <div className="container pageGrid">
      <aside className="sidebar">
        <FiltersPanel
          categories={categories}
          categoriesLoading={catLoading}
          categoriesError={catError}
          onRetryCategories={refetchCats}
          q={q}
          category={category}
          onChangeQ={setQ}
          onChangeCategory={setCategory}
          onReset={reset}
        />
      </aside>

      <section className="content">
        <div className="pageHeader">
          <div>
            <h1 className="pageTitle">Favoritos</h1>
            <div className="muted">
              Guardaste <strong>{favoriteIds.size}</strong> noticias.
            </div>
          </div>
          <div className="pageHeaderActions">
            <button className="btn btnGhost" onClick={() => refetch()}>
              Actualizar
            </button>
            <button
              className="btn btnPrimary"
              onClick={clearFavorites}
              disabled={favoriteIds.size === 0}
            >
              Limpiar favoritos
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingState title="Cargando noticias..." />
        ) : error ? (
          <ErrorState
            title="No se pudieron cargar las noticias"
            description={error}
            onRetry={() => refetch()}
          />
        ) : favoriteIds.size === 0 ? (
          <EmptyState
            title="No tenés favoritos todavía"
            description="Marcá una noticia con la estrella para guardarla acá."
          />
        ) : favoriteItems.length === 0 ? (
          <EmptyState
            title="No hay favoritos con esos filtros"
            description="Probá cambiar búsqueda/categoría o hacé reset."
          />
        ) : (
          <NewsGrid items={favoriteItems} />
        )}
      </section>
    </div>
  );
}

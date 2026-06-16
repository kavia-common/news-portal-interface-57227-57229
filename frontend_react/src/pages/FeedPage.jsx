import React from "react";
import FiltersPanel from "../components/FiltersPanel.jsx";
import NewsGrid from "../components/NewsGrid.jsx";
import LoadingState from "../components/states/LoadingState.jsx";
import ErrorState from "../components/states/ErrorState.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import { useCategories } from "../state/useCategories.js";
import { useNewsFeed } from "../state/useNewsFeed.js";
import { useNewsQueryParams } from "../state/useNewsQueryParams.js";

export default function FeedPage() {
  const { q, category, setQ, setCategory, reset, hasAny } = useNewsQueryParams();
  const { categories, loading: catLoading, error: catError, refetch: refetchCats } = useCategories();
  const { items, loading, error, refetch, hasFilters } = useNewsFeed({ q, category });

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
            <h1 className="pageTitle">Últimas noticias</h1>
            <div className="muted">
              Noticias de Boca Juniors — buscá, filtrá y guardá tus favoritas.
            </div>
          </div>
          <div className="pageHeaderActions">
            <button className="btn btnGhost" onClick={() => refetch()}>
              Actualizar
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
        ) : items.length === 0 ? (
          <EmptyState
            title={hasFilters ? "No hay noticias con esos filtros" : "No hay noticias"}
            description={
              hasAny
                ? "Probá cambiar búsqueda/categoría o hacé reset."
                : "Volvé a intentar en unos minutos."
            }
          />
        ) : (
          <NewsGrid items={items} />
        )}
      </section>
    </div>
  );
}

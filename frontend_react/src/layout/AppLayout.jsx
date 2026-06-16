import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import FiltersDrawer from "../components/FiltersDrawer.jsx";
import { useCategories } from "../state/useCategories.js";
import { useNewsQueryParams } from "../state/useNewsQueryParams.js";

export default function AppLayout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { category, q, setCategory, setQ, reset } = useNewsQueryParams();
  const { categories, loading, error, refetch } = useCategories();

  const isFeedLike = useMemo(() => {
    return location.pathname === "/" || location.pathname === "/favorites";
  }, [location.pathname]);

  return (
    <div className="appRoot">
      <Header
        onOpenFilters={() => setDrawerOpen(true)}
        showFiltersButton={isFeedLike}
      />

      {isFeedLike && (
        <FiltersDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          categories={categories}
          categoriesLoading={loading}
          categoriesError={error}
          onRetryCategories={refetch}
          q={q}
          category={category}
          onChangeQ={setQ}
          onChangeCategory={setCategory}
          onReset={reset}
        />
      )}

      <main className="appMain">
        <Outlet />
      </main>

      <footer className="appFooter">
        <div className="container footerInner">
          <span className="muted">
            Boca News Portal — built with React + FastAPI
          </span>
        </div>
      </footer>
    </div>
  );
}

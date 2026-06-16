import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../state/useFavorites.js";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `navLink ${isActive ? "navLinkActive" : ""}`
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}

export default function Header({ onOpenFilters, showFiltersButton }) {
  const { count } = useFavorites();

  return (
    <header className="appHeader">
      <div className="container headerInner">
        <Link to="/" className="brand">
          <span className="brandBadge" aria-hidden="true">
            BJ
          </span>
          <span className="brandText">
            Boca <span className="brandEm">News</span>
          </span>
        </Link>

        <nav className="navDesktop" aria-label="Primary">
          <NavItem to="/" label="Inicio" />
          <NavItem to="/favorites" label={`Favoritos (${count})`} />
        </nav>

        <div className="headerActions">
          {showFiltersButton && (
            <button className="btn btnGhost filtersBtn" onClick={onOpenFilters}>
              Filtros
            </button>
          )}
          <Link to="/favorites" className="btn btnPrimary favBtn">
            Favoritos <span className="pill">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

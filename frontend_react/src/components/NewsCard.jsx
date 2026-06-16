import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../state/useFavorites.js";

function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export default function NewsCard({ item }) {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const id = String(item?.id ?? "");
  const isFav = favoriteIds.has(id);

  const meta = useMemo(() => {
    const category = item?.category || item?.source || "";
    const date = formatDate(item?.published_at || item?.publishedAt || item?.date);
    return { category, date };
  }, [item]);

  return (
    <article className="card">
      <div className="cardTop">
        <div className="cardBadges">
          {meta.category ? <span className="badge">{meta.category}</span> : null}
          {meta.date ? <span className="badge badgeSoft">{meta.date}</span> : null}
        </div>

        <button
          className={`iconBtn ${isFav ? "iconBtnActive" : ""}`}
          onClick={() => toggleFavorite(id)}
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          ★
        </button>
      </div>

      <h3 className="cardTitle">
        <Link to={`/news/${encodeURIComponent(id)}`} className="cardLink">
          {item?.title || "Sin título"}
        </Link>
      </h3>

      <p className="cardExcerpt">
        {item?.summary || item?.description || "Abrí la noticia para ver más detalles."}
      </p>

      <div className="cardFooter">
        <Link to={`/news/${encodeURIComponent(id)}`} className="btn btnSmall btnGhost">
          Ver detalle
        </Link>
        {item?.url ? (
          <a className="btn btnSmall btnPrimary" href={item.url} target="_blank" rel="noreferrer">
            Fuente
          </a>
        ) : null}
      </div>
    </article>
  );
}

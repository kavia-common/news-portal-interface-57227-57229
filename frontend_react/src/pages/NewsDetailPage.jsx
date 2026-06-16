import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchNewsById } from "../api/client.js";
import LoadingState from "../components/states/LoadingState.jsx";
import ErrorState from "../components/states/ErrorState.jsx";
import { useFavorites } from "../state/useFavorites.js";

function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isFav = useMemo(() => favoriteIds.has(String(id)), [favoriteIds, id]);

  useEffect(() => {
    const ctrl = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNewsById(id, { signal: ctrl.signal });
        setItem(data?.item ?? data);
      } catch (e) {
        setError(e?.message || "Failed to load item.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ctrl.abort();
  }, [id]);

  return (
    <div className="container detailWrap">
      <div className="detailTopBar">
        <Link to="/" className="btn btnGhost">
          ← Volver
        </Link>
        <button
          className={`btn ${isFav ? "btnPrimary" : "btnGhost"}`}
          onClick={() => toggleFavorite(String(id))}
        >
          {isFav ? "★ En favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>

      {loading ? (
        <LoadingState title="Cargando detalle..." />
      ) : error ? (
        <ErrorState title="No se pudo cargar la noticia" description={error} />
      ) : (
        <article className="detailCard">
          <div className="detailMetaRow">
            {item?.category ? <span className="badge">{item.category}</span> : null}
            {item?.published_at || item?.publishedAt || item?.date ? (
              <span className="badge badgeSoft">
                {formatDate(item?.published_at || item?.publishedAt || item?.date)}
              </span>
            ) : null}
          </div>

          <h1 className="detailTitle">{item?.title || "Sin título"}</h1>

          {item?.image_url || item?.imageUrl ? (
            <img
              className="detailImage"
              src={item.image_url || item.imageUrl}
              alt={item?.title || "Imagen"}
              loading="lazy"
            />
          ) : null}

          <div className="detailBody">
            <p className="detailSummary">
              {item?.summary || item?.description || "Sin descripción."}
            </p>

            {item?.content ? <div className="detailContent">{item.content}</div> : null}
          </div>

          <div className="detailActions">
            {item?.url ? (
              <a className="btn btnPrimary" href={item.url} target="_blank" rel="noreferrer">
                Abrir en fuente
              </a>
            ) : null}
            <Link to="/favorites" className="btn btnGhost">
              Ver favoritos
            </Link>
          </div>
        </article>
      )}
    </div>
  );
}

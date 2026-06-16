import React from "react";

export default function EmptyState({
  title = "Sin resultados",
  description = "Probá cambiar la búsqueda o los filtros."
}) {
  return (
    <div className="state stateEmpty">
      <div className="stateText">
        <div className="stateTitle">{title}</div>
        <div className="muted">{description}</div>
      </div>
    </div>
  );
}

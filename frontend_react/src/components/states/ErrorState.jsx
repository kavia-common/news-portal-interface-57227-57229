import React from "react";

export default function ErrorState({
  title = "Ocurrió un error",
  description = "",
  onRetry,
  compact = false
}) {
  return (
    <div className={`state stateError ${compact ? "stateCompact" : ""}`}>
      <div className="stateText">
        <div className="stateTitle">{title}</div>
        {description ? <div className="muted">{description}</div> : null}
      </div>
      {onRetry ? (
        <button className="btn btnPrimary" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

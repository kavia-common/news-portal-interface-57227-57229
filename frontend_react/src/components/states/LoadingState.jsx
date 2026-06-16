import React from "react";

export default function LoadingState({ title = "Cargando...", compact = false }) {
  return (
    <div className={`state ${compact ? "stateCompact" : ""}`}>
      <div className="spinner" aria-hidden="true" />
      <div className="stateText">
        <div className="stateTitle">{title}</div>
        {!compact ? <div className="muted">Un momento, por favor.</div> : null}
      </div>
    </div>
  );
}

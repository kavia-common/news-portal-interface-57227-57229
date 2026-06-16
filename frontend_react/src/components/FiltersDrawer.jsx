import React, { useEffect } from "react";
import FiltersPanel from "./FiltersPanel.jsx";

export default function FiltersDrawer({ open, onClose, ...panelProps }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawerOverlay" role="dialog" aria-modal="true">
      <div className="drawerBackdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawerHeader">
          <span className="drawerTitle">Filtros</span>
          <button className="btn btnGhost btnSmall" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <FiltersPanel {...panelProps} />
      </div>
    </div>
  );
}

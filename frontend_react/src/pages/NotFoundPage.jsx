import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container simplePage">
      <div className="simpleCard">
        <h1 className="pageTitle">404</h1>
        <p className="muted">No encontramos esa página.</p>
        <Link to="/" className="btn btnPrimary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

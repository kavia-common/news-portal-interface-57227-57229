import React from "react";
import NewsCard from "./NewsCard.jsx";

export default function NewsGrid({ items }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <NewsCard key={String(item?.id)} item={item} />
      ))}
    </div>
  );
}

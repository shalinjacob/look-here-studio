"use client";

import { useState } from "react";
import ProductTile from "./ProductTile";
import { FILTERS } from "@/data/products";
import type { Product, FilterTag } from "@/lib/types";

// Restrained filter bar + grid. Filtering is client-side over the passed list.
export default function CatalogueGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<FilterTag | "all">("all");

  const shown =
    active === "all"
      ? products
      : products.filter((p) => p.tags.includes(active));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter objects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter${active === f.key ? " is-active" : ""}`}
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="catalogue__count">
        {shown.length} object{shown.length === 1 ? "" : "s"}
        {active !== "all" ? ` · ${active}` : ""}
      </p>

      <div className="tilegrid">
        {shown.map((p, i) => (
          <ProductTile key={p.slug} product={p} delay={(i % 4) * 50} />
        ))}
      </div>
    </>
  );
}

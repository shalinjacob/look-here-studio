"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductTile from "./ProductTile";
import { FILTERS, OCCASIONS } from "@/data/products";
import type { Product, FilterTag } from "@/lib/types";

// Restrained filter bar + grid. Filtering is client-side over the passed list.
// ?occasion=housewarming|wedding|just-because (from the gift guide) narrows it
// further, shown as a removable chip. It's read after mount (not via
// useSearchParams) so the full grid stays in the server HTML and the largest
// image isn't re-rendered on hydration.
export default function CatalogueGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<FilterTag | "all">("all");
  const [occasionKey, setOccasionKey] = useState<string | null>(null);
  useEffect(() => {
    setOccasionKey(new URLSearchParams(window.location.search).get("occasion"));
  }, []);
  const occasion = OCCASIONS.find((o) => o.key === occasionKey);

  const shown = products
    .filter((p) => active === "all" || p.tags.includes(active))
    .filter((p) => !occasion || p.occasions?.includes(occasion.key));

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

      {occasion && (
        <p className="catalogue__occasion">
          Gift ideas for: <strong>{occasion.label}</strong>{" "}
          <Link
            href="/objects"
            className="catalogue__occasion-clear"
            aria-label="Show all objects"
            onClick={() => setOccasionKey(null)}
          >
            ✕ show all
          </Link>
        </p>
      )}

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

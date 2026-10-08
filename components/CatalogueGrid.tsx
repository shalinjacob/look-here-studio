"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductTile from "./ProductTile";
import { OCCASIONS } from "@/data/products";
import type { Product } from "@/lib/types";

// The full catalogue grid. Browsing by type happens on the category pages
// (linked above the grid). ?occasion=housewarming|wedding|just-because (from
// the gift guide) narrows it, shown as a removable chip. It's read after mount (not via
// useSearchParams) so the full grid stays in the server HTML and the largest
// image isn't re-rendered on hydration.
export default function CatalogueGrid({ products }: { products: Product[] }) {
  const [occasionKey, setOccasionKey] = useState<string | null>(null);
  useEffect(() => {
    setOccasionKey(new URLSearchParams(window.location.search).get("occasion"));
  }, []);
  const occasion = OCCASIONS.find((o) => o.key === occasionKey);

  const shown = products.filter((p) => !occasion || p.occasions?.includes(occasion.key));

  return (
    <>
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
      </p>

      <div className="tilegrid">
        {shown.map((p, i) => (
          <ProductTile key={p.slug} product={p} delay={(i % 4) * 50} />
        ))}
      </div>
    </>
  );
}

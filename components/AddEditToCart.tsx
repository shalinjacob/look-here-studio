"use client";

import { useState } from "react";
import { useCart } from "./cart/CartContext";
import { formatPrice } from "@/data/products";
import type { Product } from "@/lib/types";

// Adds every product in a gift edit as its own normal cart line. If the edit
// has a "choose one" slot, the customer picks which product fills it.
export default function AddEditToCart({
  items,
  choose,
}: {
  items: Product[];
  choose?: { label: string; options: Product[]; defaultSlug: string };
}) {
  const { addItem } = useCart();
  const [picked, setPicked] = useState(choose?.defaultSlug);
  const [added, setAdded] = useState(false);

  const final = items.map((p) =>
    choose && p.slug === choose.defaultSlug ? choose.options.find((o) => o.slug === picked) ?? p : p
  );
  const total = final.reduce((n, p) => n + (p.price ?? 0), 0);

  return (
    <div className="editbuy">
      {choose && (
        <label className="editbuy__choose">
          <span>{choose.label}</span>
          <select
            value={picked}
            onChange={(e) => {
              setPicked(e.target.value);
              setAdded(false);
            }}
          >
            {choose.options.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.name} · {formatPrice(o.price)}
              </option>
            ))}
          </select>
        </label>
      )}
      <p className="editbuy__total">
        Total <strong>{formatPrice(total)}</strong> · free shipping across India
      </p>
      <button
        className="cta cta--stamp"
        disabled={added}
        onClick={() => {
          final.forEach((p) => addItem(p, 1));
          setAdded(true);
        }}
      >
        <span className="cta__label">{added ? "ADDED ✓" : "ADD THE WHOLE EDIT TO CART"}</span>
        {!added && <span className="cta__arrow">→</span>}
      </button>
    </div>
  );
}

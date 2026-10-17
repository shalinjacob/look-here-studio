"use client";

import { useState } from "react";
import { useCart } from "./cart/CartContext";
import { formatPrice, isPurchasable } from "@/data/products";
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
  // only pieces we can actually make right now go in the cart
  const ready = final.filter(isPurchasable);
  const waiting = final.length - ready.length;
  const total = ready.reduce((n, p) => n + (p.price ?? 0), 0);

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
      {ready.length === 0 ? (
        <p className="editbuy__total">
          We&apos;re working on these ones. Open any piece above to join its wishlist and you&apos;ll hear first.
        </p>
      ) : (
      <>
      {waiting > 0 && (
        <p className="editbuy__fine">
          {waiting === 1 ? "One piece here is" : `${waiting} pieces here are`} still on the workbench, so this adds the rest.
          Open {waiting === 1 ? "it" : "them"} above to join the wishlist.
        </p>
      )}
      <p className="editbuy__total">
        Total <strong>{formatPrice(total)}</strong> · shipping calculated by pincode
      </p>
      <button
        className="cta cta--stamp"
        disabled={added}
        onClick={() => {
          ready.forEach((p) => addItem(p, 1));
          setAdded(true);
        }}
      >
        <span className="cta__label">{added ? "ADDED ✓" : "ADD THE WHOLE EDIT TO CART"}</span>
        {!added && <span className="cta__arrow">→</span>}
      </button>
      </>
      )}
    </div>
  );
}

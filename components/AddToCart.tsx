"use client";

import { useState } from "react";
import { useCart } from "./cart/CartContext";
import { STATUS_CTA, isPurchasable } from "@/data/products";
import type { Product } from "@/lib/types";

// Status-driven action. Purchasable (available/preorder) => add to cart with
// clear feedback + VIEW CART. Otherwise => scroll to the on-page waitlist.

export default function AddToCart({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const canBuy = isPurchasable(product);

  if (!canBuy) {
    return (
      <a href="#waitlist" className="cta cta--stamp addcart__btn">
        <span className="cta__label">{STATUS_CTA[product.status]}</span>
        <span className="cta__arrow">→</span>
      </a>
    );
  }

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
  }

  return (
    <div className="addcart">
      <button
        className="cta cta--stamp addcart__btn"
        onClick={handleAdd}
        disabled={added}
      >
        <span className="cta__label">
          {added ? "ADDED ✓" : STATUS_CTA[product.status]}
        </span>
        {!added && <span className="cta__arrow">→</span>}
      </button>
      {added && (
        <button className="addcart__view" onClick={openCart}>
          VIEW CART →
        </button>
      )}
    </div>
  );
}

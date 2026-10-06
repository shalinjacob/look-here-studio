"use client";

import { useState } from "react";
import { useCart } from "./cart/CartContext";
import { STATUS_CTA, isPurchasable, formatPrice, hasPriceRange } from "@/data/products";
import type { Product } from "@/lib/types";
import { GALLERY_SHOW } from "./ProductGallery";

// Status-driven action. Purchasable (available/preorder) => add to cart with
// clear feedback + VIEW CART. Otherwise => scroll to the on-page waitlist.
// Products with `variants` get a picker first; picking one also jumps the
// gallery to that variant's photo (via the "lhs:gallery-show" event).

export default function AddToCart({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const variants = product.variants ?? [];
  const [vid, setVid] = useState(variants[0]?.id);
  const [word, setWord] = useState("");
  const fields = product.personalise ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const canBuy = isPurchasable(product);
  const v = variants.find((x) => x.id === vid);
  const needsWord =
    (!!v?.custom && word.trim().length === 0) ||
    fields.some((f) => !(values[f.id] ?? "").trim());

  if (!canBuy) {
    return (
      <a href="#waitlist" className="cta cta--stamp addcart__btn">
        <span className="cta__label">{STATUS_CTA[product.status]}</span>
        <span className="cta__arrow">→</span>
      </a>
    );
  }

  function pick(id: string) {
    setVid(id);
    setAdded(false);
    const img = variants.find((x) => x.id === id)?.image;
    if (img) window.dispatchEvent(new CustomEvent(GALLERY_SHOW, { detail: img }));
  }

  function handleAdd() {
    if (needsWord) return;
    if (fields.length > 0) {
      addItem(product, 1, {
        label: fields.map((f) => `${f.cartLabel}: ${values[f.id].trim()}`).join(" · "),
        price: product.price!,
        personalised: true,
      });
      setAdded(true);
      return;
    }
    addItem(
      product,
      1,
      v && {
        label: v.custom ? `${v.label}: ${word.trim().toUpperCase()}` : v.label,
        personalised: !!v.custom,
        price: v.price,
        image: v.image,
      }
    );
    setAdded(true);
  }

  return (
    <div className="addcart-wrap">
      {variants.length > 0 && (
        <fieldset className="variants">
          <legend className="variants__legend">CHOOSE YOUR WORD</legend>
          <div className="variants__list">
            {variants.map((x) => (
              <button
                key={x.id}
                type="button"
                className={`variants__opt${x.id === vid ? " is-active" : ""}`}
                aria-pressed={x.id === vid}
                onClick={() => pick(x.id)}
              >
                <span className="variants__label">{x.label}</span>
                <span className="variants__meta">
                  {[x.note, hasPriceRange(product) && formatPrice(x.price, product.currency)]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </button>
            ))}
          </div>
          {v?.custom && (
            <label className="variants__custom">
              <span>YOUR WORDS (UP TO 4 LETTERS PER PANEL)</span>
              <input
                value={word}
                onChange={(e) => {
                  setWord(e.target.value.replace(/[^a-zA-Z &+]/g, "").slice(0, 20));
                  setAdded(false);
                }}
                placeholder="e.g. GOOD + LUCK"
                maxLength={20}
              />
              <small>We&apos;ll confirm the lettering with you on WhatsApp.</small>
            </label>
          )}
        </fieldset>
      )}

      {fields.length > 0 && (
        <fieldset className="variants">
          <legend className="variants__legend">MAKE IT YOURS</legend>
          {fields.map((f) => (
            <label key={f.id} className="variants__custom variants__custom--free">
              <span>{f.label}</span>
              <input
                value={values[f.id] ?? ""}
                onChange={(e) => {
                  setValues((s) => ({ ...s, [f.id]: e.target.value.slice(0, f.maxLength) }));
                  setAdded(false);
                }}
                placeholder={f.placeholder}
                maxLength={f.maxLength}
              />
            </label>
          ))}
          <small className="variants__note">We&apos;ll confirm the lettering and colour with you on WhatsApp.</small>
        </fieldset>
      )}

      <div className="addcart">
        <button
          className="cta cta--stamp addcart__btn"
          onClick={handleAdd}
          disabled={added || needsWord}
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
    </div>
  );
}

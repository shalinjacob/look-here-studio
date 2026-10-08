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
  const options = product.options ?? [];
  const [chosen, setChosen] = useState<Record<string, string>>(() =>
    Object.fromEntries(options.filter((o) => !o.required).map((o) => [o.id, o.choices[0].id]))
  );
  const canBuy = isPurchasable(product);
  const v = variants.find((x) => x.id === vid);
  const missing = options.filter((o) => !chosen[o.id]);
  const optionPrice =
    (product.price ?? 0) +
    options.reduce((n, o) => n + (o.choices.find((c) => c.id === chosen[o.id])?.priceDelta ?? 0), 0);
  const needsWord =
    (!!v?.custom && word.trim().length === 0) ||
    fields.some((f) => !(values[f.id] ?? "").trim()) ||
    missing.length > 0;

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

  function choose(optionId: string, choiceId: string) {
    setChosen((s) => ({ ...s, [optionId]: choiceId }));
    setAdded(false);
    const img = options.find((o) => o.id === optionId)?.choices.find((c) => c.id === choiceId)?.image;
    if (img) window.dispatchEvent(new CustomEvent(GALLERY_SHOW, { detail: img }));
  }

  function handleAdd() {
    if (needsWord) return;
    if (options.length > 0) {
      const picked = options.map((o) => o.choices.find((c) => c.id === chosen[o.id])!);
      const colour = picked.find((c) => c.image);
      addItem(product, 1, {
        label: picked.map((c) => c.label).join(" · "),
        price: optionPrice,
        image: colour?.image,
      });
      setAdded(true);
      return;
    }
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
      {options.map((o) => (
        <fieldset className="variants" key={o.id}>
          <legend className="variants__legend">{o.legend}</legend>
          <div className="variants__list variants__list--compact">
            {o.choices.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`variants__opt${chosen[o.id] === c.id ? " is-active" : ""}`}
                aria-pressed={chosen[o.id] === c.id}
                onClick={() => choose(o.id, c.id)}
              >
                <span className="variants__label">{c.label}</span>
                {(c.note || c.priceDelta !== undefined) && (
                  <span className="variants__meta">
                    {[c.note, c.priceDelta !== undefined && formatPrice((product.price ?? 0) + c.priceDelta, product.currency)]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      {options.length > 0 && (
        <p className="variants__total">
          {missing.length > 0
            ? `Pick your ${missing.map((o) => o.legend.replace(/^CHOOSE YOUR /, "").toLowerCase()).join(" and ")}`
            : formatPrice(optionPrice, product.currency)}
        </p>
      )}
      {variants.length > 0 && (
        <fieldset className="variants">
          <legend className="variants__legend">{product.variantLegend ?? "CHOOSE YOUR WORD"}</legend>
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

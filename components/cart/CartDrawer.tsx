"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/data/products";

// Slide-over cart. Handles qty change, remove, subtotal, and a checkout stub.

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, currency, setQty, removeItem } =
    useCart();

  // lock scroll + escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div className={`drawer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="drawer__scrim" onClick={closeCart} />
      <aside
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <header className="drawer__head">
          <span className="drawer__title">
            OBJECTS ({count})
          </span>
          <button className="drawer__close" onClick={closeCart} aria-label="Close cart">
            CLOSE ✕
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p>Nothing here yet.</p>
            <p className="drawer__empty-sub">
              The bag is as minimal as the rest of the site.
            </p>
            <Link href="/objects" className="cta cta--link" onClick={closeCart}>
              <span className="cta__label">SEE THE OBJECTS</span>
              <span className="cta__arrow">→</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {lines.map((l) => (
                <li className="cartline" key={l.slug}>
                  <Link
                    href={`/objects/${l.slug}`}
                    className="cartline__thumb"
                    onClick={closeCart}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt={l.name} />
                  </Link>
                  <div className="cartline__body">
                    <div className="cartline__top">
                      <Link
                        href={`/objects/${l.slug}`}
                        className="cartline__name"
                        onClick={closeCart}
                      >
                        {l.name}
                      </Link>
                      <button
                        className="cartline__remove"
                        onClick={() => removeItem(l.slug)}
                        aria-label={`Remove ${l.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {l.status === "preorder" && (
                      <span className="cartline__tag">Preorder</span>
                    )}
                    <div className="cartline__bottom">
                      <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                        <button
                          className="qty__btn"
                          onClick={() => setQty(l.slug, l.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty__val" aria-live="polite">{l.qty}</span>
                        <button
                          className="qty__btn"
                          onClick={() => setQty(l.slug, l.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cartline__price">
                        {formatPrice(l.price * l.qty, l.currency)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer__foot">
              <div className="drawer__subtotal">
                <span>SUBTOTAL</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <p className="drawer__note">
                Taxes and shipping calculated at checkout.
              </p>
              <button
                className="cta cta--stamp drawer__checkout"
                onClick={() =>
                  alert(
                    "Checkout is a stub in this demo. Connect Shopify or Stripe here — see README."
                  )
                }
              >
                <span className="cta__label">CHECKOUT</span>
                <span className="cta__arrow">→</span>
              </button>
              <Link href="/objects" className="drawer__continue" onClick={closeCart}>
                keep looking
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

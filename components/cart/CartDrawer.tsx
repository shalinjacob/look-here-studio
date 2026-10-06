"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, lineId, GIFT_NOTE_MAX, type CartLine } from "./CartContext";
import { formatPrice } from "@/data/products";
import { waLink } from "@/lib/site";
import { track } from "@/lib/analytics";

/** the WhatsApp order request (format agreed in the website brief) */
function requestMessage(lines: CartLine[], subtotal: number, currency: string, gift: boolean, giftNote: string) {
  const items = lines
    .map((l) => {
      const variant = l.variant && !l.personalised ? ` (${l.variant})` : "";
      return `• ${l.name}${variant} ×${l.qty} — ${formatPrice(l.price * l.qty, l.currency)}`;
    })
    .join("\n");
  const personal = lines
    .filter((l) => l.personalised)
    .map((l) => `${l.name}: ${l.variant ?? "details to share on WhatsApp"}`)
    .join("; ");
  return (
    `Hi Look Here Studio! I'd like to order:\n\n` +
    `${items}\n` +
    `Subtotal: ${formatPrice(subtotal, currency)} (free shipping)\n\n` +
    `Gift: ${gift ? "Yes" : "No"}\n` +
    `Gift note: ${gift && giftNote.trim() ? giftNote.trim() : "—"}\n` +
    `Personalisation: ${personal || "—"}\n\n` +
    `Name:\nDelivery city + pincode:`
  );
}

// Slide-over cart. Handles qty change, remove, subtotal, and a WhatsApp request.

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, currency, setQty, removeItem, gift, giftNote, setGift } =
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
                <li className="cartline" key={lineId(l)}>
                  <Link
                    href={`/objects/${l.slug}`}
                    className="cartline__thumb"
                    onClick={closeCart}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt="" />
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
                        onClick={() => removeItem(lineId(l))}
                        aria-label={`Remove ${l.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {l.variant && <span className="cartline__variant">{l.variant}</span>}
                    <div className="cartline__bottom">
                      <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                        <button
                          className="qty__btn"
                          onClick={() => setQty(lineId(l), l.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty__val" aria-live="polite">{l.qty}</span>
                        <button
                          className="qty__btn"
                          onClick={() => setQty(lineId(l), l.qty + 1)}
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
              <div className="gift">
                <label className="gift__check">
                  <input
                    type="checkbox"
                    checked={gift}
                    onChange={(e) => setGift(e.target.checked, giftNote)}
                  />
                  <span>This is a gift 🎁</span>
                </label>
                {gift && (
                  <label className="gift__note">
                    <span>Your note (we&apos;ll handwrite it, keep it short):</span>
                    <textarea
                      rows={3}
                      maxLength={GIFT_NOTE_MAX}
                      value={giftNote}
                      onChange={(e) => setGift(true, e.target.value)}
                    />
                    <small aria-live="polite">{giftNote.length}/{GIFT_NOTE_MAX}</small>
                  </label>
                )}
              </div>
              <p className="drawer__note">
                We&apos;ll confirm price, details &amp; delivery on WhatsApp.
              </p>
              <button
                className="cta cta--stamp drawer__checkout"
                onClick={() => {
                  track("whatsapp_click", { location: "cart", value: subtotal, currency });
                  const url = waLink(requestMessage(lines, subtotal, currency, gift, giftNote));
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <span className="cta__label">SEND PRODUCT REQUEST</span>
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

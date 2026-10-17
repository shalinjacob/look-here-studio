"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, lineId, GIFT_NOTE_MAX, type CartLine } from "./CartContext";
import { formatPrice } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { ONLINE_PAYMENT } from "@/lib/site";
import RazorpayButton from "./RazorpayButton";
import { setDelivery, useDelivery } from "@/lib/deliveryStore";
import { shippingForCart } from "@/config/shipping";

/** the WhatsApp order request (format agreed in the website brief) */
function requestMessage(lines: CartLine[], subtotal: number, currency: string, gift: boolean, giftNote: string, pincode: string) {
  const ship = shippingForCart(pincode, lines);
  const items = lines
    .map((l) => {
      const variant = l.variant && !l.personalised ? ` (${l.variant})` : "";
      return `• ${l.name}${variant} ×${l.qty} — ${formatPrice(l.price * l.qty, l.currency)}`;
    })
    .join("\n");
  // Only when the cart holds a personalisable product. Text the product page
  // collected goes in; otherwise it's left blank for the customer to type.
  const personalisation = lines.some((l) => l.personalisable)
    ? `Personalisation: ${lines
        .filter((l) => l.personalised && l.variant)
        .map((l) => `${l.name}: ${l.variant}`)
        .join("; ")}\n`
    : "";
  return (
    `Hi Look Here Studio! I'd like to order:\n\n` +
    `${items}\n` +
    `Subtotal: ${formatPrice(subtotal, currency)}\n` +
    (ship
      ? `Shipping to ${pincode.trim()} (${ship.zone}): ${formatPrice(ship.fee, currency)}\nTotal: ${formatPrice(subtotal + ship.fee, currency)}\n\n`
      : `Shipping: to be confirmed for my pincode\n\n`) +
    `Gift: ${gift ? "Yes" : "No"}\n` +
    `Gift note: ${gift && giftNote.trim() ? giftNote.trim() : "—"}\n` +
    personalisation +
    `\nFull name:\nAddress:\nEmail:\nMobile number:\nPincode: ${pincode.trim()}`
  );
}

// Slide-over cart. Handles qty change, remove, subtotal, and a WhatsApp request.

export default function CartDrawer() {
  const delivery = useDelivery();
  const { isOpen, closeCart, lines, count, subtotal, currency, setQty, removeItem, gift, giftNote, setGift } =
    useCart();
  const ship = shippingForCart(delivery.pincode, lines);

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
              <label className="drawer__pin">
                <span>DELIVERY PINCODE</span>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="postal-code"
                  placeholder="6 digits"
                  value={delivery.pincode}
                  onChange={(e) => setDelivery({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                />
              </label>
              <div className="drawer__subtotal">
                <span>SHIPPING{ship ? ` · ${ship.zone.toUpperCase()}` : ""}</span>
                <span>{ship ? formatPrice(ship.fee, currency) : "Enter pincode"}</span>
              </div>
              {ship && (
                <div className="drawer__subtotal drawer__total">
                  <span>TOTAL</span>
                  <span>{formatPrice(subtotal + ship.fee, currency)}</span>
                </div>
              )}
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
                {ONLINE_PAYMENT
                  ? "Pay online, or send the request and we'll confirm price, details & delivery on WhatsApp."
                  : "Send us your order on WhatsApp and we'll confirm price, details & delivery."}
              </p>
              <button
                className="cta cta--stamp drawer__checkout drawer__checkout--primary"
                onClick={() => {
                  // the main conversion: fired (as a beacon) before WhatsApp opens
                  track("generate_lead", {
                    value: subtotal,
                    currency,
                    lead_source: "whatsapp_cart",
                    items: lines.map((l) => ({ item_id: l.slug, item_name: l.name, item_variant: l.variant, price: l.price, quantity: l.qty })),
                  });
                  const url = buildWhatsAppLink({ text: requestMessage(lines, subtotal, currency, gift, giftNote, delivery.pincode) });
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.9 2.3 1 2.5c.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"
                  />
                </svg>
                <span className="cta__label">SEND ORDER ON WHATSAPP</span>
                <span className="cta__arrow">→</span>
              </button>
              {ONLINE_PAYMENT ? (
                <RazorpayButton />
              ) : (
                <>
                  <button className="cta drawer__checkout drawer__checkout--off" disabled aria-disabled="true">
                    <span className="cta__label">PAY ONLINE</span>
                  </button>
                  <p className="drawer__note drawer__soon">We&apos;re working on enabling online payment super soon.</p>
                </>
              )}
              <div className="drawer__fine">
                <p>Made to order · dispatched within 10 working days · Shipping calculated by pincode</p>
                <p>
                  7-day returns on unused standard objects; personalised pieces are final sale.{" "}
                  <Link href="/shipping-returns" onClick={closeCart}>Shipping &amp; returns</Link>
                </p>
                <p>
                  <Link href="/terms" onClick={closeCart}>Terms</Link> ·{" "}
                  <Link href="/privacy" onClick={closeCart}>Privacy</Link>
                </p>
              </div>
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

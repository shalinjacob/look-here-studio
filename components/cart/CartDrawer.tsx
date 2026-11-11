"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, lineId, GIFT_NOTE_MAX, type CartLine } from "./CartContext";
import { formatPrice } from "@/data/products";
import WaLink from "@/components/WaLink";
import { ONLINE_PAYMENT } from "@/lib/site";
import RazorpayButton from "./RazorpayButton";
import { setDelivery, useDelivery } from "@/lib/deliveryStore";
import { shippingForCart, localOnlyBlocked } from "@/config/shipping";

// Slide-over cart. Handles qty change, remove, subtotal, and a WhatsApp request.

export default function CartDrawer() {
  const delivery = useDelivery();
  const { isOpen, closeCart, lines, count, subtotal, currency, setQty, removeItem, gift, giftNote, setGift } =
    useCart();
  const ship = shippingForCart(delivery.pincode, lines);
  const localOnly = localOnlyBlocked(delivery.pincode, lines);

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
              {localOnly.length > 0 && (
                <p className="drawer__local" role="alert">
                  {localOnly.join(", ")} is only delivered within Bengaluru for now. Remove it to order to this pincode, or message us and we&apos;ll tell you when it travels.
                </p>
              )}
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
              <p className="drawer__note">Pay securely online (UPI, cards, netbanking). We confirm your delivery details after payment.</p>

              {ONLINE_PAYMENT ? (
                <RazorpayButton blocked={localOnly.length > 0} />
              ) : (
                <>
                  <button className="cta drawer__checkout drawer__checkout--off" disabled aria-disabled="true">
                    <span className="cta__label">PAY ONLINE</span>
                  </button>
                  <p className="drawer__note drawer__soon">We&apos;re working on enabling online payment super soon.</p>
                </>
              )}
              <p className="drawer__note">
                Want something custom or personalised?{" "}
                <WaLink text="Hi Look Here Studio! I'd like to ask about a custom order." className="cta cta--link">
                  Ask on WhatsApp
                </WaLink>
              </p>
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

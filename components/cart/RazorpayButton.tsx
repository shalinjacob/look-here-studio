"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cleanCustomer, type Customer } from "@/lib/orderDetails";
import { setDelivery, useDelivery } from "@/lib/deliveryStore";
import { shippingForCart } from "@/config/shipping";
import { formatPrice } from "@/data/products";
import { useCart } from "./CartContext";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (ev: string, cb: (r: { error?: { description?: string } }) => void) => void };
  }
}

const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function loadScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// "PAY ONLINE": create order -> Razorpay modal -> verify signature on the server.
export default function RazorpayButton({ blocked = false }: { blocked?: boolean }) {
  const { lines, subtotal, clear, gift, giftNote } = useCart();
  const c = useDelivery();
  const ship = shippingForCart(c.pincode, lines);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDelivery({ [k]: e.target.value });

  // the details pop-up: Esc closes it, focus lands on the first field, page doesn't scroll behind it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, busy]);

  if (!KEY_ID) return null;

  async function pay() {
    setMsg(null);
    const who = cleanCustomer(c);
    if (!who.ok) {
      setMsg({ ok: false, text: who.error });
      return;
    }
    setBusy(true);
    try {
      if (!(await loadScript())) throw new Error("Could not load the payment window. Check your connection.");
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ slug: l.slug, price: l.price, qty: l.qty, variant: l.variant })),
          customer: who.value,
          gift,
          giftNote,
        }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not start the payment.");

      const rzp = new window.Razorpay!({
        key: KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Look Here Studio",
        description: `${lines.length} item${lines.length > 1 ? "s" : ""}`,
        prefill: { name: who.value.name, email: who.value.email, contact: `+91${who.value.phone}` },
        theme: { color: "#111111" },
        modal: { ondismiss: () => { setBusy(false); setMsg({ ok: false, text: "Payment cancelled. Your cart is safe." }); } },
        handler: async (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const v = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(r),
            });
            const out = await v.json();
            if (!v.ok || !out.success) throw new Error(out.error || "Verification failed");
            track("generate_lead", { value: subtotal, currency: "INR", lead_source: "razorpay_paid" });
            clear();
            setOpen(false);
            setMsg({ ok: true, text: `Payment received (ref ${r.razorpay_payment_id}). We'll message you to confirm delivery details.` });
          } catch {
            setMsg({ ok: false, text: `We couldn't confirm your payment automatically. Quote ref ${r.razorpay_payment_id} to us on WhatsApp.` });
          } finally {
            setBusy(false);
          }
        },
      });
      rzp.on("payment.failed", (f) => {
        setBusy(false);
        setMsg({ ok: false, text: f.error?.description || "Payment failed. Please try again." });
      });
      rzp.open();
    } catch (e) {
      setBusy(false);
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Something went wrong." });
    }
  }

  const total = ship ? subtotal + ship.fee : null;

  return (
    <>
      <button
        className="cta cta--stamp drawer__checkout"
        disabled={blocked}
        onClick={() => {
          setMsg(null);
          setOpen(true);
        }}
      >
        <span className="cta__label">{total ? `PAY ${formatPrice(total)} ONLINE` : "PAY ONLINE"}</span>
        <span className="cta__arrow">→</span>
      </button>
      {!open && msg && (
        <p className="drawer__note" role="status" style={{ color: msg.ok ? undefined : "#b3261e" }}>{msg.text}</p>
      )}

      {open &&
        createPortal(
          <div className="paymodal" role="dialog" aria-modal="true" aria-labelledby="paymodal-title">
            <div className="paymodal__scrim" onClick={() => !busy && setOpen(false)} />
            <form
              className="paymodal__panel"
              onSubmit={(e) => {
                e.preventDefault();
                pay();
              }}
            >
              <div className="paymodal__head">
                <h2 id="paymodal-title">Where should we send it?</h2>
                <button type="button" className="paymodal__close" onClick={() => setOpen(false)} disabled={busy} aria-label="Close">
                  CLOSE ✕
                </button>
              </div>
              <p className="paymodal__sub">We need these before you pay, so we can deliver and send your receipt.</p>

              <label>
                <span>FULL NAME</span>
                <input ref={firstField} autoComplete="name" value={c.name} onChange={set("name")} />
              </label>
              <div className="paymodal__row">
                <label>
                  <span>MOBILE NUMBER</span>
                  <input inputMode="numeric" autoComplete="tel" value={c.phone} onChange={set("phone")} />
                </label>
                <label>
                  <span>PINCODE</span>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="postal-code"
                    value={c.pincode}
                    onChange={(e) => setDelivery({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                  />
                </label>
              </div>
              <label>
                <span>EMAIL (FOR YOUR RECEIPT)</span>
                <input type="email" autoComplete="email" value={c.email} onChange={set("email")} />
              </label>
              <label>
                <span>ADDRESS</span>
                <textarea rows={3} autoComplete="street-address" placeholder="House / flat, street, area" value={c.address} onChange={set("address")} />
              </label>

              <div className="paymodal__sum">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
                <span>Shipping{ship ? ` · ${ship.zone}` : ""}</span>
                <span>{ship ? formatPrice(ship.fee) : "Enter pincode"}</span>
                <strong>Total</strong>
                <strong>{total ? formatPrice(total) : "—"}</strong>
              </div>

              {msg && !msg.ok && (
                <p className="paymodal__err" role="alert">{msg.text}</p>
              )}
              <button type="submit" className="cta cta--stamp paymodal__pay" disabled={busy}>
                <span className="cta__label">{busy ? "OPENING PAYMENT…" : total ? `PAY ${formatPrice(total)}` : "PAY"}</span>
                <span className="cta__arrow">→</span>
              </button>
            </form>
          </div>,
          document.body
        )}
    </>
  );
}

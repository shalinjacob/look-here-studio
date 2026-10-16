"use client";

import { useState } from "react";
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
export default function RazorpayButton() {
  const { lines, subtotal, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!KEY_ID) return null;

  async function pay() {
    setMsg(null);
    setBusy(true);
    try {
      if (!(await loadScript())) throw new Error("Could not load the payment window. Check your connection.");
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: lines.map((l) => ({ slug: l.slug, price: l.price, qty: l.qty, variant: l.variant })) }),
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

  return (
    <>
      <button className="cta cta--stamp drawer__checkout" onClick={pay} disabled={busy}>
        <span className="cta__label">{busy ? "OPENING PAYMENT…" : "PAY ONLINE"}</span>
        <span className="cta__arrow">→</span>
      </button>
      {msg && <p className="drawer__note" role="status" style={{ color: msg.ok ? undefined : "#b3261e" }}>{msg.text}</p>}
    </>
  );
}

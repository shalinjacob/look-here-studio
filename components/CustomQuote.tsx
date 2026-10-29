"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/data/products";
import { quoteFor, QUOTE_FROM, SETUP_FEE, SETUP_WAIVED_FROM, type CustomItem } from "@/config/custom";

// "What would my custom order cost?": an indicative price from the quantity tiers
// in config/custom.ts. The studio confirms the real price on WhatsApp before any
// payment, so this only ever opens a prefilled message.
export default function CustomQuote({ items }: { items: CustomItem[] }) {
  const [itemId, setItemId] = useState(items[0].id);
  const [qty, setQty] = useState(1);
  const item = items.find((i) => i.id === itemId) ?? items[0];
  const q = quoteFor(item.from, qty);

  const text = [
    `Hi Look Here Studio! I'd like a custom order: ${item.label}, ${qty} piece${qty === 1 ? "" : "s"}.`,
    q.byHand ? "" : `(Price check on the site: about ${formatPrice(q.total)}.)`,
    "",
    "My idea / art:",
    "",
    "Name:",
    "City + pincode:",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  return (
    <div className="customquote" role="group" aria-label="Custom order price check">
      <div className="customquote__row">
        <label className="customquote__field">
          <span>WHAT</span>
          <select value={itemId} onChange={(e) => setItemId(e.target.value)}>
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label} · from {formatPrice(i.from)}
              </option>
            ))}
          </select>
        </label>
        <label className="customquote__field customquote__field--qty">
          <span>HOW MANY</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(999, Math.floor(Number(e.target.value)) || 1)))}
          />
        </label>
      </div>

      <p className="customquote__total" aria-live="polite">
        {q.byHand ? (
          <>
            <strong>{qty} pieces: we&apos;ll quote it.</strong> Runs of {QUOTE_FROM} or more are priced by hand.
          </>
        ) : (
          <>
            <strong>About {formatPrice(q.total)}</strong>
            <span>
              {qty} × {formatPrice(q.unit)}
              {q.setup > 0 ? ` + ${formatPrice(SETUP_FEE)} design setup` : ""} · {q.tier.label.toLowerCase()}
            </span>
          </>
        )}
      </p>
      {!q.byHand && qty < SETUP_WAIVED_FROM && (
        <p className="customquote__hint">
          Add {SETUP_WAIVED_FROM - qty} more and the setup fee drops off, plus 10% off each piece.
        </p>
      )}

      <a href={buildWhatsAppLink({ text })} target="_blank" rel="noreferrer" className="cta cta--stamp">
        <span className="cta__label">SEND THIS ON WHATSAPP</span>
        <span className="cta__arrow">→</span>
      </a>
      <small className="customquote__fine">An estimate for one design. We send a proof and confirm the exact price before you pay.</small>
    </div>
  );
}

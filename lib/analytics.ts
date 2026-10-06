// ---------------------------------------------------------------------------
// Analytics events → GA4 (gtag) and Meta Pixel (fbq), whichever is loaded.
// Both are optional: with no IDs set (see components/Analytics.tsx) nothing
// loads and these calls are no-ops.
// ---------------------------------------------------------------------------

type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** GA4 recommended event → Meta standard event */
const META: Record<string, string> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  generate_lead: "Lead",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    const meta = META[event];
    if (meta) window.fbq?.("track", meta, { value: params.value, currency: params.currency });
    else window.fbq?.("trackCustom", event, params);
  } catch {
    /* analytics must never break the page */
  }
}

/** GA4 item shape for an object */
export const gaItem = (p: { slug: string; name: string; price: number | null; category: string }, qty = 1, variant?: string) => ({
  item_id: p.slug,
  item_name: p.name,
  item_category: p.category,
  ...(variant ? { item_variant: variant } : {}),
  price: p.price ?? undefined,
  quantity: qty,
});

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

/** our events → Meta standard events. There's no purchase event: payment
 *  happens off the website, after WhatsApp confirmation. */
export type AnalyticsEvent = "view_item" | "add_to_cart" | "generate_lead" | "whatsapp_click" | "join_waitlist";

const META: Record<AnalyticsEvent, string> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  generate_lead: "Lead", // the cart's WhatsApp "Send product request"
  whatsapp_click: "Contact", // every other WhatsApp link
  join_waitlist: "CompleteRegistration", // waitlist + Founding List
};

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    // beacon transport so the hit survives the page handing off to WhatsApp
    window.gtag?.("event", event, { ...params, transport_type: "beacon" });
    const { value, currency } = params;
    window.fbq?.("track", META[event], value != null ? { value, currency } : {});
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

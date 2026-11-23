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

/** our events → Meta standard events. `purchase` fires when Razorpay payment is verified;
 *  `ai_referral` marks the first page of a visit that arrived from ChatGPT (GA4 only). */
export type AnalyticsEvent =
  | "view_item"
  | "add_to_cart"
  | "generate_lead"
  | "whatsapp_click"
  | "join_waitlist"
  | "purchase"
  | "ai_referral";

const META: Partial<Record<AnalyticsEvent, string>> = {
  purchase: "Purchase",
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  generate_lead: "Lead", // the cart's WhatsApp "Send product request"
  whatsapp_click: "Contact", // every other WhatsApp link
  join_waitlist: "CompleteRegistration", // waitlist + Founding List
};

const SRC_KEY = "lhs_src";

/**
 * Detects a visit from ChatGPT (ChatGPT adds utm_source=chatgpt.com to the links it shows;
 * the referrer is the fallback) and remembers it for the rest of the visit, so every
 * later event (add to cart, WhatsApp click, purchase) carries `traffic_source: "chatgpt"`.
 * Returns the remembered source, or "" when there isn't one.
 */
export function trafficSource(): string {
  if (typeof window === "undefined") return "";
  try {
    const found = window.sessionStorage.getItem(SRC_KEY);
    if (found) return found;
    const utm = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() ?? "";
    let host = "";
    try { host = new URL(document.referrer).hostname; } catch { /* no referrer */ }
    const fromChatGpt = /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/.test(host) || utm === "chatgpt.com" || utm === "chatgpt";
    if (fromChatGpt) {
      window.sessionStorage.setItem(SRC_KEY, "chatgpt");
      return "chatgpt";
    }
  } catch {
    /* storage blocked: no attribution, nothing breaks */
  }
  return "";
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    // beacon transport so the hit survives the page handing off to WhatsApp
    const src = trafficSource();
    window.gtag?.("event", event, { ...params, ...(src ? { traffic_source: src } : {}), transport_type: "beacon" });
    const { value, currency } = params;
    const metaEvent = META[event];
    if (metaEvent) window.fbq?.("track", metaEvent, value != null ? { value, currency } : {});
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

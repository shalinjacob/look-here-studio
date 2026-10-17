// ---------------------------------------------------------------------------
// Campaign dates + copy, in one place. All times are IST (Asia/Kolkata).
// Edit the dates/copy here; components read from this file only.
// ---------------------------------------------------------------------------

/** End of the Diwali countdown banner (not a customer-facing order deadline). */
export const DIWALI_CUTOFF = "2026-10-14T23:59:59+05:30";

export const BANNER_A = {
  title: "Gifts you can give this Diwali.",
  body: "Every piece is made to order and dispatched within 10 working days.",
  cta: "See gift ideas",
  href: "/gift-guide",
};

import { WISHLIST_MODE } from "@/lib/site";

export type CampaignState = "countdown" | "none";

const CUTOFF_MS = Date.parse(DIWALI_CUTOFF);

/** which banner shows at a given instant (absolute time, so the zone of the
 *  server or browser running this doesn't matter) */
export function campaignState(nowMs: number): CampaignState {
  if (WISHLIST_MODE) return "none"; // no order-by banners while we're only taking wishlist sign-ups
  if (nowMs <= CUTOFF_MS) return "countdown";
  return "none";
}

/** time left until the switch-over, floored to whole minutes */
export function countdownParts(nowMs: number) {
  const mins = Math.max(0, Math.floor((CUTOFF_MS - nowMs) / 60000));
  return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 };
}

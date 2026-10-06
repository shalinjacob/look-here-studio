// ---------------------------------------------------------------------------
// Campaign dates + copy, in one place. All times are IST (Asia/Kolkata).
// Edit the dates/copy here; components read from this file only.
// ---------------------------------------------------------------------------

/** Order-by cut-off for pre-Diwali delivery (Banner A counts down to this). */
export const DIWALI_CUTOFF = "2026-10-14T23:59:59+05:30";
/** Gift Promise (Banner B) runs from the cut-off until the end of Diwali day. */
export const DIWALI_END = "2026-11-08T23:59:59+05:30";

export const BANNER_A = {
  title: "Gifts you can give this Diwali.",
  body: "Order by Wed 14 Oct and it arrives before the 8th.",
  cta: "See gift ideas",
  href: "/gift-guide",
};

export const BANNER_B = {
  title: "Missed the Diwali cut-off? Give a Gift Promise.",
  body: "Order now, hand over a card on the day, and the object follows (dispatched within 10 working days).",
  cta: "How it works",
  href: "/gift-promise",
};

export type CampaignState = "countdown" | "gift-promise" | "none";

const CUTOFF_MS = Date.parse(DIWALI_CUTOFF);
const END_MS = Date.parse(DIWALI_END);

/** which banner shows at a given instant (absolute time, so the zone of the
 *  server or browser running this doesn't matter) */
export function campaignState(nowMs: number): CampaignState {
  if (nowMs <= CUTOFF_MS) return "countdown";
  if (nowMs <= END_MS) return "gift-promise";
  return "none";
}

/** time left until the cut-off, floored to whole minutes */
export function countdownParts(nowMs: number) {
  const mins = Math.max(0, Math.floor((CUTOFF_MS - nowMs) / 60000));
  return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 };
}

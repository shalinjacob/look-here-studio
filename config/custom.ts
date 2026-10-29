// ---------------------------------------------------------------------------
// Custom-order pricing: ONE place for the quantity tiers shown on /custom and
// used by the instant price check. These numbers are the studio's proposal
// (owner to confirm): change them here and the page updates itself.
// ---------------------------------------------------------------------------

/** one-off charge for setting up a new design (waived from SETUP_WAIVED_FROM pieces) */
export const SETUP_FEE = 250;
export const SETUP_WAIVED_FROM = 5;
/** from this many pieces we quote by hand instead of using the price check */
export const QUOTE_FROM = 25;
/** most pieces we'll price instantly */
export const MAX_INSTANT_QTY = QUOTE_FROM - 1;

export interface Tier {
  from: number;
  to: number | null; // null = no upper limit
  /** fraction off the standard price: 0.1 = 10% */
  discount: number;
  label: string;
}

export const TIERS: Tier[] = [
  { from: 1, to: 4, discount: 0, label: "Standard price" },
  { from: 5, to: 9, discount: 0.1, label: "10% off, no setup fee" },
  { from: 10, to: QUOTE_FROM - 1, discount: 0.2, label: "20% off, no setup fee" },
  { from: QUOTE_FROM, to: null, discount: 0, label: "Quoted by hand" },
];

export const tierFor = (qty: number): Tier => TIERS.filter((t) => qty >= t.from).pop() ?? TIERS[0];

/** a custom piece we can make; `from` is the standard starting price in rupees */
export interface CustomItem {
  id: string;
  label: string;
  from: number;
  note: string;
}

export interface CustomQuote {
  tier: Tier;
  unit: number;
  setup: number;
  total: number;
  /** true from QUOTE_FROM pieces: no instant price */
  byHand: boolean;
}

/** indicative price for `qty` pieces of one design at a standard price of `price` */
export function quoteFor(price: number, qty: number): CustomQuote {
  const q = Math.max(1, Math.floor(qty) || 1);
  const tier = tierFor(q);
  const unit = Math.round(price * (1 - tier.discount));
  const setup = q >= SETUP_WAIVED_FROM ? 0 : SETUP_FEE;
  return { tier, unit, setup, total: unit * q + setup, byHand: q >= QUOTE_FROM };
}

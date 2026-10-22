// Shipping fee by delivery pincode. One flat fee per ORDER, set by zone.
// Zones come from the first digits of the pincode (India Post regions).
// ⚠ OWNER: the fees below are PLACEHOLDERS: replace with your real courier costs,
// then set SHIPPING_FEES_CONFIRMED to true. First matching zone wins; anything
// that matches none gets DEFAULT_ZONE.

export const SHIPPING_FEES_CONFIRMED = false;

export interface ShippingZone {
  id: string;
  name: string;
  fee: number; // ₹ per order
  /** pincode prefixes this zone covers */
  prefixes: string[];
}

export const SHIPPING_ZONES: ShippingZone[] = [
  { id: "bengaluru", name: "Bengaluru", fee: 150, prefixes: ["560", "561", "562"] },
  {
    id: "south",
    name: "South India",
    fee: 250,
    // Karnataka 56-59, Andhra/Telangana 50-53, Tamil Nadu/Puducherry 60-64, Kerala 67-69
    prefixes: ["50", "51", "52", "53", "56", "57", "58", "59", "60", "61", "62", "63", "64", "67", "68", "69"],
  },
  {
    id: "remote",
    name: "North-East, J&K & Islands",
    fee: 550,
    // J&K/Ladakh 18-19, Assam 78, rest of North-East 79, Andaman 744
    prefixes: ["18", "19", "78", "79", "744"],
  },
];

export const DEFAULT_ZONE: Omit<ShippingZone, "prefixes"> = { id: "india", name: "Rest of India", fee: 350 };

/**
 * Extra shipping per unit for bulky/heavy pieces, added on top of the zone fee.
 * ⚠ OWNER: placeholders derived from the cost teardown sheet (its pack+ship cost
 * for the item, minus the ₹350 standard fee, rounded to ₹50). Replace with real
 * courier quotes. Anything not listed ships at the zone fee alone.
 */
export const BULKY_EXTRA: Record<string, number> = {
  "square-frame": 150,
  "four-letter-words": 150,
  "cat-got-your-heart": 150,
  "pickleball-shadow-box": 150,
  "custom-lightbox": 150,
  "old-habits": 150,
  "smoke-and-feathers": 150,
  "pomegranate-study": 150,
  "blood-moon": 150,
  "sunglasses-at-court": 150,
  "still-water": 150,
  "road-trip-in-bloom": 150,
  "hearts-and-crosses": 150,
  "pink-wavy-mirror": 350,
  "well-look-at-you": 350,
  "love-more": 350,
  "slim-led-quote-frame": 350,
  "small-planet": 600,
  "ripple-mirror": 3150,
};

/** fee for a 6-digit pincode, or null while the pincode isn't valid yet */
export function shippingFor(pincode: string): { fee: number; zone: string } | null {
  const pin = pincode.trim();
  if (!/^[1-9]\d{5}$/.test(pin)) return null;
  const z = SHIPPING_ZONES.find((zone) => zone.prefixes.some((p) => pin.startsWith(p)));
  return z ? { fee: z.fee, zone: z.name } : { fee: DEFAULT_ZONE.fee, zone: DEFAULT_ZONE.name };
}

/** whole-order shipping: the zone fee once, plus the large-item extra for every unit */
export function shippingForCart(
  pincode: string,
  lines: { slug: string; qty: number }[]
): { fee: number; zone: string; base: number; extra: number } | null {
  const z = shippingFor(pincode);
  if (!z) return null;
  const extra = lines.reduce((n, l) => n + (BULKY_EXTRA[l.slug] ?? 0) * l.qty, 0);
  return { fee: z.fee + extra, zone: z.zone, base: z.fee, extra };
}

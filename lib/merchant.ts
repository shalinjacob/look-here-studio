import type { Product } from "./types";
import { isFinalSale, isPurchasable } from "@/data/products";

// ---------------------------------------------------------------------------
// Google merchant data shared by the product JSON-LD and the Merchant Center
// feed, so the two can never disagree. Policy values mirror /shipping-returns.
// ---------------------------------------------------------------------------

export const SKU = (p: Product) => `LHS-${p.objectNumber}`;

/** handling = up to 10 working days. OWNER: confirm courier transit days. */
export const HANDLING_DAYS = { min: 1, max: 10 };
export const TRANSIT_DAYS = { min: 2, max: 6 };

/** schema.org availability. Everything orderable is made to order, which
 *  Google reads as "can be bought now" (InStock); the page explains the lead time. */
export const schemaAvailability = (p: Product) =>
  isPurchasable(p) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
export const feedAvailability = (p: Product) => (isPurchasable(p) ? "in_stock" : "out_of_stock");

export const shippingDetailsLd = {
  "@type": "OfferShippingDetails",
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
  shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "INR" },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    businessDays: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => `https://schema.org/${d}`),
    },
    handlingTime: { "@type": "QuantitativeValue", minValue: HANDLING_DAYS.min, maxValue: HANDLING_DAYS.max, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: TRANSIT_DAYS.min, maxValue: TRANSIT_DAYS.max, unitCode: "DAY" },
  },
};

export function returnPolicyLd(p: Product) {
  return isFinalSale(p)
    ? {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      }
    : {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      };
}

/** Merchant Center return_policy_label — OWNER creates matching policies */
export const returnPolicyLabel = (p: Product) => (isFinalSale(p) ? "custom-final-sale" : "standard");

/** product_type (our own taxonomy) and google_product_category (Google's).
 *  VERIFY the Google paths against the current taxonomy file. */
const CATEGORY: Record<string, { type: string; google: string }> = {
  "layer-clock": { type: "Home Decor > Wall Clocks", google: "Home & Garden > Decor > Clocks > Wall Clocks" },
  "layered-wall-clock": { type: "Home Decor > Wall Clocks", google: "Home & Garden > Decor > Clocks > Wall Clocks" },
  "acrylic-lamp": { type: "Home Decor > Lighting > Table Lamps", google: "Home & Garden > Lighting > Lamps" },
  "custom-lightbox": { type: "Home Decor > Lighting > Light Boxes", google: "Home & Garden > Lighting" },
  "corner-frame": { type: "Home Decor > Photo Frames", google: "Home & Garden > Decor > Picture Frames" },
  "square-frame": { type: "Home Decor > Photo Frames", google: "Home & Garden > Decor > Picture Frames" },
  "strip-frame": { type: "Home Decor > Photo Frames", google: "Home & Garden > Decor > Picture Frames" },
  "pickleball-shadow-box": { type: "Home Decor > Shadow Boxes", google: "Home & Garden > Decor > Picture Frames" },
  "pink-wavy-mirror": { type: "Home Decor > Mirrors", google: "Home & Garden > Decor > Mirrors" },
  "ripple-mirror": { type: "Home Decor > Mirrors", google: "Home & Garden > Decor > Mirrors" },
  "well-look-at-you": { type: "Home Decor > Mirrors", google: "Home & Garden > Decor > Mirrors" },
  "four-letter-words": { type: "Home Decor > Wall Art > Word Art", google: "Home & Garden > Decor > Artwork" },
  "love-more": { type: "Home Decor > Wall Art > Word Art", google: "Home & Garden > Decor > Artwork" },
  "cat-got-your-heart": { type: "Home Decor > Wall Art > Metal Wall Art", google: "Home & Garden > Decor > Artwork" },
  "small-planet": { type: "Home Decor > Wall Art > Metal Wall Art", google: "Home & Garden > Decor > Artwork" },
  "old-habits": { type: "Home Decor > Wall Art > Backlit Art Prints", google: "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork" },
  "smoke-and-feathers": { type: "Home Decor > Wall Art > Backlit Art Prints", google: "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork" },
  "pomegranate-study": { type: "Home Decor > Wall Art > Backlit Art Prints", google: "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork" },
  "blood-moon": { type: "Home Decor > Wall Art > Backlit Art Prints", google: "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork" },
  "patterned-coasters": { type: "Home Decor > Table > Coasters", google: "Home & Garden > Kitchen & Dining > Barware > Coasters" },
  "x-plus-o": { type: "Home Decor > Table > Games", google: "Toys & Games > Games > Board Games" },
};

export const categoryFor = (p: Product) =>
  CATEGORY[p.slug] ?? { type: `Home Decor > ${p.subcategory}`, google: "Home & Garden > Decor" };

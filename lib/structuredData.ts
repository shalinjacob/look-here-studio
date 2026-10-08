import type { Product } from "./types";
import { isFinalSale, isPurchasable } from "@/data/products";
import { SITE_URL } from "./site";

// ---------------------------------------------------------------------------
// Values for Google Search structured data. Product pages target *product
// snippets* (ordering finishes on WhatsApp, so there's no on-site purchase).
// Return-policy values mirror /shipping-returns — keep them in step.
// ---------------------------------------------------------------------------

export const SKU = (p: Product) => `LHS-${p.objectNumber}`;

/** Everything orderable is made to order and can be ordered now, which Google
 *  reads as InStock (MadeToOrder isn't in Google's list); the page explains the
 *  10-working-day lead time. */
export const schemaAvailability = (p: Product) =>
  isPurchasable(p) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";

/** the store-wide policy, declared once on the #store node */
export const standardReturnPolicyLd = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "IN",
  returnPolicyCountry: "IN",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 7,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
  merchantReturnLink: `${SITE_URL}/shipping-returns`,
};

/** tees: free size exchange within 7 days (no refunds unless damaged/wrong) */
const teeExchangeLd = {
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "IN",
    returnPolicyCountry: "IN",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    refundType: "https://schema.org/ExchangeRefund",
    merchantReturnLink: `${SITE_URL}/shipping-returns`,
  },
};

/** custom/personalised pieces are final sale and tees are exchange-only, so
 *  their Offer overrides the store policy rather than inheriting one it doesn't allow */
export const finalSaleReturnPolicyLd = (p: Product) =>
  p.sizeChart
    ? teeExchangeLd
    : isFinalSale(p)
    ? {
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCountry: "IN",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          merchantReturnLink: `${SITE_URL}/shipping-returns`,
        },
      }
    : {};

import type { Product } from "./types";
import { isFinalSale, isPurchasable } from "@/data/products";
import { SITE_URL, WISHLIST_MODE } from "./site";
import { DEFAULT_ZONE, FREE_SHIPPING_MIN } from "@/config/shipping";

// ---------------------------------------------------------------------------
// Values for Google Search / AI-assistant structured data. Product pages carry Product
// schema with price, size, availability, shipping and returns (orders are paid online via Razorpay).
// Return-policy values mirror /shipping-returns — keep them in step.
// ---------------------------------------------------------------------------

export const SKU = (p: Product) => `LHS-${p.objectNumber}`;

/** Everything orderable is made to order and can be ordered now, which Google
 *  reads as InStock (MadeToOrder isn't in Google's list); the page explains the
 *  10-working-day lead time. */
export const schemaAvailability = (p: Product) =>
  !isPurchasable(p)
    ? "https://schema.org/OutOfStock"
    : WISHLIST_MODE
      ? "https://schema.org/PreOrder" // wishlist mode: sign up now, order when it opens
      : "https://schema.org/InStock";

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
  isFinalSale(p)
    ? {
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCountry: "IN",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          merchantReturnLink: `${SITE_URL}/shipping-returns`,
        },
      }
    : p.sizeChart
    ? teeExchangeLd
    : {};

/**
 * Shipping for every Offer: free over the minimum, otherwise the standard per-order fee.
 * (Bengaluru is cheaper and large pieces carry a handling fee: both are shown in the cart.)
 * Handling time mirrors "dispatched within 10 working days".
 */
export const shippingDetailsLd = () => {
  const destination = { "@type": "DefinedRegion", addressCountry: "IN" };
  const deliveryTime = {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "DAY" },
  };
  return [
    {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "INR" },
      shippingDestination: destination,
      deliveryTime,
      shippingConditions: {
        "@type": "ShippingConditions",
        orderValue: { "@type": "MonetaryAmount", minValue: FREE_SHIPPING_MIN, currency: "INR" },
      },
    },
    {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: DEFAULT_ZONE.fee, currency: "INR" },
      shippingDestination: destination,
      deliveryTime,
      shippingConditions: {
        "@type": "ShippingConditions",
        orderValue: { "@type": "MonetaryAmount", maxValue: FREE_SHIPPING_MIN - 1, currency: "INR" },
      },
    },
  ];
};

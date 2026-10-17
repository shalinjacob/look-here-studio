// Canonical site constants — the site is served from www (the apex redirects
// there), so every absolute URL (sitemap, canonical, OG, JSON-LD) uses this.
export const SITE_URL = "https://www.lookherestudio.in";
export const SITE_NAME = "LOOK HERE STUDIO";
/** title-case brand name for search: Google site name, titles, product brand */
export const BRAND_NAME = "Look Here Studio";
export const WHATSAPP_NUMBER = "919380670901";
export const EMAIL = "hello@lookherestudio.in";
export const INSTAGRAM_URL = "https://www.instagram.com/look.herestudio/";
/** brand Pinterest profile — empty hides the link everywhere (OWNER to supply) */
export const PINTEREST_URL = "";

/** wa.me link to the studio with a prefilled message */
export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text).replace(/'/g, "%27")}`;

/** 1200x630 JPG share card generated into /public/og */
export const ogImage = (slug: string) => ({ url: `/og/${slug}.jpg`, width: 1200, height: 630 });

/** Wishlist mode (owner, Oct 2026): every product's action is JOIN THE WISHLIST
 *  (email/WhatsApp sign-up) instead of adding to the cart. Prices stay visible.
 *  Set to false to reopen ordering. */
export const WISHLIST_MODE = false;

/** Online payment (Razorpay) in the cart drawer. FALSE = the PAY ONLINE button shows greyed out
 *  with a "coming soon" line and WhatsApp is the way to order. Flip to true to enable it.
 *  The button only renders when NEXT_PUBLIC_RAZORPAY_KEY_ID is set (see .env.example),
 *  and the cart itself is hidden while WISHLIST_MODE is on. */
export const ONLINE_PAYMENT = false;

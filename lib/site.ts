// Canonical site constants — the site is served from www (the apex redirects
// there), so every absolute URL (sitemap, canonical, OG, JSON-LD) uses this.
export const SITE_URL = "https://www.lookherestudio.in";
export const SITE_NAME = "LOOK HERE STUDIO";
/** title-case brand name for search: Google site name, titles, product brand */
export const BRAND_NAME = "Look Here Studio";
export const WHATSAPP_NUMBER = "919380670901";
export const EMAIL = "hello@lookherestudio.in";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61594915473017";
export const INSTAGRAM_URL = "https://www.instagram.com/look.herestudio/";

/** 1200x630 JPG share card generated into /public/og */
export const ogImage = (slug: string) => ({ url: `/og/${slug}.jpg`, width: 1200, height: 630 });

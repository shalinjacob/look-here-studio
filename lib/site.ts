// Canonical site constants — the site is served from www (the apex redirects
// there), so every absolute URL (sitemap, canonical, OG, JSON-LD) uses this.
export const SITE_URL = "https://www.lookherestudio.in";
export const SITE_NAME = "LOOK HERE STUDIO";
export const WHATSAPP_NUMBER = "919380670901";
export const EMAIL = "hello@lookherestudio.in";

/** 1200x630 JPG share card generated into /public/og */
export const ogImage = (slug: string) => ({ url: `/og/${slug}.jpg`, width: 1200, height: 630 });

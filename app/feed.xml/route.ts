import { products, isPurchasable } from "@/data/products";
import { SITE_URL, BRAND_NAME } from "@/lib/site";
import {
  SKU,
  HANDLING_DAYS,
  feedAvailability,
  returnPolicyLabel,
  categoryFor,
} from "@/lib/merchant";

// Google Merchant Center product feed (RSS 2.0 + g: namespace), built from the
// same catalogue + merchant helpers as the product pages and their JSON-LD, so
// price/availability always match. Served at /feed.xml (registered in Merchant
// Center) and /feeds/google-merchant.xml. Only orderable, priced items.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = products.filter(isPurchasable).map((p) => {
    const images = [...p.images, ...p.lifestyleImages].map((src) => `${SITE_URL}${src}`);
    const cat = categoryFor(p);
    const fields = [
      ["g:id", SKU(p)],
      ["g:title", p.seoTitle],
      ["g:description", `${p.description} Material: ${p.material}. Finish: ${p.finish}. Size: ${p.dimensions}.`],
      ["g:link", `${SITE_URL}/objects/${p.slug}`],
      ["g:image_link", images[0]],
      ...images.slice(1, 11).map((src) => ["g:additional_image_link", src]),
      ["g:availability", feedAvailability(p)],
      ["g:price", `${p.price!.toFixed(2)} ${p.currency}`],
      ["g:brand", BRAND_NAME],
      ["g:mpn", SKU(p)],
      ["g:identifier_exists", "no"],
      ["g:condition", "new"],
      ["g:product_type", cat.type],
      ["g:google_product_category", cat.google],
      ["g:material", p.material],
      ["g:color", p.colour],
      ["g:min_handling_time", String(HANDLING_DAYS.min)],
      ["g:max_handling_time", String(HANDLING_DAYS.max)],
      ["g:return_policy_label", returnPolicyLabel(p)],
    ];
    // Free shipping anywhere in India (see /shipping-returns)
    const shipping = `      <g:shipping><g:country>IN</g:country><g:service>Standard</g:service><g:price>0.00 INR</g:price></g:shipping>`;
    return `    <item>\n${fields.map(([k, v]) => `      <${k}>${esc(v)}</${k}>`).join("\n")}\n${shipping}\n    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${BRAND_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Objects for the home designed to be noticed. Made to order in Bengaluru.</description>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

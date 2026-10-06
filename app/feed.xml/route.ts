import { products } from "@/data/products";
import { SITE_URL, BRAND_NAME } from "@/lib/site";

// Google Merchant Center product feed (RSS 2.0 + g: namespace), built from the
// catalogue so it can never drift from the site. Merchant Center fetches it
// daily from /feed.xml. Only priced items are listed — price is required.

const AVAILABILITY: Record<string, string> = {
  available: "in_stock",
  preorder: "preorder",
  "sold-out": "out_of_stock",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = products
    .filter((p) => p.price != null && AVAILABILITY[p.status])
    .map((p) => {
      const images = [...p.images, ...p.lifestyleImages].map((src) => `${SITE_URL}${src}`);
      const fields = [
        ["g:id", `LHS-${p.objectNumber}`],
        ["g:title", p.seoTitle],
        ["g:description", `${p.description} Material: ${p.material}. Finish: ${p.finish}. Size: ${p.dimensions}.`],
        ["g:link", `${SITE_URL}/objects/${p.slug}`],
        ["g:image_link", images[0]],
        ...images.slice(1, 11).map((src) => ["g:additional_image_link", src]),
        ["g:availability", AVAILABILITY[p.status]],
        ["g:price", `${p.price!.toFixed(2)} ${p.currency}`],
        ["g:brand", BRAND_NAME],
        ["g:identifier_exists", "no"],
        ["g:condition", "new"],
        ["g:product_type", `${p.category} > ${p.subcategory}`],
        ["g:material", p.material],
        ["g:color", p.colour],
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
    <description>Objects for the home designed to be noticed. Made in small runs in Bengaluru.</description>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

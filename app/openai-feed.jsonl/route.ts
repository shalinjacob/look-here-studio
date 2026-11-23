import { products, fullName, plainSummary } from "@/data/products";
import { SITE_URL, BRAND_NAME } from "@/lib/site";

// Product feed for ChatGPT shopping (OpenAI "Product feed schema", JSONL: one record per line),
// built from the catalogue so it can't drift from the site. Submit this URL, or the file it
// returns, where OpenAI accepts product feeds. Only priced, orderable items are listed.
// Spec: https://developers.openai.com/commerce/specs/file-upload/products
// Price is the starting price; the product page holds the variant/size choices.

const AVAILABILITY: Record<string, string> = {
  available: "in_stock",
  preorder: "pre_order",
  "sold-out": "out_of_stock",
};

export const dynamic = "force-static";

export function GET() {
  const rows = products
    .filter((p) => p.price != null && AVAILABILITY[p.status])
    .map((p) => {
      const images = [...p.images, ...p.lifestyleImages].map((src) => `${SITE_URL}${src}`);
      return JSON.stringify({
        item_id: `LHS-${p.objectNumber}`,
        title: fullName(p).slice(0, 150),
        description: `${plainSummary(p)} ${p.description} Material: ${p.material}. Finish: ${p.finish}.`.slice(0, 5000),
        url: `${SITE_URL}/objects/${p.slug}`,
        brand: BRAND_NAME,
        seller_name: BRAND_NAME,
        image_url: images[0],
        price: `${p.price!.toFixed(2)} ${p.currency}`,
        availability: AVAILABILITY[p.status],
        target_countries: ["IN"],
        store_country: "IN",
      });
    });
  return new Response(rows.join("\n") + "\n", {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}

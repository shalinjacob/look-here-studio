import { products, smallRuns, isPurchasable, formatPrice, isTee } from "@/data/products";
import { publishedPosts } from "@/data/journal";
import { edits } from "@/data/edits";
import { categories } from "@/data/categories";
import { SITE_URL, BRAND_NAME, EMAIL, INSTAGRAM_URL, WISHLIST_MODE } from "@/lib/site";
import { plain } from "@/lib/richText";

// /llms.txt — a plain-language summary of the studio for AI assistants and
// answer engines (https://llmstxt.org), generated from the same data as the
// site so prices, policies and pages are always current.
export const dynamic = "force-static";

export function GET() {
  const line = (p: (typeof products)[number]) =>
    `- [${p.name}](${SITE_URL}/objects/${p.slug}): ${p.shortDescription} ${formatPrice(p.price, p.currency)}${p.options ? "" : ""}.`;
  const teeLines = products.filter((p) => isTee(p) && p.price != null).map(line).join("\n");
  const smallRunLines = smallRuns.filter((p) => p.price != null).map(line).join("\n");
  const items = products
    .filter((p) => p.price != null && !isTee(p) && p.category !== "Small Run")
    .map(
      (p) =>
        `- [${p.name}](${SITE_URL}/objects/${p.slug}): ${p.shortDescription} ${formatPrice(p.price, p.currency)}${p.variants?.length ? ` (${p.variants[0].note?.toLowerCase()})` : ""}. ${p.material}; ${p.dimensions}.${p.custom || p.personalise?.length ? " Personalised." : ""}${p.localOnly ? " Delivered in Bengaluru only for now." : ""}${isPurchasable(p) ? "" : " Currently on the wishlist: join it on the product page."}`
    )
    .join("\n");

  const posts = publishedPosts
    .map((j) => `- [${j.title}](${SITE_URL}/journal/${j.slug}): ${plain(j.answer ?? j.excerpt)}`)
    .join("\n");

  const txt = `# ${BRAND_NAME}

> ${BRAND_NAME} is a small design studio in Bengaluru, Karnataka, India, that grew out of a signage workshop. It designs and makes playful objects for the home (mirrors, wall clocks, lamps, wall art, backlit LED art prints, frames and table pieces) in acrylic, mirror, metal, wood and light. Everything is made to order in its own studio and shipped across India.

## Key facts

- Made to order in Bengaluru; dispatched within 10 working days of the order being confirmed.
- Shipping anywhere in India, charged as a flat fee per order by delivery pincode. India only. India only.
- Ordering: add objects to the cart on ${SITE_URL}, then pay online (Razorpay: UPI, cards, netbanking) or tap "Send order on WhatsApp"; the studio confirms the details either way.
- Returns: unused standard objects within 7 days of delivery, with free pickup. Personalised pieces are final sale unless damaged. Damage must be reported within 48 hours with an unboxing video and is replaced or refunded. Details: ${SITE_URL}/shipping-returns
- Personalisation: custom words, text in any language, colours and sizes on many pieces. Corporate and wedding gifting in small runs.
- Contact: WhatsApp +91 93806 70901, email ${EMAIL}. Instagram ${INSTAGRAM_URL}.

## Categories

${categories.map((c) => `- [${c.name}](${SITE_URL}/${c.slug}): ${plain(c.answer)}`).join("\n")}

## Objects

${items}

## Off The Wall: art T-shirts

The studio's artwork printed on 100% cotton (190–240 GSM) tees, oversized fit, sizes XS–XXL, each with a big print on the front. Made to order, dispatched within 10 working days. Free size exchange within 7 days (unworn, unwashed, tags on). [All tees](${SITE_URL}/off-the-wall)

${teeLines}

## Small runs and custom orders

Pieces made by hand in short batches on the studio's cutting machine: red vinyl on 4-inch mirror discs, vinyl on block-printed fabric (framed or as panels), gold elephant wall decals, a black mug and heat-pressed vinyl tees. Designs can retire without warning. [All small runs](${SITE_URL}/small-runs). The studio also takes custom orders from a single piece up, with a quantity discount from 5 pieces: [Custom orders](${SITE_URL}/custom).

${smallRunLines}

## Gifting

- [Gift guide](${SITE_URL}/gift-guide): gifts sorted by budget, person and occasion.
${edits.map((e) => `- [${e.title}](${SITE_URL}/gift-guide/edits/${e.slug}): ${e.blurb}`).join("\n")}

## Journal

${posts}

## Pages

- [All objects](${SITE_URL}/objects)
- [FAQ: ordering, delivery, returns, gifting](${SITE_URL}/faq)
- [Editions: backlit LED art prints](${SITE_URL}/collections/editions)
- [How objects are made](${SITE_URL}/process)
- [About the studio](${SITE_URL}/why-look-here)
- [Size guide](${SITE_URL}/size-guide): every wall piece drawn to scale, with centimetre and inch sizes
- [Shipping & returns](${SITE_URL}/shipping-returns)
- [Contact](${SITE_URL}/contact)
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

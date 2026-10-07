import type { Product, QA } from "@/lib/types";
import { formatPrice, isFinalSale } from "./products";
import { plain } from "@/lib/richText";

// ---------------------------------------------------------------------------
// Product-page FAQs, built only from facts already in the product data and the
// published policies (/shipping-returns), so they can never contradict the page.
// Shown on every product page and marked up as FAQPage for search/answer engines.
// ---------------------------------------------------------------------------

// "the Layer Clock" but "X + O", "Old Habits"; "are" for plural names
const THE = /(Clock|Lamp|Frame|Mirror|Box|Lightbox|Coasters|Ledge)$/;
const PLURAL = /(Coasters|Words)$/;
const nm = (p: Product) => (THE.test(p.name) ? `the ${p.name}` : p.name);
const is = (p: Product) => (PLURAL.test(p.name) ? "are" : "is");
const it = (p: Product) => (PLURAL.test(p.name) ? "they" : "it");

const isLight = (p: Product) => p.tags.includes("light") || /LED|lightbox/i.test(p.material);

export function productFaq(p: Product): QA[] {
  const faq: QA[] = [
    {
      q: `How much ${is(p)} ${nm(p)}, and how long ${PLURAL.test(p.name) ? "do" : "does"} ${it(p)} take?`,
      a: `${formatPrice(p.price, p.currency)}${p.variants?.length ? " (" + p.variants[0].note?.toLowerCase() + ")" : ""}. ${PLURAL.test(p.name) ? "They're" : "It's"} made to order in our Bengaluru studio and dispatched within 10 working days of your order being confirmed, with free shipping anywhere in India.`,
    },
    {
      q: `What ${is(p)} ${nm(p)} made of, and how big ${is(p)} ${it(p)}?`,
      a: `${p.material}. Finish: ${p.finish}. Size: ${p.dimensions}. Colour: ${p.colour}.`,
    },
    {
      q: isLight(p) ? `Does ${nm(p)} need power, and how is ${it(p)} installed?` : `How do I ${p.tags.includes("wall") ? "hang" : "set up"} ${nm(p)}?`,
      a: p.installation,
    },
    { q: `How do I look after ${nm(p)}?`, a: p.care },
  ];

  if (p.custom || p.personalise?.length || p.variants?.some((v) => v.custom)) {
    faq.push({
      q: `Can I personalise ${nm(p)}?`,
      a: p.personalise?.length
        ? `Yes. Add your ${p.personalise.map((f) => f.cartLabel.toLowerCase()).join(" and ")} on the product page before adding it to your cart, and we'll confirm the details with you on WhatsApp before we make it.`
        : p.variants?.some((v) => v.custom)
          ? `Yes. Choose "${p.variants.find((v) => v.custom)!.label}" and type your own words; we'll confirm the lettering with you on WhatsApp before we cut it.`
          : `Yes, that's the point of it. Tell us the details on WhatsApp after you send your request, and we'll confirm everything before we start making it.`,
    });
  } else if (p.variantLegend?.includes("COLOUR") && p.variants?.length) {
    faq.push({
      q: `What colours does ${nm(p)} come in?`,
      a: `${p.variants.map((v) => v.label.charAt(0) + v.label.slice(1).toLowerCase()).join(", ")}, all at the same price. Pick yours on the product page. Want a different colour? Ask us on WhatsApp.`,
    });
  } else {
    faq.push({
      q: `Can I change the colour or size of ${nm(p)}?`,
      a: `Often, yes. Colour and size tweaks are possible on made-to-order pieces. Ask us on WhatsApp before you order.`,
    });
  }

  faq.push(
    {
      q: `Can I return ${nm(p)}?`,
      a: isFinalSale(p)
        ? `Personalised pieces are final sale, unless they arrive damaged or aren't what you ordered. Report damage within 48 hours of delivery with an unboxing video and we'll replace it or refund you.`
        : `Yes. Unused pieces can be returned within 7 days of delivery in their original packaging, and we arrange the pickup for free.${p.variants?.some((v) => v.custom) ? " Versions made with your own words are final sale." : ""} If it arrives damaged, tell us within 48 hours with an unboxing video and we'll replace it or refund you.`,
    },
    {
      q: `How do I order ${nm(p)}?`,
      a: `Add it to your cart and tap "Send product request". That opens WhatsApp with your order filled in. We confirm the details, then send you payment details. Nothing is paid on the website.`,
    }
  );
  return faq;
}

/** FAQPage JSON-LD for a list of Q&As (answers as plain text) */
export const faqLd = (faq: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
  })),
});

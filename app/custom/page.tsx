import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import CustomQuote from "@/components/CustomQuote";
import { getProduct, formatPrice } from "@/data/products";
import { faqLd } from "@/data/faq";
import { TIERS, SETUP_FEE, QUOTE_FROM, type CustomItem } from "@/config/custom";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { BRAND_NAME, ogImage } from "@/lib/site";
import type { QA } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/custom" },
  title: { absolute: `Custom Orders From One Piece: Mirrors, Tees, Fabric Art | ${BRAND_NAME}` },
  description:
    "Your idea, made small. Custom vinyl mirror discs, tees, fabric art, mugs and wall decals from a single piece, with quantity discounts from 5. Made by hand in Bengaluru.",
  openGraph: { url: "/custom", images: [ogImage("custom")] },
};

// Standard starting prices come from the live product data, so this page can
// never disagree with the shop. Garment printing has no product page: ₹599 is
// the studio's proposed starting price for one motif (owner to confirm).
const price = (slug: string) => getProduct(slug)?.price ?? 0;
const GARMENT_FROM = 599;

const ITEMS: CustomItem[] = [
  { id: "disc", label: "Mirror disc (4 in)", from: price("mirror-discs"), note: "Any design in vinyl, on a 4-inch round mirror" },
  { id: "tee", label: "Oversized tee", from: price("tee-space-cat"), note: "Your art heat-pressed on an oversized cotton tee" },
  { id: "garment", label: "Print on your own garment", from: GARMENT_FROM, note: "A motif on a tee, polo, tote or hoodie you send us" },
  { id: "frame", label: "Framed fabric art (A4)", from: price("trying-to-get-my-shit-together"), note: "Your words or art over printed fabric, framed" },
  { id: "mug", label: "Mug", from: price("i-saw-that-mug"), note: "Vinyl on a ceramic mug: names, jokes, logos" },
  { id: "decal", label: "Wall decals", from: price("gold-elephant-decals"), note: "Any shape cut from vinyl, in a set" },
].filter((i) => i.from > 0);

const STEPS = [
  { n: "01", t: "Send the idea", d: "On WhatsApp: a sketch, a logo file, a photo, or just words. Tell us how many and what it's going on." },
  { n: "02", t: "Get a proof and a price", d: "We send back how it'll look and the exact price, usually within a day. Nothing is paid yet." },
  { n: "03", t: "Approve and pay", d: "Once you're happy, you pay and we cut." },
  { n: "04", t: "We make it", d: "Cut, weeded and pressed by hand. Up to 10 pieces dispatch within 10 working days; bigger runs get a date at the proof stage." },
];

const FAQ: QA[] = [
  { q: "Is there a minimum order?", a: "No. One piece is fine, and it's priced at the standard price plus a small design setup fee. From 5 pieces of the same design the setup fee goes and each piece is cheaper." },
  { q: "Can I send my own garment?", a: "Yes. A plain tee, polo, tote or hoodie works best. Message us before sending anything and we'll tell you whether the fabric takes a heat-pressed print and where to send it." },
  { q: "What files do you need?", a: "Anything is a start: a clean logo, a sketch, a photo of what you have in mind. We redraw it for cutting. Simple, bold shapes cut best; very fine detail may need simplifying, and we'll tell you at the proof." },
  { q: "Can you use a cartoon character, a brand logo or a team crest?", a: "Only if you own the rights or have permission to use it. We don't cut licensed characters or other people's brand logos without that." },
  { q: "How big can a piece be?", a: "Tell us the size you need and we'll say if it works. Mirror discs are 4 inches; tees, fabric panels and decals can go larger." },
  { q: "Can custom orders be returned?", a: "Custom and personalised pieces are final sale, unless they arrive damaged or aren't what we agreed at the proof. Details on [shipping and returns](/shipping-returns)." },
  { q: "How do I pay?", a: "After you approve the proof. We'll share the payment link or details on WhatsApp." },
  { q: "Do you make something for a team, a wedding or an event?", a: "Yes, that's what the 10 and 25-piece tiers are for: team tees, wedding mirror favours, café mugs. Tell us the date and we'll plan backwards from it." },
];

const WA = buildWhatsAppLink({ text: "Hi Look Here Studio! I'd like a custom order.\n\nWhat I want made:\nHow many:\nBy when:\n\nName:\nCity + pincode:" });

export default function CustomPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <JsonLd data={faqLd(FAQ)} />

      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>CUSTOM ORDERS</span><span>FROM ONE PIECE</span></div>
        <h1 className="pagehead__title">Your idea, made small.</h1>
        <p className="pagehead__sub">
          One piece or fifty. Send us the idea and we cut, weed and press it by hand: on mirrors,
          tees, fabric, mugs and walls. No minimum, and it gets cheaper from 5.
        </p>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)", maxWidth: 860 }}>
        <div className="article__body policy">
          <h2>What would it cost?</h2>
          <p>Pick a piece and a quantity. The price below is an estimate for one design; we confirm the exact price at the proof.</p>
        </div>
        <CustomQuote items={ITEMS} />

        <div className="article__body policy">
          <h2>Quantity pricing</h2>
          <table className="customtable">
            <thead>
              <tr><th>Pieces of one design</th><th>What you pay</th></tr>
            </thead>
            <tbody>
              {TIERS.map((t) => (
                <tr key={t.from}>
                  <td>{t.to == null ? `${t.from} or more` : t.from === t.to ? `${t.from}` : `${t.from}–${t.to}`}</td>
                  <td>
                    {t.from === 1 ? `Standard price + ${formatPrice(SETUP_FEE)} design setup` : t.to == null ? "We quote it by hand" : t.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Each design is priced on its own. Ten tees in the same design get the 20% tier; ten different designs are ten single orders. From {QUOTE_FROM} pieces we quote by hand.</p>

          <h2>What we can make</h2>
          <ul>
            {ITEMS.map((i) => (
              <li key={i.id}><strong>{i.label}</strong>, from {formatPrice(i.from)}. {i.note}.</li>
            ))}
          </ul>
        </div>

        <div className="customsample">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/small-runs/custom-garment-print.webp" alt="A gold heat-pressed vinyl motif on a customer's own polo shirt" loading="lazy" decoding="async" />
          <p>
            <strong>Your garment, our motif.</strong> Bring a tee, polo or tote you already love and we press a design onto it. Gold, white, red, black and more.
          </p>
        </div>

        <div className="article__body policy">
          <h2>How it works</h2>
          <ol className="customsteps">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="customsteps__n">{s.n}</span>
                <div>
                  <strong>{s.t}</strong>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 28 }}>
            <CTA href={WA} variant="stamp">START A CUSTOM ORDER ON WHATSAPP</CTA>
          </p>
        </div>

        <section className="article__faq">
          <h2>Quick answers</h2>
          <Faq items={FAQ} />
        </section>

        <p className="catlinks" style={{ marginTop: "clamp(40px,6vw,64px)" }}>
          Rather start from something we&apos;ve already made? <Link href="/small-runs">See the small runs →</Link>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ProductTile from "@/components/ProductTile";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import {
  products,
  getProduct,
  isPurchasable,
  formatPrice,
} from "@/data/products";

export const metadata: Metadata = {
  title: "The Gift Guide",
  description:
    "Gifts that get noticed — objects for the home, sorted by budget, by the person you're buying for, and by the occasion. From Look Here Studio, Bengaluru.",
};

// budget tiers, computed from the catalogue (buyable = available/preorder w/ price)
const buyable = products.filter(isPurchasable).sort((a, b) => a.price! - b.price!);
const tiers = [
  {
    label: "UNDER ₹5,000",
    note: "The safe-bet budget. None of it feels like a safe bet.",
    items: buyable.filter((p) => p.price! < 5000).slice(0, 4),
  },
  {
    label: "UNDER ₹10,000",
    note: "The proper-present tier. Wall plates, clocks, small lights.",
    items: buyable.filter((p) => p.price! >= 5000 && p.price! < 10000).slice(0, 4),
  },
  {
    label: "STATEMENT GIFTS",
    note: "For the person you actually like. Or owe something to.",
    items: buyable.filter((p) => p.price! >= 10000).slice(0, 4),
  },
];

// recipient archetypes
const recipients = [
  {
    tag: "THE HOST",
    line: "Feeds twelve, owns four chairs.",
    copy: "Coasters that survive a party, a brass toran for the door, and a game to settle who does the dishes.",
    slug: "kolam-coasters",
  },
  {
    tag: "THE ONE WHO HAS EVERYTHING",
    line: "So get them something slightly unnecessary.",
    copy: "A clock that's also a small painting, or noughts-and-crosses in solid brass. Useful was never the point.",
    slug: "layered-wall-clock",
  },
  {
    tag: "THE DESIGN OBSESSIVE",
    line: "Will clock the finish. Judge accordingly.",
    copy: "Etched brass wall plates and an organic-shaped mirror. Things that hold up to a long, close look.",
    slug: "a-house-full-of-light",
  },
  {
    tag: "THE NEW ADDRESS",
    line: "Housewarming, but make it noticed.",
    copy: "A wavy shelf, a mirror shaped like a good mood, a frame for the corner nobody knows what to do with.",
    slug: "pink-wavy-mirror",
  },
];

// occasions
const occasions = [
  { label: "DIWALI", href: "/collections/festival-01", note: "Festival 01" },
  { label: "HOUSEWARMING", href: "/objects", note: "For the new wall" },
  { label: "WEDDING", href: "/objects", note: "Two homes becoming one" },
  { label: "JUST BECAUSE", href: "/objects", note: "The best reason" },
];

// curated edits / hampers
const edits = [
  {
    title: "The Diwali Table",
    blurb: "Everything the coffee table needs on the night. Coasters, a plate for the wall behind it, and something to argue over.",
    slugs: ["kolam-coasters", "a-house-full-of-light", "x-plus-o"],
    href: "/collections/festival-01",
  },
  {
    title: "At the Threshold",
    blurb: "For the doorway and the wall beside it. A brass toran that catches the evening, and the quietest of the plates.",
    slugs: ["diya-toran", "jasmine-at-dusk", "motif-coasters"],
    href: "/collections/festival-01",
  },
  {
    title: "The New Home",
    blurb: "A housewarming that isn't another scented candle. A mirror, a frame, and a clock worth glancing at.",
    slugs: ["pink-wavy-mirror", "strip-frame", "layer-clock"],
    href: "/objects",
  },
];

function editTotal(slugs: string[]) {
  const total = slugs.reduce((n, s) => n + (getProduct(s)?.price ?? 0), 0);
  return formatPrice(total);
}

export default function GiftGuidePage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      {/* hero */}
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row">
          <span>THE GIFT GUIDE</span>
          <span>SANTA, BUT WITH TASTE</span>
        </div>
        <h1 className="pagehead__title">Gifts that get noticed.</h1>
        <p className="pagehead__sub">
          Good gifting is just paying attention. Here&apos;s everything we make,
          sorted by what you&apos;ll spend, who you&apos;re buying for, and why —
          so you can stop scrolling and go back to the party.
        </p>
      </div>

      {/* by budget */}
      <section className="giftsec">
        <div className="slabel"><span>01 / BY BUDGET</span></div>
        {tiers.map((t) => (
          <div className="gifttier" key={t.label}>
            <div className="gifttier__head">
              <h2 className="gifttier__label">{t.label}</h2>
              <p className="gifttier__note">{t.note}</p>
            </div>
            <div className="tilegrid">
              {t.items.map((p, i) => (
                <ProductTile key={p.slug} product={p} delay={(i % 4) * 50} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* by recipient */}
      <section className="giftsec">
        <div className="slabel"><span>02 / BY THE PERSON</span><span className="slabel__note">PERSONALITY, NOT DEMOGRAPHICS.</span></div>
        <div className="giftpeople">
          {recipients.map((r, i) => {
            const p = getProduct(r.slug);
            return (
              <Reveal as="article" key={r.tag} delay={(i % 2) * 80} className="person">
                <div className="person__text">
                  <span className="person__tag">{r.tag}</span>
                  <p className="person__line">{r.line}</p>
                  <p className="person__copy">{r.copy}</p>
                  <CTA href={p ? `/objects/${p.slug}` : "/objects"} variant="link">
                    START HERE
                  </CTA>
                </div>
                {p && (
                  <Link href={`/objects/${p.slug}`} className="person__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} />
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* by occasion */}
      <section className="giftsec">
        <div className="slabel"><span>03 / BY THE OCCASION</span></div>
        <div className="giftocc">
          {occasions.map((o) => (
            <Link href={o.href} key={o.label} className="occ">
              <span className="occ__label">{o.label}</span>
              <span className="occ__note">{o.note}</span>
              <span className="occ__arrow" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* curated edits */}
      <section className="giftsec">
        <div className="slabel"><span>04 / READY-MADE EDITS</span><span className="slabel__note">WE ALREADY DID THE THINKING.</span></div>
        <div className="giftedits">
          {edits.map((e, i) => (
            <Reveal as="article" key={e.title} delay={(i % 3) * 70} className="edit">
              <div className="edit__thumbs">
                {e.slugs.map((s) => {
                  const p = getProduct(s);
                  return p ? (
                    <Link href={`/objects/${p.slug}`} key={s} className="edit__thumb" title={p.name}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.name} />
                    </Link>
                  ) : null;
                })}
              </div>
              <div className="edit__body">
                <h3 className="edit__title">{e.title}</h3>
                <p className="edit__blurb">{e.blurb}</p>
                <div className="edit__foot">
                  <span className="edit__total">{editTotal(e.slugs)}</span>
                  <CTA href={e.href} variant="link">SHOP THE EDIT</CTA>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* services */}
      <section className="giftsec">
        <div className="slabel"><span>05 / THE GIFTING BIT</span></div>
        <div className="giftserv">
          <div className="serv">
            <h3 className="serv__title">Wrapped properly.</h3>
            <p className="serv__copy">
              We box everything in the good stuff — recycled, rigid, no bubble
              wrap graveyard. Tick &ldquo;this is a gift&rdquo; at checkout.
            </p>
          </div>
          <div className="serv">
            <h3 className="serv__title">A note, not a novel.</h3>
            <p className="serv__copy">
              Add a message at checkout and we&apos;ll write it on a card by hand.
              Keep it short; the object is doing the talking.
            </p>
          </div>
          <div className="serv">
            <h3 className="serv__title">Buying in bulk?</h3>
            <p className="serv__copy">
              Corporate and wedding gifting, made to order in small runs.{" "}
              <Link href="/contact" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                Tell us what you need
              </Link>{" "}
              — we&apos;ll figure it out.
            </p>
          </div>
        </div>
      </section>

      {/* final CTA */}
      <div className="objects__foot">
        <span className="index__foot-note" style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
          Still stuck? When in doubt, the X + O board. Nobody has one.
        </span>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <CTA href="/objects" variant="stamp">SHOP ALL OBJECTS</CTA>
          <CTA href="/collections/festival-01" variant="link">SEE FESTIVAL 01</CTA>
        </div>
      </div>
    </div>
  );
}

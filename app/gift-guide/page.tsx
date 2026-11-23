import type { Metadata } from "next";
import Link from "next/link";
import ProductTile from "@/components/ProductTile";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { altFor } from "@/data/images";
import {
  homeObjects as products,
  getProduct,
  formatPrice,
  isPurchasable,
  isComingSoon,
  OCCASIONS,
} from "@/data/products";
import { edits, editTotal, editComingSoon } from "@/data/edits";

export const metadata: Metadata = {
  alternates: { canonical: "/gift-guide" },
  title: { absolute: "Unique Home Decor Gift Ideas in India | Look Here Studio Gift Guide" },
  description:
    "Housewarming and wedding gifts that aren't another scented candle. Sorted by budget, person and occasion. Gift-wrapped.",
};

// Budget tiers lead with what can be ordered today (Small Runs); every slug is checked
// against the catalogue so a retired or unavailable piece drops out instead of going stale.
const orderable = (slugs: string[]) =>
  slugs.map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => !!p && isPurchasable(p));

const tiers = [
  {
    label: "UNDER ₹500",
    note: "Order today. The safe-bet budget, none of it a safe bet.",
    items: orderable(["gold-elephant-decals", "photo-frame-magnet", "swan-revolt-magnet", "rainbow-wall-stickers"]),
  },
  {
    label: "UNDER ₹1,500",
    note: "Order today. Prints with opinions, and a framed cat having a moment.",
    items: orderable(["outrageous-quote-poster", "chilli-jar-print", "cat-nap-print", "trying-to-get-my-shit-together"]),
  },
  {
    label: "₹1,500 AND UP",
    note: "Order today. Made in small runs, so the good ones don't hang around.",
    items: orderable(["tee-custom-pet-parent", "tee-chic-sheeps", "tee-only-fans", "lotus-wall-stickers"]),
  },
];

// the bigger design objects aren't open for orders yet: shown last, clearly marked
const comingSoonPieces = products.filter((p) => p.price != null && isComingSoon(p)).slice(0, 4);

// recipient archetypes (all orderable now)
const recipients = [
  {
    tag: "THE PET PARENT",
    line: "Their dog is their whole personality.",
    copy: "A tee with their pet's name stacked four times in gold and their pet's face over the middle. A birthday gift for a dog mum or a cat dad.",
    slug: "tee-custom-pet-parent",
  },
  {
    tag: "THE HOST",
    line: "Feeds twelve, owns four chairs.",
    copy: "Kitchen prints with opinions: a chilli jar, spilled peppercorns, a cat napping. For the person whose fridge is the gallery.",
    slug: "chilli-jar-print",
  },
  {
    tag: "THE NEW ADDRESS",
    line: "Housewarming, but make it noticed.",
    copy: "A sheet of 25 gold elephant decals to scatter across a wall. Warm with a hairdryer and peel to remove.",
    slug: "gold-elephant-decals",
  },
  {
    tag: "THE ONE WITH OPINIONS",
    line: "Will clock the details. Judge accordingly.",
    copy: "Block-printed fabric under glass with a cat on a litter tray, trying her best. The honest version of a motivational poster.",
    slug: "trying-to-get-my-shit-together",
  },
];

// occasions
const occasions = [
  { label: "ART LOVERS", href: "/collections/editions", note: "Editions, backlit" },
  ...OCCASIONS.map((o) => ({ label: o.label, href: `/objects?occasion=${o.key}`, note: o.note })),
];

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
          Good gifting is just paying attention. Everything in the first three
          budgets below can be ordered today, made to order in Bengaluru and
          dispatched within 10 working days. The bigger design pieces are coming
          soon and are marked that way.
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
        {comingSoonPieces.length > 0 && (
          <div className="gifttier">
            <div className="gifttier__head">
              <h2 className="gifttier__label">COMING SOON</h2>
              <p className="gifttier__note">Statement pieces we&apos;re still finishing. Join the wishlist on a product page to hear first.</p>
            </div>
            <div className="tilegrid">
              {comingSoonPieces.map((p, i) => (
                <ProductTile key={p.slug} product={p} delay={(i % 4) * 50} />
              ))}
            </div>
          </div>
        )}
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
                    <img src={p.images[0]} alt={altFor(p.images[0], p.name)} loading="lazy" decoding="async" />
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
        <div className="slabel"><span>04 / READY-MADE EDITS</span><span className="slabel__note">COMING SOON, WITH THE OBJECTS THEY&apos;RE MADE OF.</span></div>
        <div className="giftedits">
          {edits.map((e, i) => (
            <Reveal as="article" key={e.slug} delay={(i % 3) * 70} className="edit">
              <div className="edit__thumbs">
                {e.slugs.map((s) => {
                  const p = getProduct(s);
                  return p ? (
                    <Link href={`/objects/${p.slug}`} key={s} className="edit__thumb" title={p.name}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={altFor(p.images[0], p.name)} loading="lazy" decoding="async" />
                    </Link>
                  ) : null;
                })}
              </div>
              <div className="edit__body">
                <h3 className="edit__title">{e.title}</h3>
                <p className="edit__blurb">{e.blurb}</p>
                <div className="edit__foot">
                  <span className="edit__total">{editComingSoon(e) ? "COMING SOON" : formatPrice(editTotal(e))}</span>
                  <CTA href={`/gift-guide/edits/${e.slug}`} variant="link">SHOP THE EDIT</CTA>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* final CTA */}
      <div className="objects__foot">
        <span className="index__foot-note" style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
          Still stuck? When in doubt, the X + O board. Nobody has one.
        </span>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <CTA href="/objects" variant="stamp">SHOP ALL OBJECTS</CTA>
          <CTA href="/collections/editions" variant="link">SEE EDITIONS</CTA>
        </div>
      </div>
    </div>
  );
}

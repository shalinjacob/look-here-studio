import Link from "next/link";
import CTA from "../CTA";
import Reveal from "../Reveal";
import {
  getProduct,
  formatPrice,
  isPurchasable,
  STATUS_LABEL,
} from "@/data/products";

// 07 / NEW IN — a two-up feature for the newest objects (made to order).
const SLUGS = ["cat-got-your-heart", "pickleball-shadow-box"];

export default function NewObjects() {
  const items = SLUGS.map(getProduct).filter(Boolean) as NonNullable<
    ReturnType<typeof getProduct>
  >[];
  if (items.length === 0) return null;

  return (
    <section className="section newin" id="new-in" aria-label="New in">
      <div className="wrap">
        <div className="slabel">
          <span>07 / NEW IN</span>
          <span className="slabel__note">MADE TO ORDER.<br />ONE AT A TIME.</span>
        </div>
        <h2 className="newin__title">Just off the table.</h2>
        <p className="newin__sub">
          Two new ones — a cat that wears its heart on the wall, and your paddle,
          framed like it finally won something.
        </p>

        <div className="newin__grid">
          {items.map((p, i) => (
            <Reveal as="article" key={p.slug} delay={(i % 2) * 90} className="feature">
              <Link href={`/objects/${p.slug}`} className="feature__link">
                <div className="feature__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.lifestyleImages[0] ?? p.images[0]}
                    alt={p.name}
                  />
                  <span className="feature__view">VIEW OBJECT →</span>
                </div>
                <div className="feature__meta">
                  <span className="feature__num">OBJECT {p.objectNumber}</span>
                  <h3 className="feature__name">{p.name}</h3>
                  <p className="feature__cat">{p.category}</p>
                  <p className="feature__line">{p.shortDescription}</p>
                  <div className="feature__foot">
                    <span className="feature__price">
                      {isPurchasable(p) ? formatPrice(p.price, p.currency) : STATUS_LABEL[p.status]}
                    </span>
                    <span className="feature__status">{STATUS_LABEL[p.status]}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: "clamp(28px,4vw,48px)" }}>
          <CTA href="/objects" variant="link">SEE ALL OBJECTS</CTA>
        </div>
      </div>
    </section>
  );
}

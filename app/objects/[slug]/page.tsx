import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import SpecTable from "@/components/SpecTable";
import AddToCart from "@/components/AddToCart";
import VideoPlayer from "@/components/VideoPlayer";
import ProductTile from "@/components/ProductTile";
import Newsletter from "@/components/Newsletter";
import {
  products,
  getProduct,
  getAdjacent,
  getRelated,
  STATUS_LABEL,
  formatPrice,
  isPurchasable,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Object not found" };
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    openGraph: { title: `${p.name} — LOOK HERE STUDIO`, description: p.shortDescription, images: p.images },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const { prev, next } = getAdjacent(p.slug);
  const related = getRelated(p.slug, 3);
  const buyable = isPurchasable(p);
  const gallery = [...p.images, ...p.lifestyleImages];

  const specs = [
    { label: "TYPE", value: p.category },
    { label: "MATERIAL", value: p.material },
    { label: "FINISH", value: p.finish },
    { label: "SIZE", value: p.dimensions },
    { label: "COLOUR", value: p.colour },
    { label: "MADE IN", value: "Bengaluru, India" },
    { label: "LEAD TIME", value: p.leadTime },
  ];

  return (
    <article className="pdp wrap">
      <div className="pdp__top">
        <Link href="/objects" className="pdp__back">← OBJECTS</Link>
        <span className="pdp__marker">OBJECT {p.objectNumber}</span>
      </div>

      <div className="pdp__spread">
        {/* images */}
        <div>
          <ProductGallery
            images={gallery}
            alt={p.name}
            fit={p.imageFit ?? "contain"}
            fallbackNumber={p.objectNumber}
          />
          {p.video && (
            <div className="pdp__video">
              <VideoPlayer src={p.video} poster={p.images[0]} label="IN MOTION" />
            </div>
          )}
        </div>

        {/* info / buy */}
        <aside className="pdp__info">
          <p className="pdp__num">OBJECT {p.objectNumber}</p>
          <h1 className="pdp__name">{p.name}</h1>
          <p className="pdp__cat">{p.category}</p>

          <div className="pdp__statusrow">
            <span className={`pdp__price${p.price == null ? " pdp__price--soon" : ""}`}>
              {formatPrice(p.price, p.currency)}
            </span>
            <span className="pdp__status">{STATUS_LABEL[p.status]}</span>
          </div>

          <p className="pdp__lead">{p.shortDescription}</p>

          <div className="pdp__actions">
            <AddToCart product={p} />
            <p className="pdp__leadtime">{p.leadTime}</p>
          </div>
        </aside>
      </div>

      {/* THE OBJECT */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">THE OBJECT</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        <p className="pdp__prose">{p.description}</p>
      </section>

      {/* SPECIFICATIONS */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">SPECIFICATIONS</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        <SpecTable rows={specs} />
      </section>

      {/* HOW IT'S MADE */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">HOW IT&apos;S MADE</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        <ol className="pdp__process">
          {p.process.map((s) => (
            <li className="pdp__step" key={s.step}>
              <span className="pdp__step-n">{s.step}</span>
              <span className="pdp__step-label">{s.label}</span>
              {s.note && <span className="pdp__step-note">{s.note}</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* AT HOME */}
      {p.lifestyleImages[0] && (
        <section className="pdp__section">
          <div className="pdp__section-head">
            <span className="pdp__section-tag">AT HOME</span>
            <span className="pdp__section-rule" aria-hidden />
          </div>
          <div className="pdp__athome">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.lifestyleImages[0]} alt={`${p.name} in a room`} />
          </div>
        </section>
      )}

      {/* GOOD TO KNOW */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">GOOD TO KNOW</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        <div className="pdp__goodtoknow">
          <div><p className="gtk__label">Care</p><p className="gtk__value">{p.care}</p></div>
          <div><p className="gtk__label">Installation</p><p className="gtk__value">{p.installation}</p></div>
          <div><p className="gtk__label">Shipping</p><p className="gtk__value">Ships across India. {p.leadTime}.</p></div>
          <div><p className="gtk__label">Customisation</p><p className="gtk__value">Colour and size tweaks possible on made-to-order pieces — just ask.</p></div>
        </div>
      </section>

      {/* WAITLIST (only when not purchasable) */}
      {!buyable && (
        <section className="pdp__section pdp__waitlist" id="waitlist">
          <div className="pdp__section-head">
            <span className="pdp__section-tag">WAITLIST</span>
            <span className="pdp__section-rule" aria-hidden />
          </div>
          <p className="pdp__waitlist-line">
            {p.status === "sold-out"
              ? "This one sold out. Get told when the next run lands."
              : "Not ready yet. Want to know the moment it is?"}
          </p>
          <Newsletter id={`wl-${p.slug}`} compact cta="TELL ME FIRST" />
        </section>
      )}

      {/* YOU MAY ALSO LIKE */}
      {related.length > 0 && (
        <section className="pdp__section related">
          <div className="pdp__section-head">
            <span className="pdp__section-tag">YOU MAY ALSO LIKE</span>
            <span className="pdp__section-rule" aria-hidden />
          </div>
          <div className="tilegrid tilegrid--preview">
            {related.map((r) => (
              <ProductTile key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}

      {/* prev / next */}
      <nav className="pdp__nav" aria-label="Objects">
        {prev ? (
          <Link href={`/objects/${prev.slug}`} className="pdp__nav-link">
            <span className="pdp__nav-dir">← PREV · OBJECT {prev.objectNumber}</span>
            <span className="pdp__nav-name">{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/objects/${next.slug}`} className="pdp__nav-link pdp__nav-next">
            <span className="pdp__nav-dir">NEXT · OBJECT {next.objectNumber} →</span>
            <span className="pdp__nav-name">{next.name}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}

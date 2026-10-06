import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import SpecTable from "@/components/SpecTable";
import AddToCart from "@/components/AddToCart";
import VideoPlayer from "@/components/VideoPlayer";
import ProductTile from "@/components/ProductTile";
import Newsletter from "@/components/Newsletter";
import JsonLd from "@/components/JsonLd";
import TrackView from "@/components/TrackView";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WaLink from "@/components/WaLink";
import CampaignCard from "@/components/campaign/CampaignCard";
import { SITE_URL, BRAND_NAME, ogImage } from "@/lib/site";
import { altFor, isRender } from "@/data/images";
import { gaItem } from "@/lib/analytics";
import { SKU, schemaAvailability, shippingDetailsLd, returnPolicyLd } from "@/lib/merchant";
import {
  products,
  getProduct,
  getAdjacent,
  getRelated,
  badge,
  metaDescription,
  isFinalSale,
  UNAVAILABLE_LINE,
  formatPrice,
  isPurchasable,
  hasPriceRange,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Object not found" };
  return {
    title: { absolute: `${p.seoTitle} | ${BRAND_NAME}` },
    description: metaDescription(p),
    alternates: { canonical: `/objects/${p.slug}` },
    openGraph: {
      title: `${p.name} | ${BRAND_NAME}`,
      description: p.shortDescription,
      url: `/objects/${p.slug}`,
      images: [ogImage(p.slug)],
    },
    twitter: { card: "summary_large_image", images: [`/og/${p.slug}.jpg`] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const { prev, next } = getAdjacent(p.slug);
  const related = getRelated(p.slug, 3);
  const buyable = isPurchasable(p);
  const gallery = [...p.images, ...p.lifestyleImages];
  const returnsLine = isFinalSale(p)
    ? "Personalised, so it\u2019s final sale unless it arrives damaged."
    : p.variants?.some((v) => v.custom)
      ? "7-day returns on unused pieces, with free pickup (your-own-words versions are final sale)."
      : "7-day returns on unused pieces, with free pickup.";

  // Structured data for Google merchant listings (server-rendered). Shares its
  // availability/shipping/returns values with the feed via lib/merchant.
  // No offer is emitted while a price isn't set.
  const url = `${SITE_URL}/objects/${p.slug}`;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: gallery.map((src) => `${SITE_URL}${src}`),
    sku: SKU(p),
    mpn: SKU(p),
    category: p.category,
    material: p.material,
    color: p.colour,
    brand: { "@type": "Brand", name: BRAND_NAME },
    url,
    ...(p.price != null
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: p.price,
            priceCurrency: p.currency,
            availability: schemaAvailability(p),
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${SITE_URL}/#store` },
            shippingDetails: shippingDetailsLd,
            hasMerchantReturnPolicy: returnPolicyLd(p),
          },
        }
      : {}),
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Objects", item: `${SITE_URL}/objects` },
      { "@type": "ListItem", position: 2, name: p.name, item: url },
    ],
  };

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
      <JsonLd data={productLd} />
      <TrackView
        event="view_item"
        params={{ currency: p.currency, value: p.price ?? undefined, items: [gaItem(p)] }}
      />
      <JsonLd data={crumbsLd} />
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
              {hasPriceRange(p) ? "FROM " : ""}
              {formatPrice(p.price, p.currency)}
            </span>
            <span className="pdp__status">{badge(p)}</span>
          </div>

          <p className="pdp__lead">{p.shortDescription}</p>

          <div className="pdp__actions">
            <AddToCart product={p} />
            {buyable && (
              <>
                <p className="pdp__leadtime">{p.leadTime}</p>
                <p className="pdp__ordernote">
                  No payment yet: your cart sends us a WhatsApp message, we confirm the
                  details in minutes, then send a secure payment link.
                </p>
              </>
            )}
          </div>
          {buyable && <CampaignCard />}
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

      {/* AT HOME — real in-room photos, or an invitation to send one */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">AT HOME</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        {p.lifestyleImages[0] ? (
          <div className="pdp__athome">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.lifestyleImages[0]} alt={altFor(p.lifestyleImages[0], `${p.name} in a room`)} loading="lazy" decoding="async" />
            {isRender(p.lifestyleImages[0]) && <span className="render-tag">Visualisation</span>}
          </div>
        ) : (
          <div className="athome-empty">
            <p className="athome-empty__body">
              Coming soon: real walls, real rooms. Got one on yours? Send us a photo and we
              might feature it (with your permission).
            </p>
            <WaLink
              text={`Hi! Here's my ${p.name} at home:`}
              location="at-home"
              className="cta cta--link"
            >
              <span className="cta__label">Share your wall on WhatsApp</span>
              <span className="cta__arrow">→</span>
            </WaLink>
          </div>
        )}
      </section>

      {/* GOOD TO KNOW */}
      <section className="pdp__section">
        <div className="pdp__section-head">
          <span className="pdp__section-tag">GOOD TO KNOW</span>
          <span className="pdp__section-rule" aria-hidden />
        </div>
        <div className="pdp__goodtoknow">
          <div><p className="gtk__label">Care</p><p className="gtk__value">{p.care}</p></div>
          <div><p className="gtk__label">Installation</p><p className="gtk__value">{p.installation}</p></div>
          <div><p className="gtk__label">Shipping &amp; returns</p><p className="gtk__value">Free shipping across India. {p.leadTime}. {returnsLine} <Link href="/shipping-returns">Shipping &amp; returns →</Link></p></div>
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
            {p.price == null ? "Not ready yet. Want to know the moment it is?" : UNAVAILABLE_LINE}
          </p>
          <Newsletter id={`wl-${p.slug}`} compact cta="TELL ME FIRST" productSlug={p.slug} source="product" />
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
      <FloatingWhatsApp name={p.name} url={url} />
    </article>
  );
}

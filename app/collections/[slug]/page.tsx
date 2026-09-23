import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductTile from "@/components/ProductTile";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { collections, getCollection } from "@/data/collections";
import { getProduct } from "@/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCollection(params.slug);
  if (!c) return { title: "Collection not found" };
  return { title: c.seoTitle, description: c.seoDescription };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = getCollection(params.slug);
  if (!c) notFound();
  const items = c.productSlugs.map(getProduct).filter(Boolean) as NonNullable<
    ReturnType<typeof getProduct>
  >[];

  return (
    <article>
      {/* hero */}
      <section className="drop" aria-label={c.name}>
        <div className="drop__grid">
          <div className="drop__text">
            <span className="drop__index">{c.index} / {c.name}</span>
            <h1 className="drop__title">{c.title}</h1>
            {c.intro.map((para) => (
              <p className="drop__intro" key={para}>{para}</p>
            ))}
            <p className="drop__tags">DRAWN FROM — {c.drawnFrom.join(" / ")}</p>
            <div className="drop__cta">
              <CTA href="#objects" variant="link">SHOP THE DROP</CTA>
            </div>
          </div>
          <div className="drop__hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.heroImage} alt={`${c.name} hero`} />
          </div>
        </div>
        <div className="drop__strip">
          {c.gallery.map((src, i) => (
            <figure key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${c.name} detail`} />
              {i === 1 && <figcaption>{c.note.toUpperCase()}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      {/* note + products */}
      <section className="section wrap" id="objects">
        <div className="slabel"><span>{c.name} / OBJECTS</span><span className="slabel__note">{c.note}</span></div>
        <Reveal as="h2" className="objects__title" style={{ marginBlock: "clamp(24px,4vw,48px)" }}>
          {items.length} object{items.length === 1 ? "" : "s"} in the collection.
        </Reveal>
        <div className="tilegrid tilegrid--preview">
          {items.map((p, i) => (
            <ProductTile key={p.slug} product={p} delay={(i % 3) * 70} />
          ))}
        </div>
        <div className="objects__foot">
          <CTA href="/objects" variant="link">SEE ALL OBJECTS</CTA>
        </div>
      </section>
    </article>
  );
}

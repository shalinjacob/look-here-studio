import Link from "next/link";
import { categories, categoryPath, getCategory, type Category } from "@/data/categories";
import { getProduct } from "@/data/products";
import { getPost } from "@/data/journal";
import { faqLd } from "@/data/faq";
import { SITE_URL, BRAND_NAME } from "@/lib/site";
import { Rich, plain } from "@/lib/richText";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import ProductTile from "@/components/ProductTile";
import type { Product, JournalPost } from "@/lib/types";

export default function CategoryView({ c }: { c: Category }) {
  const items = c.products.map(getProduct).filter(Boolean) as Product[];
  const posts = c.posts.map(getPost).filter(Boolean) as JournalPost[];
  const path = categoryPath(c);
  const url = `${SITE_URL}${path}`;
  const parent = c.parent ? getCategory(c.parent) : undefined;

  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${c.name} | ${BRAND_NAME}`,
    description: plain(c.answer),
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/objects/${p.slug}`, name: p.name })),
    },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Objects", item: `${SITE_URL}/objects` },
      ...(parent ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}${categoryPath(parent)}` }] : []),
      { "@type": "ListItem", position: parent ? 3 : 2, name: c.name, item: url },
    ],
  };

  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <JsonLd data={listLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd(c.faq)} />

      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row">
          <Link href={parent ? categoryPath(parent) : "/objects"} className="pdp__back">{parent ? `← ${parent.name.toUpperCase()}` : "← ALL OBJECTS"}</Link>
          <span>{items.length} OBJECT{items.length === 1 ? "" : "S"}</span>
        </div>
        <h1 className="pagehead__title">{c.name}</h1>
      </div>

      <div className="article" style={{ margin: "clamp(24px,4vw,40px) 0 0", maxWidth: 860 }}>
        <p className="article__answer" style={{ marginTop: 0 }}>
          <Rich text={c.answer} />
        </p>
      </div>

      <div className="tilegrid" style={{ marginTop: "clamp(32px,5vw,56px)" }}>
        {items.map((p, i) => (
          <ProductTile key={p.slug} product={p} delay={(i % 4) * 50} />
        ))}
      </div>

      <div className="article" style={{ margin: "clamp(40px,6vw,72px) 0 0", maxWidth: 760 }}>
        <div className="article__body">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paras.map((para, i) => (
                <p key={i}><Rich text={para} /></p>
              ))}
            </section>
          ))}
        </div>

        <section className="article__faq">
          <h2>Quick answers</h2>
          <Faq items={c.faq} />
        </section>

        {posts.length > 0 && (
          <section className="article__faq">
            <h2>Read more</h2>
            <ul className="readmore">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/journal/${p.slug}`}>{p.title} →</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="catlinks" style={{ marginTop: "clamp(40px,6vw,64px)" }}>
          More to browse:{" "}
          {categories
            .filter((x) => x.slug !== c.slug && !x.parent)
            .map((x, i) => (
              <span key={x.slug}>
                {i > 0 && " · "}
                <Link href={categoryPath(x)}>{x.name}</Link>
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}

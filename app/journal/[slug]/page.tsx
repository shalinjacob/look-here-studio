import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedPosts as journal, getPost, readingTime } from "@/data/journal";
import { getProduct } from "@/data/products";
import { faqLd } from "@/data/faq";
import { ogImage, SITE_URL, BRAND_NAME } from "@/lib/site";
import { Rich, plain } from "@/lib/richText";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import ProductTile from "@/components/ProductTile";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Note not found" };
  return {
    title: post.title,
    description: post.description ?? post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description ?? post.excerpt,
      url: `/journal/${post.slug}`,
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      images: [ogImage("home")],
    },
  };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/journal/${post.slug}`;
  const related = (post.products ?? []).map(getProduct).filter(Boolean) as Product[];
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", "@id": `${SITE_URL}/#store`, name: BRAND_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#store` },
    mainEntityOfPage: url,
    image: related[0] ? `${SITE_URL}${related[0].images[0]}` : `${SITE_URL}/og/home.jpg`,
    ...(post.answer ? { abstract: plain(post.answer) } : {}),
    ...(related.length ? { mentions: related.map((p) => ({ "@type": "Product", name: p.name, url: `${SITE_URL}/objects/${p.slug}` })) } : {}),
  };

  return (
    <div className="section wrap">
      <JsonLd data={articleLd} />
      {post.faq?.length ? <JsonLd data={faqLd(post.faq)} /> : null}
      <div className="pdp__top" style={{ marginBottom: 0 }}>
        <Link href="/journal" className="pdp__back">← JOURNAL</Link>
        <span className="pdp__marker">NOTE {post.index}</span>
      </div>

      <article className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <p className="article__meta">
          {post.category} · {fmt(post.date)}
          {post.updated && post.updated !== post.date ? ` · Updated ${fmt(post.updated)}` : ""} · {readingTime(post)}
        </p>
        <h1 className="article__title">{post.title}</h1>

        {post.answer && (
          <p className="article__answer">
            <Rich text={post.answer} />
          </p>
        )}

        <div className="article__body">
          {post.body.map((para, i) => (
            <p key={i}><Rich text={para} /></p>
          ))}
          {post.sections?.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paras.map((para, i) => (
                <p key={i}><Rich text={para} /></p>
              ))}
            </section>
          ))}
        </div>

        {post.faq?.length ? (
          <section className="article__faq">
            <h2>Quick answers</h2>
            <Faq items={post.faq} />
          </section>
        ) : null}

        {related.length > 0 && (
          <section className="article__products">
            <h2>Objects in this note</h2>
            <div className="tilegrid tilegrid--preview">
              {related.map((p) => (
                <ProductTile key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        <div style={{ marginTop: "clamp(40px,6vw,72px)", paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <Link href="/objects" className="cta cta--link">
            <span className="cta__label">SEE THE OBJECTS</span>
            <span className="cta__arrow">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal, getPost } from "@/data/journal";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Note not found" };
  return { title: post.title, description: post.excerpt };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="section wrap">
      <div className="pdp__top" style={{ marginBottom: 0 }}>
        <Link href="/journal" className="pdp__back">← JOURNAL</Link>
        <span className="pdp__marker">NOTE {post.index}</span>
      </div>

      <article className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <p className="article__meta">{post.category} · {fmt(post.date)} · {post.readingTime}</p>
        <h1 className="article__title">{post.title}</h1>
        <div className="article__body">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
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

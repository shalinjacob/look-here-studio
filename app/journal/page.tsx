import type { Metadata } from "next";
import Link from "next/link";
import { publishedPosts, readingTime } from "@/data/journal";
import { getProduct } from "@/data/products";
import type { JournalPost } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: { absolute: "Journal: Design, Materials & Gifting Notes | Look Here Studio" },
  description: "Notes from a Bengaluru design studio on acrylic, metal, light, gifting and the occasional small rant.",
};

// newest first; posts sharing a date fall back to their index number
const journal = [...publishedPosts].sort((a, b) => b.date.localeCompare(a.date) || b.index.localeCompare(a.index));

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** a post's tile image: the first image of the first product it features */
function cover(post: JournalPost) {
  for (const slug of post.products ?? []) {
    const p = getProduct(slug);
    if (p?.images?.[0]) return { src: p.images[0], alt: p.name, fit: p.imageFit ?? "contain" };
  }
  return null;
}

export default function JournalPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>JOURNAL</span><span>{journal.length} NOTES</span></div>
        <h1 className="pagehead__title">Notes.</h1>
        <p className="pagehead__sub">On objects, materials, mistakes and the occasional small rant.</p>
      </div>

      <div className="journal__grid">
        {journal.map((post) => {
          const img = cover(post);
          return (
            <Link className="jtile" href={`/journal/${post.slug}`} key={post.slug}>
              <div className={`jtile__frame${img?.fit === "cover" ? " jtile__frame--cover" : ""}`}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                ) : (
                  <span className="jtile__ph">{post.index}</span>
                )}
              </div>
              <div className="jtile__meta"><span>{post.index}</span><span>{post.category} · {fmt(post.date)} · {readingTime(post)}</span></div>
              <h2 className="journal__title">{post.title}</h2>
              <p className="journal__excerpt">{post.excerpt}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

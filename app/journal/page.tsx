import type { Metadata } from "next";
import Link from "next/link";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from Look Here Studio — on objects, materials, mistakes and the occasional small rant.",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function JournalPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>JOURNAL</span><span>{journal.length} NOTES</span></div>
        <h1 className="pagehead__title">Notes.</h1>
        <p className="pagehead__sub">On objects, materials, mistakes and the occasional small rant.</p>
      </div>

      <div className="journal__list">
        {journal.map((post) => (
          <Link className="journal__item" href={`/journal/${post.slug}`} key={post.slug}>
            <span className="journal__idx">{post.index}</span>
            <div>
              <h2 className="journal__title">{post.title}</h2>
              <p className="journal__excerpt">{post.excerpt}</p>
            </div>
            <span className="journal__meta">{post.category}<br />{fmt(post.date)}<br />{post.readingTime}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

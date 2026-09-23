import CTA from "../CTA";
import { getCollection } from "@/data/collections";

// 06 / CURRENT DROP — the featured collection (Editions: art in LED slim frames).
export default function CurrentDrop() {
  const c = getCollection("editions");
  if (!c) return null;

  return (
    <section className="drop" id="current-drop" aria-label={c.name}>
      <div className="drop__grid">
        <div className="drop__text">
          <span className="drop__index">03 / {c.name}</span>
          <h2 className="drop__title">{c.title}</h2>
          <p className="drop__intro">{c.intro[0]}</p>
          <p className="drop__tags">DRAWN FROM — {c.drawnFrom.join(" / ")}</p>
          <div className="drop__cta">
            <CTA href={`/collections/${c.slug}`} variant="link">EXPLORE EDITIONS</CTA>
          </div>
        </div>
        <div className="drop__hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.heroImage} alt={`${c.name} — ${c.title}`} />
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
  );
}

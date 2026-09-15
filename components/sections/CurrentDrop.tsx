import CTA from "../CTA";
import { getCollection } from "@/data/collections";

// 06 / CURRENT DROP — Festival 01. Warmer photography, same monochrome system.
export default function CurrentDrop() {
  const c = getCollection("festival-01");
  if (!c) return null;

  return (
    <section className="drop" id="current-drop" aria-label="Current drop">
      <div className="drop__grid">
        <div className="drop__text">
          <span className="drop__index">06 / CURRENT DROP</span>
          <h2 className="drop__title">
            Made for Diwali.
            <br />
            Made to stay.
          </h2>
          <p className="drop__intro">{c.intro[0]}</p>
          <p className="drop__tags">WALL / TABLE / THRESHOLD</p>
          <div className="drop__cta">
            <CTA href={`/collections/${c.slug}`} variant="link">EXPLORE FESTIVAL 01</CTA>
          </div>
        </div>
        <div className="drop__hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.heroImage} alt="Kolam Light glowing on a wall for Diwali" />
        </div>
      </div>
      <div className="drop__strip">
        {c.gallery.map((src, i) => (
          <figure key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Festival 01 detail" />
            {i === 1 && <figcaption>DETAILS THAT STAY.</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

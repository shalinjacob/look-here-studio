import Link from "next/link";
import CTA from "../CTA";
import Reveal from "../Reveal";
import { getProduct } from "@/data/products";

// 05 / AT HOME — lifestyle-in-space. Each image links to the featured product.
const SLUGS = ["sculptural-lamp", "kiss-wall-piece", "layered-wall-clock"];

export default function AtHome() {
  const items = SLUGS.map(getProduct).filter(Boolean) as NonNullable<
    ReturnType<typeof getProduct>
  >[];

  return (
    <section className="section" id="at-home" aria-label="At home">
      <div className="wrap">
        <div className="slabel">
          <span>05 / AT HOME</span>
          <span className="slabel__note">SAME SPACES.<br />A LITTLE<br />MORE YOU.</span>
        </div>
        <h2 className="athome__title">A few ways these objects live in a room.</h2>
        <p className="athome__sub">Colourful objects for real spaces.</p>

        <div className="athome__grid">
          {items.map((p, i) => (
            <Reveal as="div" key={p.slug} delay={(i % 3) * 80}>
              <Link href={`/objects/${p.slug}`} className="athome__item">
                <div className="athome__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.lifestyleImages[0] ?? p.images[0]}
                    alt={`${p.name} in a room`}
                  />
                  <span className="athome__view">VIEW OBJECT →</span>
                </div>
                <div className="athome__meta">
                  <p className="athome__name">{p.name}</p>
                  <p className="athome__mat">{p.material.split(",")[0]}</p>
                  <span className="athome__rule" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: "clamp(32px,4vw,56px)" }}>
          <CTA href="/objects" variant="link">SEE ALL OBJECTS</CTA>
        </div>
      </div>
    </section>
  );
}

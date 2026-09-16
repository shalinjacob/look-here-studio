import CTA from "../CTA";

// 01 / HERO — big editorial statement with product images embedded in the type.
// The single logo lives in the nav (animated, top-centre); the hero leads with
// the headline, as in the reference.

export default function Hero() {
  return (
    <section className="hero" aria-label="Look Here Studio">
      <div className="wrap">
        <h1 className="hero__head">
          OBJECTS FOR{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--tall" src="/objects/hero-mirror.png" alt="a wavy pink mirror" />{" "}
          WALLS, TABLES,{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--wide" src="/objects/hero-coasters.png" alt="patterned coasters" />{" "}
          SHELVES AND EVERYWHERE{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline" src="/objects/hero-lamp.png" alt="a sculptural acrylic lamp" />{" "}
          THAT COULD USE A LITTLE MORE YOU.
        </h1>

        <div className="hero__foot">
          <div className="hero__ctas">
            <CTA href="/objects" variant="stamp">SHOP OBJECTS</CTA>
            <CTA href="/collections/festival-01" variant="link">SEE THE CURRENT DROP</CTA>
          </div>
          <div className="hero__aside">
            COLOUR
            <br />
            SHAPES
            <br />
            GOOD SPACES.
          </div>
        </div>
      </div>
    </section>
  );
}

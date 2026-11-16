import CTA from "../CTA";

// 01 / HERO — big editorial statement with product images embedded in the type.
// Leads with Small Runs (the range that is available now).
// The single logo lives in the nav (animated, top-centre); the hero leads with
// the headline, as in the reference.

export default function Hero() {
  return (
    <section className="hero" aria-label="Look Here Studio">
      <div className="wrap">
        <h1 className="hero__head">
          SMALL RUNS FOR{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--magnet" src="/small-runs/hero-magnet-insurance.webp" width={700} height={469} fetchPriority="high" alt="You Have A Life, But No Insurance fridge magnet: a pop-art salesman pointing at you" />{" "}
          FRIDGES, WALLS,{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--magnet" src="/small-runs/hero-magnet-swan.webp" width={700} height={473} fetchPriority="high" alt="Long Live The Swan Revolt fridge magnet: an outraged swan with its wings spread" />{" "}
          TEES AND DESKS{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--strip" src="/small-runs/hero-magnet-roadtrip.webp" width={700} height={241} fetchPriority="high" alt="Starry Road to Manichithrathzhu fridge magnet: three travellers in a red convertible under a swirling starry sky" />{" "}
          THAT COULD USE A LITTLE MORE YOU.
        </h1>

        <div className="hero__foot">
          <div className="hero__ctas">
            <CTA href="/small-runs" variant="stamp">SHOP SMALL RUNS</CTA>
            <CTA href="/custom" variant="link">ORDER A CUSTOM ONE</CTA>
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

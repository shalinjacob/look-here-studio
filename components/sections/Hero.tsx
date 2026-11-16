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
          SMALL RUNS{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--disc" src="/small-runs/hero-mirror-disc.webp" width={600} height={600} fetchPriority="high" alt="Light-cast mirror disc with a red vinyl flower design" />{" "}
          FOR FRIDGES,{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--magnet" src="/small-runs/hero-magnet-insurance.webp" width={700} height={469} fetchPriority="high" alt="You Have A Life, But No Insurance fridge magnet: a pop-art salesman pointing at you" />{" "}
          WALLS,{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--frame" src="/small-runs/hero-fabric-frame.webp" width={863} height={1057} fetchPriority="high" alt="Trying To Get My Shit Together: white vinyl cat on a block-printed fabric, framed" />{" "}
          TEES{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__inline hero__inline--tee" src="/small-runs/hero-tee.webp" width={963} height={882} fetchPriority="high" alt="Space Cat tee: a black oversized tee with a white astronaut cat print" />{" "}
          AND DESKS THAT COULD USE A LITTLE MORE YOU.
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

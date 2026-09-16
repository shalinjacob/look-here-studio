import CTA from "../CTA";
import Reveal from "../Reveal";

// 02 / WHY LOOK HERE
export default function WhyLookHere() {
  return (
    <section className="section" id="why" aria-label="Why Look Here">
      <div className="wrap">
        <div className="slabel">
          <span>02 / WHY LOOK HERE</span>
          <span className="slabel__note">A SMALL STUDIO<br />FOR A BRIGHTER HOME.</span>
        </div>

        <div className="why__grid">
          <div className="why__headwrap">
            <Reveal as="h2" className="why__head">
              Objects for the home, designed to be noticed.
            </Reveal>
            <div className="why__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/objects/wavy-mirror.jpg" alt="Pink wavy mirror leaning against a wall" />
              <span className="why__note">Same spaces.<br />A little<br />more you.</span>
            </div>
          </div>

          <Reveal className="why__body">
            <p>
              Look Here Studio creates playful objects for the home — mirrors,
              lights, clocks, wall pieces and small things that bring more
              personality into everyday spaces.
            </p>
            <p>
              We work with colour, reflection, type, shape and light, using
              materials like acrylic, metal, mirror and print to make pieces
              that feel useful, unexpected and a little unnecessary.
            </p>
            <p>Which is sort of the point.</p>
            <div className="why__cta">
              <CTA href="/why-look-here" variant="link">OUR STORY</CTA>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

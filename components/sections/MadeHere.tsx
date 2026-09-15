import VideoPlayer from "../VideoPlayer";
import CTA from "../CTA";
import Reveal from "../Reveal";

// 04 / MADE HERE — video-led process teaser.
export default function MadeHere() {
  return (
    <section className="section" id="made-here" aria-label="Made here">
      <div className="wrap">
        <div className="slabel">
          <span>04 / MADE HERE</span>
          <span className="slabel__note">REAL PEOPLE.<br />ACTUAL HANDS.<br />BRIGHTER SPACES.</span>
        </div>

        <div className="made__grid">
          <div>
            <Reveal as="h2" className="made__title">From sheet to object.</Reveal>
            <p className="made__copy">
              Look Here objects are made from acrylic, mirror, metal, light and
              print — mostly here, between the machines and the mistakes.
            </p>
            <div className="made__foot">
              <CTA href="/process" variant="link">SEE HOW WE MAKE</CTA>
            </div>
          </div>

          <Reveal>
            <VideoPlayer
              src="/media/process-film.mp4"
              poster="/media/process-poster.jpg"
              label="PROCESS FILM 01 / FROM SHEET TO OBJECT"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

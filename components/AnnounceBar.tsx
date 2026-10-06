import WaLink from "./WaLink";

// Slim top bar — a small always-visible cue. Scrolls away; the nav sticks below.
const MSG = "Hi Look Here Studio! I'd like to ask about an object.";

export default function AnnounceBar() {
  return (
    <div className="announce">
      <WaLink text={MSG} location="banner" className="announce__inner">
        <span>MADE TO ORDER IN BENGALURU</span>
        <span className="announce__dot" aria-hidden>◆</span>
        <span>
          REQUEST ANY OBJECT ON WHATSAPP{" "}
          <span className="announce__arrow" aria-hidden>→</span>
        </span>
      </WaLink>
    </div>
  );
}

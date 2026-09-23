// Slim top bar — a small always-visible cue. Scrolls away; the nav sticks below.
const WHATSAPP = "919380670901";
const MSG = "Hi Look Here Studio! I'd like to ask about an object.";

export default function AnnounceBar() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MSG)}`;
  return (
    <div className="announce">
      <a href={href} target="_blank" rel="noreferrer" className="announce__inner">
        <span>MADE TO ORDER IN BENGALURU</span>
        <span className="announce__dot" aria-hidden>◆</span>
        <span>
          REQUEST ANY OBJECT ON WHATSAPP{" "}
          <span className="announce__arrow" aria-hidden>→</span>
        </span>
      </a>
    </div>
  );
}

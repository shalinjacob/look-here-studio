import PageWaLink from "./PageWaLink";

// Slim top bar — a small always-visible cue. Scrolls away; the nav sticks below.

export default function AnnounceBar() {
  return (
    <div className="announce">
      <PageWaLink className="announce__inner">
        <span>MADE TO ORDER IN BENGALURU</span>
        <span className="announce__dot" aria-hidden>◆</span>
        <span>
          REQUEST ANY OBJECT ON WHATSAPP{" "}
          <span className="announce__arrow" aria-hidden>→</span>
        </span>
      </PageWaLink>
    </div>
  );
}

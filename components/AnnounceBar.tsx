"use client";

import { usePathname } from "next/navigation";
import PageWaLink from "./PageWaLink";
import { waHidden } from "@/lib/whatsapp";

// Slim top bar — a small always-visible cue. Scrolls away; the nav sticks below.
// Only Small Runs can be requested on WhatsApp; on coming-soon pages the bar is plain text.

export default function AnnounceBar() {
  const pathname = usePathname() ?? "/";
  if (waHidden(pathname)) {
    return (
      <div className="announce">
        <span className="announce__inner">
          <span>MADE TO ORDER IN BENGALURU</span>
          <span className="announce__dot" aria-hidden>◆</span>
          <span>THIS ONE IS COMING SOON. SMALL RUNS ARE AVAILABLE NOW</span>
        </span>
      </div>
    );
  }
  return (
    <div className="announce">
      <PageWaLink className="announce__inner">
        <span>MADE TO ORDER IN BENGALURU</span>
        <span className="announce__dot" aria-hidden>◆</span>
        <span>
          REQUEST A SMALL RUN ON WHATSAPP{" "}
          <span className="announce__arrow" aria-hidden>→</span>
        </span>
      </PageWaLink>
    </div>
  );
}

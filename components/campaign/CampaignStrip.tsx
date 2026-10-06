"use client";

import Link from "next/link";
import { useCampaignNow } from "./CampaignClock";
import { BANNER_A, BANNER_B, campaignState, countdownParts } from "@/config/campaigns";

// Top strip: Diwali countdown until the cut-off, then the Gift Promise, then nothing.
export default function CampaignStrip() {
  const now = useCampaignNow();
  const state = campaignState(now);
  if (state === "none") return null;

  if (state === "countdown") {
    const { d, h, m } = countdownParts(now);
    return (
      <div className="campaign" role="region" aria-label="Diwali gifting">
        <Link href={BANNER_A.href} className="campaign__inner">
          <strong>{BANNER_A.title}</strong> <span className="campaign__body">{BANNER_A.body}</span>{" "}
          <span className="campaign__clock">
            ⏳ <span>{d}d {h}h {m}m</span> left
          </span>{" "}
          · <span className="campaign__cta">{BANNER_A.cta} →</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="campaign" role="region" aria-label="Gift Promise">
      <Link href={BANNER_B.href} className="campaign__inner">
        <strong>{BANNER_B.title}</strong> <span className="campaign__body">{BANNER_B.body}</span>{" "}
        <span className="campaign__cta">{BANNER_B.cta} →</span>
      </Link>
    </div>
  );
}

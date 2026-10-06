"use client";

import Link from "next/link";
import { useCampaignNow } from "./CampaignClock";
import { BANNER_A, campaignState, countdownParts } from "@/config/campaigns";

// Small Banner A card on product pages (countdown window only).
export default function CampaignCard() {
  const now = useCampaignNow();
  if (campaignState(now) !== "countdown") return null;
  const { d, h, m } = countdownParts(now);
  return (
    <Link href={BANNER_A.href} className="campaign-card">
      <span className="campaign-card__title">{BANNER_A.title}</span>
      <span className="campaign-card__body">
        {BANNER_A.body} ⏳ <span>{d}d {h}h {m}m</span> left
      </span>
      <span className="campaign-card__cta">{BANNER_A.cta} →</span>
    </Link>
  );
}

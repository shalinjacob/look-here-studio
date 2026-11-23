"use client";

import { useEffect } from "react";
import { track, trafficSource } from "@/lib/analytics";

/** fires one `ai_referral` event per visit that arrived from ChatGPT (see trafficSource) */
export default function ReferralTracker() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("lhs_src_sent")) return;
      const src = trafficSource();
      if (!src) return;
      window.sessionStorage.setItem("lhs_src_sent", "1");
      track("ai_referral", { landing_page: window.location.pathname });
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}

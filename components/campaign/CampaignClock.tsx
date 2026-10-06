"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Shared "now" for the campaign banner, driven by the SERVER clock, never the
// visitor's. The first render uses the server render time (so server and client
// HTML match: no hydration warning). After mount it syncs with /api/now and
// advances with performance.now(), which ignores device clock settings.

const Ctx = createContext<number>(0);
export const useCampaignNow = () => useContext(Ctx);

export function CampaignClock({ initialNow, children }: { initialNow: number; children: React.ReactNode }) {
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    let base = initialNow;
    let baseAt = performance.now();
    let alive = true;
    fetch("/api/now", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { now: number }) => {
        if (!alive || typeof d.now !== "number") return;
        base = d.now;
        baseAt = performance.now();
        setNow(base);
      })
      .catch(() => {});
    const t = setInterval(() => setNow(base + (performance.now() - baseAt)), 15000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [initialNow]);

  return <Ctx.Provider value={now}>{children}</Ctx.Provider>;
}

import type { Product } from "@/lib/types";

// The Small Runs pages change order every day (India time) so they never look stale.
// It is a random shuffle seeded by the date, so everyone sees the same order all day
// and it is different tomorrow.

/** today's date in India time, e.g. "2026-11-20" */
export function istDate(now = Date.now()) {
  return new Date(now + 5.5 * 3600e3).toISOString().slice(0, 10);
}

// small deterministic hash -> 0..1
function seeded(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return ((h >>> 0) % 100000) / 100000;
}

export function dailyOrder<T extends Product>(items: T[], now = Date.now()): T[] {
  const date = istDate(now);
  return items
    .map((p) => ({ p, r: seeded(`${date}:${p.slug}`) }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.p);
}

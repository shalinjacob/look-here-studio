// ---------------------------------------------------------------------------
// Working-day maths for dispatch dates, always in IST (Asia/Kolkata),
// whatever zone the server or visitor is in. Working days are Mon–Fri minus
// the studio holidays below.
// ---------------------------------------------------------------------------

/** Studio holidays (YYYY-MM-DD, IST). Seeded from Karnataka public lists;
 *  OWNER to confirm the studio's actual days off. */
export const STUDIO_HOLIDAYS = [
  "2026-10-20",
  "2026-10-21",
  "2026-10-26",
  "2026-11-10",
  "2026-11-27",
  "2026-12-25",
];

export const DISPATCH_WORKING_DAYS = 10;

const IST_OFFSET_MS = 330 * 60 * 1000;

/** the calendar date in IST for an instant, as YYYY-MM-DD */
export function istDate(at: Date | number = Date.now()): string {
  return new Date(+at + IST_OFFSET_MS).toISOString().slice(0, 10);
}

function addDays(ymd: string, n: number): string {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function isWorkingDay(ymd: string, holidays = STUDIO_HOLIDAYS): boolean {
  const dow = new Date(`${ymd}T00:00:00Z`).getUTCDay();
  return dow !== 0 && dow !== 6 && !holidays.includes(ymd);
}

/** the date `n` working days after `fromYmd` (the order date itself doesn't count) */
export function addWorkingDays(fromYmd: string, n = DISPATCH_WORKING_DAYS, holidays = STUDIO_HOLIDAYS): string {
  let d = fromYmd;
  let left = n;
  while (left > 0) {
    d = addDays(d, 1);
    if (isWorkingDay(d, holidays)) left--;
  }
  return d;
}

/** dispatch date for an order confirmed at `at` */
export function dispatchDate(at: Date | number = Date.now()): string {
  return addWorkingDays(istDate(at));
}

/** "Mon 2 Nov 2026" */
export function formatYmd(ymd: string, opts: { year?: boolean; weekday?: boolean } = {}): string {
  const { year = true, weekday = true } = opts;
  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-IN", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    ...(year ? { year: "numeric" } : {}),
    ...(weekday ? { weekday: "short" } : {}),
  }).replace(/,/g, "");
}

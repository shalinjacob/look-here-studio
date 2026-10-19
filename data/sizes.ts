// Real-world sizes for the size guide (/size-guide and the SIZE GUIDE pop-up on product pages).
// All in cm. w × h × d. Keep in step with each product's `dimensions` in data/products.ts.

export interface SizeEntry {
  id: string;
  label: string;
  /** product pages this entry belongs to (used to highlight it when opened from a product) */
  slugs: string[];
  w: number;
  h: number;
  d?: number;
  kind: "wall";
  /** sits on / leans from the floor instead of hanging at eye level */
  onFloor?: boolean;
  note?: string;
  /** size shown in the table when it isn't a plain w × h × d (e.g. a shelf) */
  tableSize?: string;
}

export const SIZES: SizeEntry[] = [
  { id: "strip", label: "Strip Frame", slugs: ["strip-frame"], w: 12, h: 42, d: 1.5, kind: "wall", note: "Fits a photobooth strip" },
  { id: "layer", label: "Layer Clock", slugs: ["layer-clock"], w: 30, h: 30, d: 4.5, kind: "wall" },
  { id: "square", label: "Square Frame", slugs: ["square-frame"], w: 30, h: 30, kind: "wall", note: "Each frame; sold as a set of three" },
  { id: "pb1", label: "Pickleball Shadow Box (one paddle)", slugs: ["pickleball-shadow-box"], w: 30, h: 60, d: 6, kind: "wall" },
  { id: "wclock", label: "Layered Wall Clock", slugs: ["layered-wall-clock"], w: 34, h: 34, d: 3, kind: "wall" },
  { id: "words", label: "Four-Letter Words", slugs: ["four-letter-words"], w: 40, h: 50, d: 4, kind: "wall", note: "Each panel; sold as a set of two" },
  { id: "a2", label: "Editions (A2 prints in LED frames)", slugs: ["old-habits", "smoke-and-feathers", "pomegranate-study", "blood-moon", "sunglasses-at-court", "still-water", "road-trip-in-bloom"], w: 42, h: 59.4, d: 4, kind: "wall", note: "All seven Editions" },
  { id: "cat", label: "Cat Got Your Heart", slugs: ["cat-got-your-heart"], w: 50, h: 46, d: 0.3, kind: "wall" },
  { id: "pink", label: "Pink Wavy Mirror", slugs: ["pink-wavy-mirror"], w: 50, h: 60, d: 2.5, kind: "wall" },
  { id: "wlay", label: "Well, Look At You", slugs: ["well-look-at-you"], w: 60, h: 60, d: 2.5, kind: "wall" },
  { id: "pb2", label: "Pickleball Shadow Box (two paddles)", slugs: ["pickleball-shadow-box"], w: 60, h: 60, d: 6, kind: "wall" },
  { id: "ledge", label: "Clear Ledge", slugs: ["clear-ledge"], w: 60, h: 3, kind: "wall", tableSize: "60 long × 10.5 deep", note: "Holds up to 5 kg; one ledge or a set of three" },
  { id: "planet", label: "Small Planet", slugs: ["small-planet"], w: 60, h: 85, d: 0.3, kind: "wall", note: "Approximate" },
  { id: "quote", label: "Slim LED Quote Frame", slugs: ["slim-led-quote-frame"], w: 65, h: 90, d: 2, kind: "wall", note: "A1; visible print 57.5 × 82 cm" },
  { id: "ripple", label: "Ripple Mirror", slugs: ["ripple-mirror"], w: 80, h: 160, d: 6, kind: "wall", onFloor: true, note: "Full length: leans on the floor" },
  { id: "love", label: "Love More", slugs: ["love-more"], w: 90, h: 62, d: 4.5, kind: "wall" },
  { id: "box", label: "Custom Lightbox", slugs: ["custom-lightbox"], w: 90, h: 15, d: 6, kind: "wall" },

];

export const inches = (cm: number) => (Math.round((cm / 2.54) * 2) / 2).toString().replace(/\.0$/, "");
const num = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10));

export function sizeCm(e: SizeEntry): string {
  if (e.tableSize) return e.tableSize;
  return `${num(e.w)} × ${num(e.h)}${e.d ? ` × ${num(e.d)}` : ""}`;
}
export function sizeIn(e: SizeEntry): string {
  if (e.tableSize) return "23.5 long × 4 deep";
  // very thin pieces (3 mm steel etc.): show tenths of an inch instead of rounding to 0
  const depth = e.d ? (e.d < 1.27 ? (e.d / 2.54).toFixed(1) : inches(e.d)) : "";
  return `${inches(e.w)} × ${inches(e.h)}${depth ? ` × ${depth}` : ""}`;
}

// ---- wall picture layout (all rows share one scale: ROW_W cm across) ----
export const ROW_W = 560;
export const WALL_H = 235; // cm of wall above the floor strip
export const FLOOR_H = 16;
export const EYE = 145; // artwork centre height from the floor (standard hanging height)
const GAP = 12;
const MARGIN = 12;

export interface Placed {
  entry: SizeEntry;
  n: number; // matches the number in the table
  x: number; // cm from left
  bottom: number; // cm from the bottom of the picture (floor strip included)
}
export interface Row {
  pieces: Placed[];
  furniture: boolean;
}

export function layoutWall(): Row[] {
  const wall = SIZES.filter((e) => e.kind === "wall");
  const number = new Map(wall.map((e, i) => [e.id, i + 1]));
  const hung = wall.filter((e) => !e.onFloor);
  const floor = wall.filter((e) => e.onFloor);

  const rows: Row[] = [];
  let cur: Placed[] = [];
  let x = MARGIN;
  for (const entry of hung) {
    if (x + entry.w > ROW_W - MARGIN && cur.length) {
      rows.push({ pieces: cur, furniture: false });
      cur = [];
      x = MARGIN;
    }
    cur.push({ entry, n: number.get(entry.id)!, x, bottom: FLOOR_H + EYE - entry.h / 2 });
    x += entry.w + GAP;
  }
  if (cur.length) rows.push({ pieces: cur, furniture: false });

  // floor row: full-length pieces, the armchair and the console table
  let fx = MARGIN;
  rows.push({
    pieces: floor.map((entry) => {
      const p = { entry, n: number.get(entry.id)!, x: fx, bottom: FLOOR_H };
      fx += entry.w + GAP;
      return p;
    }),
    furniture: true,
  });
  return rows;
}

import Link from "next/link";
import { SIZES, FLOOR_H, EYE, inches, sizeCm, sizeIn, type SizeEntry } from "@/data/sizes";

// Size guide, built to be read at a glance:
//  - <SizeScene>: ONE piece drawn to scale next to an armchair and a console table,
//    with its width and height written on it (used in the product-page pop-up).
//  - <SizeCards>: one simple card per piece with a to-scale outline (used on /size-guide).
// Everything comes from data/sizes.ts, so it always matches the catalogue.

const CHAIR_W = 80;
const CHAIR_H = 85;
const CONSOLE_W = 120;
const CONSOLE_H = 78;

const n1 = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10));

export function SizeScene({ entry }: { entry: SizeEntry }) {
  const onTable = entry.kind === "table";
  const pieceX = 48; // room on the left for the height label
  const sceneW = Math.max(320, entry.w + 314);
  const consoleX = sceneW - 20 - CONSOLE_W;
  const chairX = consoleX - 18 - CHAIR_W;
  // piece position (cm from the picture's bottom-left)
  const bottom = onTable ? FLOOR_H + CONSOLE_H : entry.onFloor ? FLOOR_H : FLOOR_H + EYE - entry.h / 2;
  const left = onTable ? consoleX + (CONSOLE_W - entry.w) / 2 : pieceX;
  const sceneH = Math.max(FLOOR_H + 200, bottom + entry.h + 50);
  const X = (cm: number) => `${(cm / sceneW) * 100}%`;
  const Y = (cm: number) => `${(cm / sceneH) * 100}%`;

  return (
    <figure className="sizescene">
      <div className="sizescene__stage" style={{ aspectRatio: `${sceneW} / ${sceneH}` }} role="img" aria-label={`${entry.label} drawn to scale: ${sizeCm(entry)} cm`}>
        <div className="sizewall__floor" style={{ height: Y(FLOOR_H) }} />

        <div className="sizewall__chair" style={{ left: X(chairX), bottom: Y(FLOOR_H), width: X(CHAIR_W), height: Y(CHAIR_H) }} aria-hidden>
          <i className="sizewall__chair-back" />
          <i className="sizewall__chair-seat" />
        </div>
        <div className="sizewall__console" style={{ left: X(consoleX), bottom: Y(FLOOR_H), width: X(CONSOLE_W), height: Y(CONSOLE_H) }} aria-hidden>
          <i className="sizewall__console-top" />
          <i className="sizewall__console-leg sizewall__console-leg--l" />
          <i className="sizewall__console-leg sizewall__console-leg--r" />
        </div>

        <div className="sizescene__piece" style={{ left: X(left), bottom: Y(bottom), width: X(entry.w), height: Y(entry.h) }}>
          <span className="sizescene__w">{n1(entry.w)} cm</span>
          <span className="sizescene__h">{n1(entry.h)} cm</span>
        </div>

        <span className="sizewall__ref">ARMCHAIR 80 CM WIDE · CONSOLE TABLE 120 CM</span>
      </div>
      <figcaption className="sizescene__cap">
        <strong>{entry.label}</strong>
        <span>{sizeCm(entry)} cm</span>
        <span>{sizeIn(entry)} in</span>
        {entry.note && <small>{entry.note}</small>}
      </figcaption>
    </figure>
  );
}

/** the pop-up on a product page: this product's size(s), big and clear */
export function ProductSize({ slug }: { slug: string }) {
  const mine = SIZES.filter((e) => e.slugs.includes(slug));
  return (
    <div className="sizeguide">
      {mine.map((e) => (
        <SizeScene key={e.id} entry={e} />
      ))}
      <p className="sizeguide__note">
        Sizes are width × height × depth. Made-to-order pieces can vary by a few millimetres.{" "}
        <Link href="/size-guide">See every piece&apos;s size →</Link>
      </p>
    </div>
  );
}

/** /size-guide: one simple card per piece, all drawn at the same scale */
export default function SizeCards() {
  const groups: { title: string; items: SizeEntry[] }[] = [
    { title: "For the wall", items: SIZES.filter((e) => e.kind === "wall") },
    { title: "For a table", items: SIZES.filter((e) => e.kind === "table") },
  ];
  const BOX = 150; // px height of the drawing box
  const biggest = Math.max(...SIZES.filter((e) => e.kind === "wall").map((e) => e.h));
  const wallScale = BOX / biggest; // px per cm, same for every wall card
  const tableScale = BOX / 30;

  return (
    <div className="sizeguide">
      <p className="sizeguide__lead">
        Every outline below is drawn to the same scale, so you can compare pieces by eye. The size is
        written under each one in centimetres and inches. (Table pieces are drawn larger, on their own.)
      </p>
      {groups.map((g) => (
        <section key={g.title}>
          <h3 className="sizeguide__h">{g.title}</h3>
          <div className="sizecards">
            {g.items.map((e) => {
              const s = g.title === "For the wall" ? wallScale : tableScale;
              return (
                <div className="sizecard" key={e.id}>
                  <div className="sizecard__box" style={{ height: BOX }}>
                    <span className="sizecard__shape" style={{ width: Math.max(2, e.w * s), height: Math.max(2, e.h * s) }} />
                  </div>
                  <strong>{e.label}</strong>
                  <span className="sizecard__cm">{sizeCm(e)} cm</span>
                  <span className="sizecard__in">{sizeIn(e)} in</span>
                  {e.note && <small>{e.note}</small>}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <p className="sizeguide__note">
        Sizes are width × height × depth. Made-to-order pieces can vary by a few millimetres. Need a
        different size? Ask us on WhatsApp.
      </p>
    </div>
  );
}

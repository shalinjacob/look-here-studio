import { SIZES, layoutWall, sizeCm, sizeIn, ROW_W, WALL_H, FLOOR_H } from "@/data/sizes";

// Size guide: every wall piece drawn to one scale against an armchair and a console
// table, then a cm / inches table. Generated from data/sizes.ts, so it can't drift
// from the catalogue. `highlight` (a product slug) picks out that product's piece(s).

const H = WALL_H + FLOOR_H;
const x = (cm: number) => `${(cm / ROW_W) * 100}%`;
const y = (cm: number) => `${(cm / H) * 100}%`;

const CHAIR_W = 80;
const CONSOLE_W = 120;

export default function SizeGuide({ highlight }: { highlight?: string }) {
  const rows = layoutWall();
  const isHl = (slugs: string[]) => !!highlight && slugs.includes(highlight);
  const wall = SIZES.filter((e) => e.kind === "wall");
  const table = SIZES.filter((e) => e.kind === "table");
  const numbered = new Map(wall.map((e, i) => [e.id, i + 1]));

  return (
    <div className="sizeguide">
      <p className="sizeguide__lead">
        Every piece drawn to the same scale, hung at the usual gallery height (centre about 145 cm
        from the floor), next to an armchair and a console table so you can picture it on your
        own wall.
      </p>

      {rows.map((row, ri) => (
        <div className="sizewall" key={ri} style={{ aspectRatio: `${ROW_W} / ${H}` }} role="img" aria-label="Wall pieces drawn to scale">
          <div className="sizewall__floor" style={{ height: y(FLOOR_H) }} />
          {row.pieces.map((p) => (
            <div
              key={p.entry.id}
              className={`sizewall__piece${isHl(p.entry.slugs) ? " is-hl" : highlight ? " is-dim" : ""}`}
              style={{ left: x(p.x), bottom: y(p.bottom), width: x(p.entry.w), height: y(p.entry.h) }}
              title={p.entry.label}
            >
              <span className="sizewall__n">{p.n}</span>
            </div>
          ))}
          {row.furniture && (
            <>
              <div className="sizewall__chair" style={{ left: x(ROW_W - 14 - CONSOLE_W - 18 - CHAIR_W), bottom: y(FLOOR_H), width: x(CHAIR_W), height: y(85) }} aria-hidden>
                <i className="sizewall__chair-back" />
                <i className="sizewall__chair-seat" />
              </div>
              <div className="sizewall__console" style={{ left: x(ROW_W - 14 - CONSOLE_W), bottom: y(FLOOR_H), width: x(CONSOLE_W), height: y(78) }} aria-hidden>
                <i className="sizewall__console-top" />
                <i className="sizewall__console-leg sizewall__console-leg--l" />
                <i className="sizewall__console-leg sizewall__console-leg--r" />
              </div>
              <span className="sizewall__ref">ARMCHAIR 80 CM WIDE · CONSOLE TABLE 120 CM</span>
            </>
          )}
        </div>
      ))}

      <h3 className="sizeguide__h">Wall pieces</h3>
      <table className="sizeguide__table">
        <thead>
          <tr><th>#</th><th>Piece</th><th>Centimetres</th><th>Inches</th></tr>
        </thead>
        <tbody>
          {wall.map((e) => (
            <tr key={e.id} className={isHl(e.slugs) ? "is-hl" : undefined}>
              <td>{numbered.get(e.id)}</td>
              <td>{e.label}{e.note && <small>{e.note}</small>}</td>
              <td>{sizeCm(e)}</td>
              <td>{sizeIn(e)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="sizeguide__h">Table pieces</h3>
      <table className="sizeguide__table">
        <thead>
          <tr><th>Piece</th><th>Centimetres</th><th>Inches</th></tr>
        </thead>
        <tbody>
          {table.map((e) => (
            <tr key={e.id} className={isHl(e.slugs) ? "is-hl" : undefined}>
              <td>{e.label}{e.note && <small>{e.note}</small>}</td>
              <td>{sizeCm(e)}</td>
              <td>{sizeIn(e)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="sizeguide__note">
        Sizes are width × height × depth. Made-to-order pieces can vary by a few millimetres.
        Need a different size? Ask us on WhatsApp.
      </p>
    </div>
  );
}

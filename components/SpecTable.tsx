// Specification block written like workshop notes:
//   TYPE ......... wall object
//   MATERIAL ..... brushed metal
// Labels in mono, values in sans. Leader dots via CSS.

export interface SpecRow {
  label: string;
  value: string;
}

export default function SpecTable({
  rows,
  className,
}: {
  rows: SpecRow[];
  className?: string;
}) {
  return (
    <dl className={`spec${className ? " " + className : ""}`}>
      {rows.map((r) => (
        <div className="spec__row" key={r.label}>
          <dt className="spec__label">{r.label}</dt>
          <dd className="spec__value">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

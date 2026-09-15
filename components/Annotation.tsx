// Small marginal notes, workshop-style. "material obsession:" etc.
// Renders as a mono label + a line or two, optionally with a hand-drawn arrow.

interface Props {
  label?: string;
  children?: React.ReactNode;
  arrow?: "none" | "down" | "right" | "left";
  className?: string;
}

export default function Annotation({
  label,
  children,
  arrow = "none",
  className,
}: Props) {
  return (
    <aside className={`annotation${className ? " " + className : ""}`}>
      {arrow !== "none" && <Arrow dir={arrow} />}
      {label && <span className="annotation__label">{label}</span>}
      {children && <span className="annotation__body">{children}</span>}
    </aside>
  );
}

function Arrow({ dir }: { dir: "down" | "right" | "left" }) {
  const rot = dir === "down" ? 90 : dir === "left" ? 180 : 0;
  return (
    <svg
      className="annotation__arrow"
      viewBox="0 0 60 24"
      width={54}
      aria-hidden
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path
        d="M2 12 C18 6 34 6 52 12 M44 5 L54 12 L44 19"
        fill="none"
        stroke="#000"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

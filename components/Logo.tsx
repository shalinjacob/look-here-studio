"use client";

import SmartImage from "./SmartImage";

// ---------------------------------------------------------------------------
// LOOK HERE — the only colour on the whole site.
//
// Renders a self-contained SVG wordmark styled as glossy, white-rimmed acrylic
// lettering, so nothing is ever broken. It ALSO auto-upgrades: if a raster
// render exists at the default path (or the `src` you pass), it's used instead
// — drop the file in /public and it appears with no code change.
//
//   default stacked path: /logo-stacked.png
//   default inline path:  /logo-inline.png
// Pass src={undefined via preferSvg} or delete the file to keep the SVG.
// ---------------------------------------------------------------------------

type Variant = "stacked" | "inline";

interface LogoProps {
  variant?: Variant;
  /** raster override path; defaults to /logo-<variant>.png */
  src?: string;
  /** force the SVG even if a raster file exists */
  preferSvg?: boolean;
  /** rough rendered width in px; height follows the aspect ratio */
  width?: number;
  className?: string;
  title?: string;
}

// L O O K  /  H E R E
const COLORS = [
  "#F0459B", // L pink
  "#26A6E2", // O blue
  "#F5CE10", // O yellow
  "#F0501A", // K orange
  "#9A61D6", // H purple
  "#E11A24", // E red
  "#12A63C", // R green
  "#F27DB6", // E pink
];

const LOOK = ["L", "O", "O", "K"];
const HERE = ["H", "E", "R", "E"];

export default function Logo({
  variant = "stacked",
  src,
  preferSvg = false,
  width,
  className,
  title = "LOOK HERE",
}: LogoProps) {
  const svg =
    variant === "stacked" ? (
      <StackedSVG width={width ?? 520} className={className} title={title} />
    ) : (
      <InlineSVG width={width ?? 300} className={className} title={title} />
    );

  if (preferSvg) return svg;

  const resolved = src ?? `/logo-${variant}.png`;
  return <SmartImage src={resolved} alt={title} fallback={svg} fit="contain" />;
}

/* -------------------------------------------------------------------------- */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="34%" stopColor="#ffffff" stopOpacity="0.28" />
        <stop offset="52%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow
          dx="0"
          dy="7"
          stdDeviation="7"
          floodColor="#000000"
          floodOpacity="0.16"
        />
      </filter>
    </defs>
  );
}

function ColoredWord({
  letters,
  colorOffset,
  x,
  y,
  fontSize,
  glossId,
}: {
  letters: string[];
  colorOffset: number;
  x: number;
  y: number;
  fontSize: number;
  glossId: string;
}) {
  const common = {
    x,
    y,
    fontSize,
    textAnchor: "middle" as const,
    fontFamily: "var(--display), system-ui, sans-serif",
    fontWeight: 800,
    letterSpacing: "-0.01em",
  };
  return (
    <g>
      {/* white acrylic rim + solid colour body */}
      <text
        {...common}
        stroke="#ffffff"
        strokeWidth={fontSize * 0.12}
        style={{ paintOrder: "stroke" }}
      >
        {letters.map((ch, i) => (
          <tspan key={i} fill={COLORS[colorOffset + i]}>
            {ch}
          </tspan>
        ))}
      </text>
      {/* glossy top sheen */}
      <text {...common} fill={`url(#${glossId})`}>
        {letters.map((ch, i) => (
          <tspan key={i}>{ch}</tspan>
        ))}
      </text>
    </g>
  );
}

function StackedSVG({
  width,
  className,
  title,
}: {
  width: number;
  className?: string;
  title: string;
}) {
  const id = "logo-stack";
  return (
    <svg
      viewBox="0 0 600 448"
      width={width}
      height={width * (448 / 600)}
      className={className}
      role="img"
      aria-label={title}
    >
      <Defs id={id} />
      <g filter={`url(#${id}-shadow)`}>
        <ColoredWord
          letters={LOOK}
          colorOffset={0}
          x={300}
          y={190}
          fontSize={185}
          glossId={`${id}-gloss`}
        />
        <ColoredWord
          letters={HERE}
          colorOffset={4}
          x={300}
          y={392}
          fontSize={185}
          glossId={`${id}-gloss`}
        />
      </g>
    </svg>
  );
}

function InlineSVG({
  width,
  className,
  title,
}: {
  width: number;
  className?: string;
  title: string;
}) {
  const id = "logo-inline";
  const all = [...LOOK, " ", ...HERE];
  const common = {
    x: 420,
    y: 118,
    fontSize: 128,
    textAnchor: "middle" as const,
    fontFamily: "var(--display), system-ui, sans-serif",
    fontWeight: 800,
    letterSpacing: "-0.01em",
  };
  return (
    <svg
      viewBox="0 0 840 176"
      width={width}
      height={width * (176 / 840)}
      className={className}
      role="img"
      aria-label={title}
    >
      <Defs id={id} />
      <g filter={`url(#${id}-shadow)`}>
        <text
          {...common}
          stroke="#ffffff"
          strokeWidth={15}
          style={{ paintOrder: "stroke" }}
        >
          {all.map((ch, i) => {
            const ci = i < 4 ? i : i > 4 ? i - 1 : -1;
            return (
              <tspan key={i} fill={ci >= 0 ? COLORS[ci] : "none"}>
                {ch}
              </tspan>
            );
          })}
        </text>
        <text {...common} fill={`url(#${id}-gloss)`}>
          {all.map((ch, i) => (
            <tspan key={i}>{ch}</tspan>
          ))}
        </text>
      </g>
    </svg>
  );
}

import Link from "next/link";

// Typewriter-style call to action. Two looks:
//  - "link": underline that draws itself, arrow that nudges right
//  - "stamp": a black rectangular stamp (inverts on hover)

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "link" | "stamp";
  arrow?: boolean;
  className?: string;
}

export default function CTA({
  href,
  children,
  variant = "link",
  arrow = true,
  className,
}: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const inner = (
    <>
      <span className="cta__label">{children}</span>
      {arrow && (
        <span className="cta__arrow" aria-hidden>
          →
        </span>
      )}
    </>
  );
  const cls = `cta cta--${variant}${className ? " " + className : ""}`;

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

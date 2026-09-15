import CTA from "@/components/CTA";

export default function NotFound() {
  return (
    <section className="section wrap">
      <div className="notfound__inner">
        <span className="notfound__code">404</span>
        <p className="notfound__line">We can&apos;t find that one.</p>
        <p className="notfound__sub">
          Either we haven&apos;t made it yet, or the link took a wrong turn.
        </p>
        <CTA href="/" variant="stamp">BACK TO THE STUDIO</CTA>
      </div>
    </section>
  );
}

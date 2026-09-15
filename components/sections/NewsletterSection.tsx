import Newsletter from "../Newsletter";

export default function NewsletterSection() {
  return (
    <section className="section" id="waitlist" aria-label="Newsletter">
      <div className="wrap">
        <div className="newsletter">
          <h2 className="newsletter__title">Want to see what we make next?</h2>
          <Newsletter cta="LOOK HERE FIRST" />
        </div>
      </div>
    </section>
  );
}

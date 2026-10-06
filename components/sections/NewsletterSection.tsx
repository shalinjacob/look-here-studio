import Newsletter from "../Newsletter";

// Home page sign-up: the Founding List. Founding numbers are assigned by hand
// by the studio; there's deliberately no public counter.
export default function NewsletterSection() {
  return (
    <section className="section" id="waitlist" aria-label="Founding List">
      <div className="wrap">
        <div className="newsletter">
          <h2 className="newsletter__title">Join the Founding List.</h2>
          <p className="newsletter__intro">
            The first 50 people get first dibs on every new object, a numbered founding card
            in their first order, and free personalisation where the object allows. No
            discounts, no spam, no obligation. Just first in line.
          </p>
          <Newsletter
            cta="SAVE MY SPOT"
            source="home"
            foundingList
            withWhatsApp
            doneLine="You're in."
            doneSub="We'll confirm your founding number soon. Same spaces. A little more you."
          />
        </div>
      </div>
    </section>
  );
}

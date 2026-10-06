import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { FACEBOOK_URL, INSTAGRAM_URL, PINTEREST_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: { absolute: "Contact Look Here Studio, Bengaluru" },
  description:
    "Commissions, custom words, corporate and wedding gifting, or a question about an object. WhatsApp +91 93806 70901 or hello@lookherestudio.in.",
};

export default function ContactPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>CONTACT</span><span>BENGALURU / INDIA</span></div>
        <h1 className="pagehead__title">Say hello.</h1>
        <p className="pagehead__sub">
          Commissions, stockist enquiries, or just to tell us which object you&apos;d
          put where. We read everything.
        </p>
      </div>

      <div className="contact__grid">
        <aside className="contact__aside">
          <p>
            <strong>Email</strong>
            <br />
            <a href="mailto:hello@lookherestudio.in">hello@lookherestudio.in</a>
          </p>
          <p style={{ marginTop: 24 }}>
            <strong>Studio</strong>
            <br />
            Bengaluru, India
          </p>
          <p style={{ marginTop: 24 }}>
            <strong>Elsewhere</strong>
            <br />
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            {" · "}
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>
            {PINTEREST_URL && (
              <>
                {" · "}
                <a href={PINTEREST_URL} target="_blank" rel="noreferrer">Pinterest</a>
              </>
            )}
          </p>
          <p style={{ marginTop: 24, color: "var(--muted)" }}>
            No daily emails. We also have jobs.
          </p>
        </aside>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

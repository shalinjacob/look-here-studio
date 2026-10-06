import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, BRAND_NAME } from "@/lib/site";

// DRAFT. OWNER + legal review required (e.g. against India's Digital Personal
// Data Protection Act, 2023). OWNER: legal entity name + registered address.
const UPDATED = "6 October 2026";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: { absolute: `Privacy Policy | ${BRAND_NAME}` },
  description: "How Look Here Studio collects, uses and protects your personal data when you browse, sign up or order.",
};

export default function PrivacyPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>PRIVACY</span><span>DRAFT</span></div>
        <h1 className="pagehead__title">Privacy Policy</h1>
        <p className="pagehead__sub draftline">Draft, last updated {UPDATED}.</p>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <div className="article__body policy">
          <h2>Who we are</h2>
          <p>
            Look Here Studio is a design studio in Bengaluru, Karnataka, India. For anything about
            your data, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Order details</strong>: your name, phone/WhatsApp number, email, delivery address and what you ordered, including any personalisation and gift note.</li>
            <li><strong>Sign-ups</strong>: your email, and your WhatsApp number if you choose to give it, when you join the Founding List or ask to hear about an object.</li>
            <li><strong>Messages</strong>: what you send us through the contact form, email or WhatsApp.</li>
            <li><strong>Analytics cookies</strong>, if enabled: how the site is used (pages viewed, objects added to cart), collected by tools such as Google Analytics and Meta Pixel.</li>
          </ul>

          <h2>Payments</h2>
          <p>
            Payments are processed by our payment provider. We never see or store your card or bank
            details.
          </p>

          <h2>Why we use it</h2>
          <ul>
            <li>To make, deliver and support your order.</li>
            <li>To reply when you contact us.</li>
            <li>To send updates you&apos;ve opted in to. WhatsApp updates only if you ticked the box, and you can stop them any time.</li>
            <li>To understand how the site is used, so we can improve it.</li>
          </ul>

          <h2>Who we share it with</h2>
          <ul>
            <li>Our courier, to deliver your order.</li>
            <li>Our payment provider, to take payment.</li>
            <li>Email, analytics and advertising tools, if enabled, which process data on our behalf.</li>
          </ul>
          <p>We don&apos;t sell your data.</p>

          <h2>How long we keep it</h2>
          <p>
            Order records are kept for as long as the law requires for accounts and tax. Sign-up
            details are kept until you unsubscribe or ask us to delete them.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete your personal data, or withdraw consent you&apos;ve
            given (for example, to WhatsApp updates). Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>{" "}
            and we&apos;ll respond promptly.
          </p>

          <h2>Related</h2>
          <p>
            <Link href="/terms">Terms</Link> · <Link href="/shipping-returns">Shipping &amp; returns</Link> ·{" "}
            <Link href="/contact">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

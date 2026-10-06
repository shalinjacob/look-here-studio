"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

// Waitlist / Founding List form -> /api/waitlist (provider-agnostic; dev writes
// to a local file). Validates, shows error + success, prevents double-submits.
// `withWhatsApp` adds an optional number and an explicit, unticked opt-in.

export default function Newsletter({
  id = "waitlist",
  compact = false,
  cta = "LOOK HERE FIRST",
  productSlug,
  source,
  foundingList = false,
  withWhatsApp = false,
  doneLine = "✓ Noted. You're on the list.",
  doneSub = "We'll write when there's something worth looking at.",
}: {
  id?: string;
  compact?: boolean;
  cta?: string;
  productSlug?: string;
  source?: string;
  foundingList?: boolean;
  withWhatsApp?: boolean;
  doneLine?: string;
  doneSub?: string;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("that doesn't look like an email. try again.");
      return;
    }
    if (optIn && !phone.trim()) {
      setError("add a WhatsApp number, or untick the box.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(phone.trim() ? { phone: phone.trim() } : {}),
          ...(optIn ? { whatsappOptIn: true } : {}),
          ...(productSlug ? { productSlug } : {}),
          ...(source ? { source } : {}),
          ...(foundingList ? { foundingList: true } : {}),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "something broke on our end. try again.");
        return;
      }
      track("generate_lead", { source: source ?? "site", ...(productSlug ? { item_id: productSlug } : {}) });
      setDone(true);
    } catch {
      setError("couldn't reach us. check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`newsletter newsletter--done${compact ? " newsletter--compact" : ""}`}>
        <p className="newsletter__done-line">{doneLine}</p>
        <p className="newsletter__done-sub">{doneSub}</p>
      </div>
    );
  }

  return (
    <form className={`newsletter${compact ? " newsletter--compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="newsletter__form">
        <div className="newsletter__field">
          <label htmlFor={id} className="newsletter__label">Email</label>
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            className="newsletter__input"
            placeholder="Your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
            aria-invalid={!!error}
          />
          <button type="submit" className="newsletter__submit" disabled={busy}>
            {busy ? "SENDING…" : cta} <span aria-hidden>→</span>
          </button>
        </div>
        {withWhatsApp && (
          <div className="newsletter__extra">
            <label htmlFor={`${id}-phone`} className="newsletter__label newsletter__label--visible">
              WhatsApp number (optional)
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="newsletter__input newsletter__input--phone"
              placeholder="e.g. 98765 43210"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); if (error) setError(""); }}
            />
            <label className="newsletter__optin">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => { setOptIn(e.target.checked); if (error) setError(""); }}
              />
              <span>Yes, message me on WhatsApp about new objects (2–4 times a month, max).</span>
            </label>
          </div>
        )}
        <p className={`newsletter__msg${error ? " newsletter__msg--err" : ""}`} role={error ? "alert" : undefined}>
          {error || "No daily emails. We also have jobs."}
        </p>
      </div>
    </form>
  );
}

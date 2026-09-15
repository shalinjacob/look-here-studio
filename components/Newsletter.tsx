"use client";

import { useState } from "react";

// Waitlist form -> /api/waitlist (provider-agnostic; dev writes to a local file).
// Validates, shows error + success, and prevents double-submits.

export default function Newsletter({
  id = "waitlist",
  compact = false,
  cta = "LOOK HERE FIRST",
}: {
  id?: string;
  compact?: boolean;
  cta?: string;
}) {
  const [email, setEmail] = useState("");
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
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "something broke on our end. try again.");
        return;
      }
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
        <p className="newsletter__done-line">✓ Noted. You&apos;re on the list.</p>
        <p className="newsletter__done-sub">We&apos;ll write when there&apos;s something worth looking at.</p>
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
        <p className={`newsletter__msg${error ? " newsletter__msg--err" : ""}`}>
          {error || "No daily emails. We also have jobs."}
        </p>
      </div>
    </form>
  );
}

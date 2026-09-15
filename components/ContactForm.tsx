"use client";

import { useState } from "react";

// Contact form -> /api/contact (same configurable-endpoint approach as the
// waitlist). Validation, loading, error and success states.

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    if (status === "err") { setStatus("idle"); setError(""); }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "busy") return;
    if (!form.name.trim()) return fail("we'd like a name to reply to.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return fail("that email looks off.");
    if (form.message.trim().length < 4) return fail("tell us a little more.");
    setStatus("busy"); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return fail(d.error || "something broke on our end.");
      }
      setStatus("ok");
    } catch {
      fail("couldn't reach us. try again.");
    }
  }
  function fail(msg: string) { setStatus("err"); setError(msg); }

  if (status === "ok") {
    return (
      <div>
        <p className="form__msg form__msg--ok" style={{ fontSize: 16 }}>
          ✓ Note sent. We read everything — reply usually within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form__field">
        <label className="form__label" htmlFor="c-name">Name</label>
        <input id="c-name" className="form__input" value={form.name}
          onChange={(e) => update("name", e.target.value)} autoComplete="name" />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="c-email">Email</label>
        <input id="c-email" type="email" className="form__input" value={form.email}
          onChange={(e) => update("email", e.target.value)} autoComplete="email" />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="c-msg">What&apos;s up?</label>
        <textarea id="c-msg" className="form__textarea" value={form.message}
          onChange={(e) => update("message", e.target.value)} />
      </div>
      <button type="submit" className="cta cta--stamp" disabled={status === "busy"}>
        <span className="cta__label">{status === "busy" ? "SENDING…" : "SEND NOTE"}</span>
        <span className="cta__arrow">→</span>
      </button>
      {error && <p className="form__msg form__msg--err">{error}</p>}
    </form>
  );
}

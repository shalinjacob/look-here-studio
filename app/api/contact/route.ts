import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

// Contact endpoint. Same configurable approach as the waitlist:
// set CONTACT_WEBHOOK_URL (Zapier / Make / your API / a Slack webhook) to
// forward messages; otherwise dev writes them to data/contact.local.json.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let name = "", email = "", message = "";
  try {
    const b = await req.json();
    name = String(b?.name ?? "").trim();
    email = String(b?.email ?? "").trim();
    message = String(b?.message ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  if (!name || !EMAIL_RE.test(email) || message.length < 4) {
    return NextResponse.json({ ok: false, error: "please check the fields" }, { status: 422 });
  }

  const payload = { name, email, message, source: "look-here-studio", ts: new Date().toISOString() };

  try {
    // 1) Resend — emails the studio directly (reply-to = the enquirer)
    if (process.env.RESEND_API_KEY) {
      const to = process.env.CONTACT_TO || "hello@lookherestudio.in";
      const from = process.env.CONTACT_FROM || "Look Here Studio <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New note from ${name} — lookherestudio.in`,
          text: `From: ${name} <${email}>\n\n${message}\n\n— sent from the lookherestudio.in contact form`,
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`resend ${res.status} ${detail}`);
      }
      return NextResponse.json({ ok: true, provider: "resend" });
    }

    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true, provider: "webhook" });
    }

    if (process.env.NODE_ENV !== "production") {
      const file = path.join(process.cwd(), "data", "contact.local.json");
      let list: unknown[] = [];
      try { list = JSON.parse(await fs.readFile(file, "utf8")); } catch { /* first */ }
      list.push(payload);
      await fs.writeFile(file, JSON.stringify(list, null, 2));
      return NextResponse.json({ ok: true, provider: "local-file" });
    }

    throw new Error("no contact endpoint configured");
  } catch (err) {
    console.error("[contact] failed:", err);
    return NextResponse.json({ ok: false, error: "could not send right now" }, { status: 502 });
  }
}

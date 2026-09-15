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

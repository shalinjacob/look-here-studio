import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Waitlist endpoint. Provider-agnostic: set the env vars for whichever list
// tool you use and it forwards there. With nothing configured it stores to a
// local JSON file in dev so you can test end-to-end. See .env.example.
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid email" },
      { status: 422 }
    );
  }

  try {
    const provider = await subscribe(email);
    return NextResponse.json({ ok: true, provider });
  } catch (err) {
    console.error("[waitlist] subscribe failed:", err);
    return NextResponse.json(
      { ok: false, error: "could not subscribe right now" },
      { status: 502 }
    );
  }
}

async function subscribe(email: string): Promise<string> {
  // 1) Buttondown
  if (process.env.BUTTONDOWN_API_KEY) {
    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, tags: ["first-list"] }),
    });
    if (!res.ok && res.status !== 409) throw new Error(`buttondown ${res.status}`);
    return "buttondown";
  }

  // 2) ConvertKit
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
      }
    );
    if (!res.ok) throw new Error(`convertkit ${res.status}`);
    return "convertkit";
  }

  // 3) Mailchimp
  if (
    process.env.MAILCHIMP_API_KEY &&
    process.env.MAILCHIMP_AUDIENCE_ID &&
    process.env.MAILCHIMP_SERVER_PREFIX
  ) {
    const dc = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us21"
    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, status: "subscribed" }),
      }
    );
    if (!res.ok && res.status !== 400) throw new Error(`mailchimp ${res.status}`);
    return "mailchimp";
  }

  // 4) Generic webhook (Zapier, Make, your own endpoint, a Google Sheet proxy…)
  if (process.env.WAITLIST_WEBHOOK_URL) {
    const res = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "look-here-studio", ts: Date.now() }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return "webhook";
  }

  // 5) Dev fallback — append to a local file so you can test without a provider.
  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "data", "waitlist.local.json");
    let list: { email: string; ts: string }[] = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      /* first write */
    }
    if (!list.some((e) => e.email === email)) {
      list.push({ email, ts: new Date().toISOString() });
      await fs.writeFile(file, JSON.stringify(list, null, 2));
    }
    return "local-file";
  }

  // Production with nothing configured: don't lose the signup silently.
  throw new Error("no waitlist provider configured");
}

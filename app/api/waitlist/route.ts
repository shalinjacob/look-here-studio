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
const SLUG_RE = /^[a-z0-9-]{1,80}$/;

/** Accepted payload. Only `email` is required, so old `{ email }` posts still work. */
export interface Signup {
  email: string;
  phone?: string; // E.164-ish, e.g. +919380670901
  whatsappOptIn?: boolean;
  productSlug?: string;
  source?: string;
  foundingList?: boolean;
}

/** 10-digit Indian mobile, or + country code and 8–15 digits */
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^(\+?91|0)[6-9]\d{9}$/.test(digits)) return `+91${digits.slice(-10)}`;
  if (/^\+\d{8,15}$/.test(digits)) return digits;
  return null;
}

const err = (error: string, status = 422) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return err("bad request", 400);
  }

  const signup: Signup = { email: String(body.email ?? "").trim().toLowerCase() };
  if (!EMAIL_RE.test(signup.email)) return err("that doesn't look like an email. try again.");

  const rawPhone = String(body.phone ?? "").trim();
  if (rawPhone) {
    const phone = normalisePhone(rawPhone);
    if (!phone) return err("that number looks a bit off. try 10 digits, or add your country code.");
    signup.phone = phone;
  }
  if (body.whatsappOptIn === true) {
    if (!signup.phone) return err("add a WhatsApp number, or untick the box.");
    signup.whatsappOptIn = true;
  }
  if (body.productSlug != null) {
    const slug = String(body.productSlug);
    if (!SLUG_RE.test(slug)) return err("bad request", 400);
    signup.productSlug = slug;
  }
  if (body.source != null) signup.source = String(body.source).slice(0, 40);
  if (body.foundingList === true) signup.foundingList = true;

  try {
    const provider = await subscribe(signup);
    return NextResponse.json({ ok: true, provider });
  } catch (err) {
    console.error("[waitlist] subscribe failed:", err);
    return NextResponse.json(
      { ok: false, error: "could not subscribe right now" },
      { status: 502 }
    );
  }
}

function tagsFor(s: Signup): string[] {
  return [
    "first-list",
    ...(s.foundingList ? ["founding-list"] : []),
    ...(s.whatsappOptIn ? ["whatsapp-opt-in"] : []),
    ...(s.productSlug ? [`waitlist:${s.productSlug}`] : []),
    ...(s.source ? [`source:${s.source}`] : []),
  ];
}

async function subscribe(signup: Signup): Promise<string> {
  const { email } = signup;
  // 1) Buttondown
  if (process.env.BUTTONDOWN_API_KEY) {
    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        tags: tagsFor(signup),
        metadata: {
          ...(signup.phone ? { phone: signup.phone } : {}),
          whatsapp_opt_in: String(!!signup.whatsappOptIn),
          ...(signup.productSlug ? { product: signup.productSlug } : {}),
          ...(signup.source ? { source: signup.source } : {}),
        },
      }),
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
        body: JSON.stringify({ email_address: email, status: "subscribed", tags: tagsFor(signup) }),
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
      body: JSON.stringify({ ...signup, site: "look-here-studio", ts: Date.now() }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return "webhook";
  }

  // 5) Email each sign-up to the studio via Resend (same key as the contact form)
  if (process.env.RESEND_API_KEY && process.env.WAITLIST_NOTIFY_TO) {
    const from = process.env.CONTACT_FROM || "Look Here Studio <onboarding@resend.dev>";
    const lines = [
      `Email: ${email}`,
      `WhatsApp: ${signup.phone ?? "—"} (opted in: ${signup.whatsappOptIn ? "yes" : "no"})`,
      `List: ${signup.foundingList ? "Founding List" : "Waitlist"}`,
      `Object: ${signup.productSlug ?? "—"}`,
      `Source: ${signup.source ?? "—"}`,
    ];
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: process.env.WAITLIST_NOTIFY_TO.split(",").map((s) => s.trim()),
        subject: `${signup.foundingList ? "Founding List" : "Waitlist"} sign-up: ${email}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return "resend-email";
  }

  // 6) Dev fallback — append to a local file so you can test without a provider.
  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "data", "waitlist.local.json");
    let list: (Signup & { ts: string })[] = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      /* first write */
    }
    const key = (e: Signup) => `${e.email}|${e.productSlug ?? ""}|${e.foundingList ? "f" : ""}`;
    if (!list.some((e) => key(e) === key(signup))) {
      list.push({ ...signup, ts: new Date().toISOString() });
      await fs.writeFile(file, JSON.stringify(list, null, 2));
    }
    return "local-file";
  }

  // Production with nothing configured: don't lose the signup silently.
  throw new Error("no waitlist provider configured");
}

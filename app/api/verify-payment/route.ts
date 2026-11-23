import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { EMAIL } from "@/lib/site";

export const runtime = "nodejs";

// POST /api/verify-payment  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// success only if HMAC-SHA256(order_id|payment_id, KEY_SECRET) matches the signature.
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ error: "Payments are not configured" }, { status: 500 });

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = b;
  if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const c = Buffer.from(signature);
  if (a.length !== c.length || !crypto.timingSafeEqual(a, c)) {
    return NextResponse.json({ success: false, error: "Signature mismatch" }, { status: 400 });
  }

  console.log(`[razorpay] payment verified order=${orderId} payment=${paymentId}`);
  // Tell the studio who paid for what (best effort: never fails the payment itself).
  try {
    await notifyStudio(orderId, paymentId, cleanPreviews(b.previews));
  } catch (e) {
    console.error("[razorpay] studio notification failed:", e);
  }
  return NextResponse.json({ success: true, order_id: orderId, payment_id: paymentId });
}

// Reads the order back from Razorpay (so the details are the ones that were paid for)
// and emails them to the studio (hello@lookherestudio.in by default; ORDER_NOTIFY_TO overrides)
// via Resend. Needs RESEND_API_KEY; without it the order is still in the Razorpay dashboard.
async function notifyStudio(orderId: string, paymentId: string, previews: Preview[]) {
  const to = process.env.ORDER_NOTIFY_TO || EMAIL; // hello@lookherestudio.in unless overridden
  if (!process.env.RESEND_API_KEY) return;
  const rzp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
  const order = await rzp.orders.fetch(orderId);
  const n = (order.notes ?? {}) as Record<string, string>;
  const items = [n.items_1, n.items_2, n.items_3, n.items_4].filter(Boolean).join("");
  const text = [
    `PAID ONLINE: ₹${(Number(order.amount) / 100).toLocaleString("en-IN")} (items ₹${n.items_total ?? "?"} + shipping ₹${n.shipping_fee ?? "?"}, ${n.shipping_zone ?? "?"})`,
    `Razorpay order ${orderId} · payment ${paymentId}`,
    "",
    ...(n.traffic_source ? [`Came from: ${n.traffic_source}`] : []),
    `Items: ${items || "—"}`,
    `Gift: ${n.gift ?? "no"}${n.gift_note ? ` — note: ${n.gift_note}` : ""}`,
    "",
    `Name: ${n.name ?? "—"}`,
    `Phone: ${n.phone ?? "—"}`,
    `Email: ${n.email ?? "—"}`,
    `Address: ${n.address ?? "—"}`,
    `City: ${n.city ?? "—"} ${n.pincode ?? ""}`,
    ...(previews.length
      ? ["", `Customer previews attached (${previews.length}):`, ...previews.map((p, i) => `${i + 1}. ${p.label}`)]
      : []),
  ].join("\n");
  const from = process.env.CONTACT_FROM || "Look Here Studio <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((x) => x.trim()),
      reply_to: n.email || undefined,
      subject: `New paid order: ${n.name ?? "customer"} · ₹${(Number(order.amount) / 100).toLocaleString("en-IN")}`,
      text,
      ...(previews.length
        ? { attachments: previews.map((p, i) => ({ filename: `preview-${i + 1}.jpg`, content: p.base64 })) }
        : {}),
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

interface Preview {
  label: string;
  base64: string;
}

// Previews come from the browser, so keep only small JPEGs (max 5) and attach nothing else.
function cleanPreviews(raw: unknown): Preview[] {
  if (!Array.isArray(raw)) return [];
  const out: Preview[] = [];
  for (const p of raw.slice(0, 5) as { label?: unknown; dataUrl?: unknown }[]) {
    const m = typeof p?.dataUrl === "string" ? /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(p.dataUrl) : null;
    if (!m || m[1].length > 1_500_000) continue;
    out.push({ label: String(p.label ?? "Preview").slice(0, 160), base64: m[1] });
  }
  return out;
}

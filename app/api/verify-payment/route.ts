import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

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
    await notifyStudio(orderId, paymentId);
  } catch (e) {
    console.error("[razorpay] studio notification failed:", e);
  }
  return NextResponse.json({ success: true, order_id: orderId, payment_id: paymentId });
}

// Reads the order back from Razorpay (so the details are the ones that were paid for)
// and emails them to the studio via Resend. Needs RESEND_API_KEY + ORDER_NOTIFY_TO
// (falls back to WAITLIST_NOTIFY_TO); without them the order is still in the Razorpay dashboard.
async function notifyStudio(orderId: string, paymentId: string) {
  const to = process.env.ORDER_NOTIFY_TO || process.env.WAITLIST_NOTIFY_TO;
  if (!process.env.RESEND_API_KEY || !to) return;
  const rzp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
  const order = await rzp.orders.fetch(orderId);
  const n = (order.notes ?? {}) as Record<string, string>;
  const items = [n.items_1, n.items_2, n.items_3, n.items_4].filter(Boolean).join("");
  const text = [
    `PAID ONLINE: ₹${(Number(order.amount) / 100).toLocaleString("en-IN")}`,
    `Razorpay order ${orderId} · payment ${paymentId}`,
    "",
    `Items: ${items || "—"}`,
    `Gift: ${n.gift ?? "no"}${n.gift_note ? ` — note: ${n.gift_note}` : ""}`,
    "",
    `Name: ${n.name ?? "—"}`,
    `Phone: ${n.phone ?? "—"}`,
    `Email: ${n.email ?? "—"}`,
    `Address: ${n.address ?? "—"}`,
    `City: ${n.city ?? "—"} ${n.pincode ?? ""}`,
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
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

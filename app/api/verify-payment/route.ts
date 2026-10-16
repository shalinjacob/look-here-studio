import { NextResponse } from "next/server";
import crypto from "crypto";

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

  // No database yet: the verified payment is logged so it can be matched in the Razorpay dashboard.
  console.log(`[razorpay] payment verified order=${orderId} payment=${paymentId}`);
  return NextResponse.json({ success: true, order_id: orderId, payment_id: paymentId });
}

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { priceCart } from "@/lib/razorpayPricing";

export const runtime = "nodejs";

// POST /api/create-order  { lines: [{ slug, price, qty, variant? }] }
// The amount is recomputed from the catalogue; the client's total is never trusted.
export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 500 });
  }

  let body: { lines?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const priced = priceCart(body.lines);
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 400 });

  const amount = Math.round(priced.total * 100); // paise
  if (amount < 100) return NextResponse.json({ error: "Minimum amount is ₹1" }, { status: 400 });

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rzp.orders.create({
      amount,
      currency: "INR",
      receipt: `lhs_${Date.now()}`,
      notes: {
        items: (body.lines as { slug: string; variant?: string; qty: number }[])
          .map((l) => `${l.slug}${l.variant ? `(${l.variant})` : ""}x${l.qty}`)
          .join(", ")
          .slice(0, 250),
      },
    });
    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (err: unknown) {
    const e = err as { statusCode?: number };
    const status = e?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { error: status === 401 ? "Payment gateway authentication failed" : "Could not create the order" },
      { status }
    );
  }
}

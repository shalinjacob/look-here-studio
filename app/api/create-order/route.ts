import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { priceCart } from "@/lib/razorpayPricing";
import { cleanCustomer } from "@/lib/orderDetails";
import { getProduct } from "@/data/products";

export const runtime = "nodejs";

// POST /api/create-order  { lines: [{ slug, price, qty, variant? }], customer, gift?, giftNote? }
// The amount is recomputed from the catalogue; the client's total is never trusted.
// Delivery details travel with the order (Razorpay notes), so they show in the dashboard.
export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 500 });
  }

  let body: { lines?: unknown; customer?: unknown; gift?: unknown; giftNote?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const priced = priceCart(body.lines);
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 400 });

  const who = cleanCustomer(body.customer as never);
  if (!who.ok) return NextResponse.json({ error: who.error }, { status: 400 });
  const c = who.value;

  const amount = Math.round(priced.total * 100); // paise
  if (amount < 100) return NextResponse.json({ error: "Minimum amount is ₹1" }, { status: 400 });

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rzp.orders.create({
      amount,
      currency: "INR",
      receipt: `lhs_${Date.now()}`,
      notes: {
        name: c.name,
        phone: c.phone,
        email: c.email,
        address: c.address,
        city: c.city,
        pincode: c.pincode,
        gift: body.gift === true ? "yes" : "no",
        gift_note: body.gift === true ? String(body.giftNote ?? "").slice(0, 200) : "",
        ...itemNotes(body.lines as { slug: string; variant?: string; qty: number }[]),
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

/** Razorpay notes hold 256 chars per key: split the item list across items_1..items_4 */
function itemNotes(lines: { slug: string; variant?: string; qty: number }[]) {
  const text = lines
    .map((l) => `${getProduct(l.slug)?.name ?? l.slug}${l.variant ? ` (${String(l.variant).slice(0, 80)})` : ""} x${l.qty}`)
    .join("; ");
  const out: Record<string, string> = {};
  for (let i = 0; i < 4 && text.length > i * 250; i++) out[`items_${i + 1}`] = text.slice(i * 250, (i + 1) * 250);
  return out;
}

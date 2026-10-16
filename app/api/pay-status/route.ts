import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TEMPORARY diagnostic: which Razorpay env vars does this deployment see? (yes/no only)
export async function GET() {
  const e = process.env;
  return NextResponse.json({
    RAZORPAY_KEY_ID: !!e.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: !!e.RAZORPAY_KEY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: !!e.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    vercelEnv: e.VERCEL_ENV ?? null,
    commit: e.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    razorpayLike: Object.keys(e).filter((k) => /razor|rzp/i.test(k)),
  });
}

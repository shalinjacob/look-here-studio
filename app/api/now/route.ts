import { NextResponse } from "next/server";

// Server clock for the campaign banner, so banner switches never depend on the
// visitor's device time.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ now: Date.now() }, { headers: { "Cache-Control": "no-store" } });
}

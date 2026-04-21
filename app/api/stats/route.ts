// app/api/stats/route.ts
// GET /api/stats — deal counter and listing counts
// Cache: ISR revalidation every 3600s
// Source: Estate2.0 Website Spec Section 5.3

import { NextResponse } from "next/server";
import { getStats } from "@/lib/stats";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = getStats();

    if (!stats) {
      return NextResponse.json(
        { error: "Stats unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[API /stats] Error:", error);
    return NextResponse.json(
      { error: "Stats unavailable. Message Clement directly on WhatsApp." },
      { status: 500 }
    );
  }
}

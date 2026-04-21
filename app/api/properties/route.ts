// app/api/properties/route.ts
// GET /api/properties — verified listings with optional filters
// Response shape: { properties, total, offset, limit }
//
// Source: Estate2.0 Website Spec Section 5.1

import { NextRequest, NextResponse } from "next/server";
import { getVerifiedListings } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const priceMaxRaw = searchParams.get("price_max");
    const limitRaw = searchParams.get("limit");
    const offsetRaw = searchParams.get("offset");
    const since = searchParams.get("since");

    const priceMax = priceMaxRaw ? parseInt(priceMaxRaw, 10) : null;
    const limit = limitRaw ? parseInt(limitRaw, 10) : null;
    const offset = offsetRaw ? parseInt(offsetRaw, 10) : null;

    const result = getVerifiedListings({
      location,
      type,
      priceMax: priceMax && !isNaN(priceMax) ? priceMax : null,
      limit: limit && !isNaN(limit) ? limit : null,
      offset: offset && !isNaN(offset) ? offset : null,
      since,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /properties] Error:", error);
    return NextResponse.json(
      {
        error: "Listings unavailable. Message Clement directly on WhatsApp.",
        properties: [],
        total: 0,
        offset: 0,
        limit: 6,
      },
      { status: 500 }
    );
  }
}

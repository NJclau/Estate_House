// app/api/properties/[slug]/route.ts
// GET /api/properties/[slug] — single property detail
// Queries base table (not view) for full verification timeline data
// Excludes owner_notes explicitly
//
// Source: Estate2.0 Website Spec Section 5.2

import { NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid property identifier" },
        { status: 400 }
      );
    }

    // Reject slugs that look like injection attempts
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: "Invalid property identifier" },
        { status: 400 }
      );
    }

    const property = getPropertyBySlug(slug);

    if (!property) {
      return NextResponse.json(
        {
          error: "Property not found or no longer available.",
          suggestion: "Browse all listings or message Clement on WhatsApp.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("[API /properties/[slug]] Error:", error);
    return NextResponse.json(
      {
        error: "Property details unavailable. Message Clement directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}

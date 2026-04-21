// middleware.ts
// Rate limiting for /api/* routes
// 10 requests per minute per IP
// Returns 429 with WhatsApp fallback message
//
// Source: Estate2.0 Website Spec Section 5.1

import { NextRequest, NextResponse } from "next/server";

// In-memory store: ip → { count, resetTime }
// NOTE: Cleared on deploy/restart. For multi-instance, use Redis.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;

function getClientIp(request: NextRequest): string {
  // Check forwarded headers (when behind nginx)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  // Fallback to direct connection
  return request.ip ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  // Existing window
  record.count++;
  return record.count > MAX_REQUESTS;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Periodic cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 300_000);

export function middleware(request: NextRequest) {
  // Only apply to /api/* routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error: "Too many requests. Message Clement directly on WhatsApp.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

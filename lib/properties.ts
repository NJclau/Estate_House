// lib/properties.ts
// SQLite query functions — read-only, connection per query, immediate close
// ONLY queries verified_listings view or Verified+Available base table rows
//
// Source: Estate2.0 Website Spec Section 5.1, 5.2, 9.2

import Database from "better-sqlite3";

const DB_PATH = process.env.SQLITE_DB_PATH ?? "/workspace/estateclaw.db";

// ── Allowlists ──────────────────────────────────────────────

const ALLOWED_LOCATIONS = ["kicukiro", "remera", "nyamirambo", "gasabo", "kimironko"];
const ALLOWED_TYPES = ["house", "apartment", "land", "commercial"];

export interface SanitisedFilters {
  safeLocation: string | undefined;
  safeType: string | undefined;
}

export function sanitise(
  location?: string | null,
  type?: string | null
): SanitisedFilters {
  const safeLocation = ALLOWED_LOCATIONS.includes(location?.toLowerCase() ?? "")
    ? location!.toLowerCase()
    : undefined;
  const safeType = ALLOWED_TYPES.includes(type?.toLowerCase() ?? "")
    ? type!.toLowerCase()
    : undefined;
  return { safeLocation, safeType };
}

// ── Types ───────────────────────────────────────────────────

export interface PropertyRow {
  slug: string;
  title: string;
  price: number;
  price_display: string;
  location: string;
  landmark: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  upi: string;
  upi_verified_date: string;
  price_confirmed_date: string;
  verified_date: string;
  verified: number; // SQLite boolean → 0/1
  photos: string;   // JSON string
  photo_count: number;
  features: string; // JSON string
  proximity: string; // JSON string
}

export interface PropertyDetailRow {
  slug: string;
  title: string;
  status: string;
  availability: string;
  sector: string;
  location: string;
  landmark: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  price_display: string;
  price_range: string | null;
  target: string | null;
  water: string | null;
  parking: string | null;
  security: string | null;
  generator: number | null;
  proximity: string; // JSON
  photos: string;    // JSON
  upi: string;
  upi_verified_date: string;
  price_confirmed_date: string;
  verified_date: string;
  verified_by_Clement: number;
  photo_count: number;
}

export interface ListingsResult {
  properties: PropertyRow[];
  total: number;
  offset: number;
  limit: number;
}

export interface ListingsParams {
  location?: string | null;
  type?: string | null;
  priceMax?: number | null;
  limit?: number | null;
  offset?: number | null;
  since?: string | null;
}

// ── getVerifiedListings ─────────────────────────────────────

export function getVerifiedListings(params: ListingsParams): ListingsResult {
  const db = new Database(DB_PATH, { readonly: true, fileMustExist: true });

  try {
    const { safeLocation, safeType } = sanitise(params.location, params.type);
    const limit = Math.min(Math.max(params.limit ?? 6, 1), 20);
    const offset = Math.max(params.offset ?? 0, 0);

    // Build WHERE clause
    const conditions: string[] = ["1 = 1"];
    const binds: (string | number)[] = [];

    if (safeLocation) {
      conditions.push("sector = ?");
      binds.push(safeLocation);
    }
    if (safeType) {
      conditions.push("type = ?");
      binds.push(safeType);
    }
    if (params.priceMax && !isNaN(params.priceMax)) {
      conditions.push("price <= ?");
      binds.push(params.priceMax);
    }
    if (params.since) {
      // Basic ISO date validation
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(params.since)) {
        conditions.push("verified_date > ?");
        binds.push(params.since);
      }
    }

    const whereClause = conditions.join(" AND ");

    // Count total (for pagination metadata)
    const countStmt = db.prepare(
      `SELECT COUNT(*) as total FROM verified_listings WHERE ${whereClause}`
    );
    const { total } = countStmt.get(...binds) as { total: number };

    // Fetch rows
    const query = `
      SELECT *,
        (SELECT COUNT(*) FROM json_each(photos)) as photo_count
      FROM verified_listings
      WHERE ${whereClause}
      ORDER BY verified_date DESC
      LIMIT ? OFFSET ?
    `;
    const rows = db.prepare(query).all(...binds, limit, offset) as PropertyRow[];

    return {
      properties: rows,
      total,
      offset,
      limit,
    };
  } finally {
    db.close();
  }
}

// ── getPropertyBySlug ───────────────────────────────────────

export function getPropertyBySlug(slug: string): PropertyDetailRow | null {
  const db = new Database(DB_PATH, { readonly: true, fileMustExist: true });

  try {
    const row = db
      .prepare(
        `
        SELECT
          slug, title, status, availability, sector, location, landmark,
          type, bedrooms, bathrooms, price, price_display, price_range,
          target, water, parking, security, generator, proximity, photos,
          upi, upi_verified_date, price_confirmed_date, verified_date,
          verified_by_Clement,
          (SELECT COUNT(*) FROM json_each(photos)) as photo_count
        FROM properties
        WHERE slug = ? AND status = 'Verified' AND availability = 'Available'
        `
      )
      .get(slug) as PropertyDetailRow | undefined;

    return row ?? null;
  } finally {
    db.close();
  }
}

// ── getNewListingCount ──────────────────────────────────────

export function getNewListingCount(since: string): number {
  const db = new Database(DB_PATH, { readonly: true, fileMustExist: true });

  try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(since)) return 0;

    const result = db
      .prepare(
        `
        SELECT COUNT(*) as count
        FROM verified_listings
        WHERE verified_date > ?
        `
      )
      .get(since) as { count: number };

    return result.count;
  } finally {
    db.close();
  }
}

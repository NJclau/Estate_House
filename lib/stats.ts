// lib/stats.ts
// SQLite query functions for stats endpoint
// Source: Estate2.0 Website Spec Section 5.3, 9.2

import Database from "better-sqlite3";

const DB_PATH = process.env.SQLITE_DB_PATH ?? "/workspace/estateclaw.db";

export interface Stats {
  deals_this_month: number;
  total_verified: number;
  last_verified_date: string | null;
}

export function getStats(): Stats | null {
  const db = new Database(DB_PATH, { readonly: true, fileMustExist: true });

  try {
    const stats = db
      .prepare(
        `
        SELECT
          (SELECT COUNT(*) FROM properties WHERE availability = 'Sold' AND strftime('%Y-%m', sold_date) = strftime('%Y-%m', 'now')) as deals_this_month,
          (SELECT COUNT(*) FROM properties WHERE status = 'Verified' AND availability = 'Available') as total_verified,
          (SELECT MAX(verified_date) FROM properties) as last_verified_date
        `
      )
      .get() as Stats;

    return stats;
  } catch (error) {
    console.error("[Stats] Database error:", error);
    return null;
  } finally {
    db.close();
  }
}

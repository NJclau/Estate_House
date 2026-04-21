// components/DealCounter.tsx
// Server component — fetches deals count from /api/stats
// Hidden when deals_this_month === 0 or on error
// Source: Estate2.0 Website Spec Section 4.1.3

import { getStats } from "@/lib/stats";

export default async function DealCounter() {
  const stats = getStats();

  // Fail silently: do not render if no data or zero deals
  if (!stats || stats.deals_this_month === 0) {
    return null;
  }

  return (
    <span className="deal-counter" role="status" aria-live="polite">
      {stats.deals_this_month} properties sold this month
    </span>
  );
}

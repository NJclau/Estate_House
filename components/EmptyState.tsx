// components/EmptyState.tsx
// Illustrated empty state — Kigali skyline SVG + action CTA
// Two variants: no listings / filter returns no results
// Source: Estate2.0 Website Spec Section 4.6

import WhatsAppButton from "./WhatsAppButton";
import { waGeneral, waSaveSearch } from "@/lib/whatsapp";

interface EmptyStateProps {
  variant?: "no-listings" | "no-filter-match";
  filterLocation?: string;
  filterType?: string;
  filterPriceMax?: string;
}

export default function EmptyState({
  variant = "no-listings",
  filterLocation,
  filterType,
  filterPriceMax,
}: EmptyStateProps) {
  const isNoListings = variant === "no-listings";

  // Build WhatsApp href for filter empty state
  const saveSearchHref =
    !isNoListings && filterLocation && filterType
      ? waSaveSearch(
          filterLocation,
          filterType,
          filterPriceMax
            ? `${parseInt(filterPriceMax, 10) / 1_000_000}M RWF`
            : "any price"
        )
      : waGeneral();

  return (
    <div className="empty-state">
      {/* Kigali skyline illustration */}
      <svg
        className="empty-state__illustration"
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Kigali city silhouette"
      >
        {/* Hill profile */}
        <path
          d="M0 60 Q20 45 40 55 Q60 35 80 50 Q100 40 120 55 L120 80 L0 80 Z"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
        {/* Building 1 */}
        <rect
          x="15"
          y="35"
          width="12"
          height="20"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
        {/* Building 2 */}
        <rect
          x="35"
          y="25"
          width="14"
          height="30"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
        {/* Building 3 */}
        <rect
          x="58"
          y="30"
          width="10"
          height="25"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
        {/* Spire */}
        <path
          d="M85 20 L90 10 L95 20"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
        <rect
          x="87"
          y="20"
          width="6"
          height="35"
          fill="var(--brand-cream-dark)"
          stroke="var(--brand-green-dark)"
          strokeWidth="1.5"
        />
      </svg>

      <h3 className="empty-state__title">
        {isNoListings
          ? "No listings yet."
          : "No verified listings match this search."}
      </h3>

      <p className="empty-state__body">
        {isNoListings
          ? "Message Clement — he has off-market properties not yet listed online."
          : "Clement may have properties not yet online in this area. Message him with your requirements — he'll reply within 30 minutes."}
      </p>

      <div className="empty-state__cta">
        <WhatsAppButton
          href={saveSearchHref}
          label={
            isNoListings
              ? "Message Clement on WhatsApp"
              : "Message Clement — Save your search"
          }
          variant="primary"
          fullWidth
        />
      </div>
    </div>
  );
}

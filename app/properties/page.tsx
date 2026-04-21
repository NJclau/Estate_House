// app/properties/page.tsx
// Listings page with filter system (desktop bar + mobile bottom sheet)
// Filter state synced to URL params for shareability
//
// Source: Estate2.0 Website Spec Section 4.2

"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyGrid from "@/components/PropertyGrid";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import WhatsAppButton from "@/components/WhatsAppButton";
import { waGeneral } from "@/lib/whatsapp";
import type { Property } from "@/lib/mockProperties";

// Lazy load mobile filter sheet — 0ms cost until opened
const FilterBottomSheet = dynamic(
  () => import("@/components/FilterBottomSheet"),
  { ssr: false }
);

interface ApiResponse {
  properties: Property[];
  total: number;
  offset: number;
  limit: number;
}

function ListingsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";
  const priceMax = searchParams.get("price_max") ?? "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch listings based on URL params
  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const params = new URLSearchParams();
      params.set("limit", "9");
      if (location) params.set("location", location);
      if (type) params.set("type", type);
      if (priceMax) params.set("price_max", priceMax);

      const res = await fetch(`/api/properties?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data: ApiResponse = await res.json();
      setProperties(data.properties);
      setTotal(data.total);
    } catch {
      setIsError(true);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  }, [location, type, priceMax]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Apply mobile filters
  const handleMobileApply = useCallback(
    (filters: { location: string; type: string; priceMax: string }) => {
      const params = new URLSearchParams();
      if (filters.location) params.set("location", filters.location);
      if (filters.type) params.set("type", filters.type);
      if (filters.priceMax) params.set("price_max", filters.priceMax);
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const activeFilterCount = [location, type, priceMax].filter(Boolean).length;

  return (
    <section className="listings-page" aria-label="Property listings">
      {/* Header */}
      <div className="listings-page__header">
        <h1 className="listings-page__title">Verified Listings</h1>
        <p className="listings-page__count">
          {isLoading ? "Loading..." : `${total} properties found`}
        </p>
      </div>

      {/* Desktop filter bar (hidden on mobile) */}
      <div className="listings-page__filter-desktop">
        <FilterBar />
      </div>

      {/* Mobile filter trigger (hidden on desktop) */}
      <div className="listings-page__filter-mobile">
        <button
          type="button"
          className="filter-trigger-btn"
          onClick={() => setIsMobileFilterOpen(true)}
          aria-label="Open filter options"
        >
          Filter
          {activeFilterCount > 0 && (
            <span className="filter-trigger-badge">{activeFilterCount}</span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Results */}
      {isError ? (
        <div className="listings-page__error">
          <p className="listings-page__error-title">
            Couldn&apos;t load listings.
          </p>
          <div className="listings-page__error-actions">
            <button
              type="button"
              onClick={fetchListings}
              className="property-grid__retry-btn"
            >
              Tap to retry
            </button>
            <WhatsAppButton
              href={waGeneral()}
              label="Message Clement"
              variant="secondary"
              fullWidth={false}
            />
          </div>
        </div>
      ) : properties.length === 0 && !isLoading ? (
        <EmptyState
          variant={activeFilterCount > 0 ? "no-filter-match" : "no-listings"}
          filterLocation={location}
          filterType={type}
          filterPriceMax={priceMax}
        />
      ) : (
        <PropertyGrid properties={properties} isLoading={isLoading} />
      )}

      {/* Mobile bottom sheet (lazy loaded) */}
      <FilterBottomSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={{ location, type, priceMax }}
        onApply={handleMobileApply}
      />
    </section>
  );
}

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <section className="listings-page" aria-label="Property listings">
          <div className="listings-page__header">
            <h1 className="listings-page__title">Verified Listings</h1>
          </div>
          <PropertyGrid properties={[]} isLoading />
        </section>
      }
    >
      <ListingsPageInner />
    </Suspense>
  );
}

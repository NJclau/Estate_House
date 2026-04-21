// components/FilterBar.tsx
// Desktop horizontal filter bar — syncs state to URL params
// 4 columns: Location | Type | Price | Clear
//
// Source: Estate2.0 Website Spec Section 4.2.1

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const LOCATION_OPTIONS = [
  { value: "", label: "All locations" },
  { value: "kicukiro", label: "Kicukiro" },
  { value: "remera", label: "Remera" },
  { value: "nyamirambo", label: "Nyamirambo" },
  { value: "gasabo", label: "Gasabo" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const PRICE_OPTIONS = [
  { value: "", label: "Any price" },
  { value: "50000000", label: "Under 50M" },
  { value: "100000000", label: "Under 100M" },
  { value: "120000000", label: "Under 120M" },
  { value: "500000000", label: "Under 500M" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";
  const priceMax = searchParams.get("price_max") ?? "";

  const activeFilterCount = [location, type, priceMax].filter(Boolean).length;

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push("/properties", { scroll: false });
  }, [router]);

  return (
    <div className="filter-bar" role="search" aria-label="Filter listings">
      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="filter-bar__pills">
          {location && (
            <span className="filter-pill">
              {LOCATION_OPTIONS.find((o) => o.value === location)?.label}
              <button
                type="button"
                onClick={() => updateFilter("location", "")}
                aria-label="Remove location filter"
              >
                ×
              </button>
            </span>
          )}
          {type && (
            <span className="filter-pill">
              {TYPE_OPTIONS.find((o) => o.value === type)?.label}
              <button
                type="button"
                onClick={() => updateFilter("type", "")}
                aria-label="Remove type filter"
              >
                ×
              </button>
            </span>
          )}
          {priceMax && (
            <span className="filter-pill">
              {PRICE_OPTIONS.find((o) => o.value === priceMax)?.label}
              <button
                type="button"
                onClick={() => updateFilter("price_max", "")}
                aria-label="Remove price filter"
              >
                ×
              </button>
            </span>
          )}
          <span className="filter-bar__count">
            {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
          </span>
        </div>
      )}

      {/* Filter controls */}
      <div className="filter-bar__controls">
        <div className="filter-bar__field">
          <label htmlFor="filter-location" className="filter-bar__label">
            Location
          </label>
          <select
            id="filter-location"
            className="filter-bar__select"
            value={location}
            onChange={(e) => updateFilter("location", e.target.value)}
          >
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-bar__field">
          <label htmlFor="filter-type" className="filter-bar__label">
            Type
          </label>
          <select
            id="filter-type"
            className="filter-bar__select"
            value={type}
            onChange={(e) => updateFilter("type", e.target.value)}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-bar__field">
          <label htmlFor="filter-price" className="filter-bar__label">
            Price
          </label>
          <select
            id="filter-price"
            className="filter-bar__select"
            value={priceMax}
            onChange={(e) => updateFilter("price_max", e.target.value)}
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            className="filter-bar__clear"
            onClick={clearAll}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

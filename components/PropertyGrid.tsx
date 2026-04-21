// components/PropertyGrid.tsx
// Bento layout: 2fr featured left, 1fr + 1fr stacked right
// States: loading (skeleton), empty (EmptyState), error, success
//
// Source: Estate2.0 Website Spec Section 4.1.5, 4.2.3

import PropertyCard from "./PropertyCard";
import EmptyState from "./EmptyState";
import WhatsAppButton from "./WhatsAppButton";
import type { Property } from "@/lib/mockProperties";

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  isError?: boolean;
}

function SkeletonGrid() {
  return (
    <div className="property-grid property-grid--skeleton" aria-busy="true" aria-label="Loading listings">
      {/* Featured skeleton */}
      <div className="property-grid__featured skeleton-tile">
        <div className="skeleton-pulse skeleton-photo skeleton-photo--featured" />
        <div className="skeleton-content">
          <div className="skeleton-pulse skeleton-line skeleton-line--price" />
          <div className="skeleton-pulse skeleton-line skeleton-line--location" />
          <div className="skeleton-pulse skeleton-line skeleton-line--cta" />
        </div>
      </div>
      {/* Standard skeletons */}
      <div className="property-grid__stacked">
        <div className="skeleton-tile">
          <div className="skeleton-pulse skeleton-photo" />
          <div className="skeleton-content">
            <div className="skeleton-pulse skeleton-line skeleton-line--price" />
            <div className="skeleton-pulse skeleton-line skeleton-line--location" />
          </div>
        </div>
        <div className="skeleton-tile">
          <div className="skeleton-pulse skeleton-photo" />
          <div className="skeleton-content">
            <div className="skeleton-pulse skeleton-line skeleton-line--price" />
            <div className="skeleton-pulse skeleton-line skeleton-line--location" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="property-grid__error">
      <p className="property-grid__error-title">Couldn&apos;t load listings.</p>
      <div className="property-grid__error-actions">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="property-grid__retry-btn"
        >
          Tap to retry
        </button>
        <WhatsAppButton
          label="Message Clement"
          variant="secondary"
          fullWidth={false}
        />
      </div>
    </div>
  );
}

export default function PropertyGrid({
  properties,
  isLoading = false,
  isError = false,
}: PropertyGridProps) {
  // Loading state
  if (isLoading) {
    return <SkeletonGrid />;
  }

  // Error state
  if (isError) {
    return <ErrorState />;
  }

  // Empty state
  if (properties.length === 0) {
    return <EmptyState variant="no-listings" />;
  }

  // Bento layout: first item featured, next 2 standard
  const featured = properties[0];
  const standard = properties.slice(1, 3);

  return (
    <div className="property-grid">
      {/* Featured tile — 2fr */}
      <div className="property-grid__featured">
        <PropertyCard property={featured} variant="featured" />
      </div>

      {/* Stacked column — 1fr + 1fr */}
      <div className="property-grid__stacked">
        {standard.map((property) => (
          <PropertyCard
            key={property.slug}
            property={property}
            variant="standard"
          />
        ))}
      </div>
    </div>
  );
}

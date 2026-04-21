// components/PropertyCard.tsx
// Three variants: standard (available), featured (Bento hero tile), unavailable (sold)
// Every CTA routes to WhatsApp with context-appropriate pre-fill
//
// Source: Estate2.0 Website Spec Section 4.2.3

import Image from "next/image";
import { waListingInquiry } from "@/lib/whatsapp";
import type { Property } from "@/lib/mockProperties";

interface PropertyCardProps {
  property: Property;
  variant?: "standard" | "featured" | "unavailable";
}

export default function PropertyCard({
  property,
  variant = "standard",
}: PropertyCardProps) {
  const isFeatured = variant === "featured";
  const isUnavailable = variant === "unavailable";

  const whatsappHref = waListingInquiry(property.location, property.price_display);

  return (
    <article
      className={`property-card ${isFeatured ? "property-card--featured" : ""} ${isUnavailable ? "property-card--unavailable" : ""}`}
      aria-label={`${property.title}, ${property.price_display}`}
    >
      {/* Photo area */}
      <div className="property-card__photo">
        <Image
          src={property.photos[0] ?? "/placeholder-property.jpg"}
          alt={`${property.type} in ${property.location} — photo 1 of ${property.photo_count}`}
          fill
          sizes={isFeatured ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 100vw, 33vw"}
          className="property-card__image"
        />

        {/* Verified badge — always visible */}
        <span className="verified-badge">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Verified
        </span>

        {/* SOLD ribbon for unavailable */}
        {isUnavailable && (
          <span className="sold-ribbon" aria-hidden="true">
            SOLD
          </span>
        )}

        {/* White overlay for unavailable */}
        {isUnavailable && <div className="unavailable-overlay" aria-hidden="true" />}

        {/* Featured: price overlay on image */}
        {isFeatured && (
          <div className="featured-overlay">
            <div className="featured-overlay__price">
              <p className="featured-overlay__primary">{property.price_display}</p>
              <p className="featured-overlay__secondary">
                {property.price.toLocaleString()} RWF
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="property-card__content">
        {/* Price — standard only (featured shows on image) */}
        {!isFeatured && (
          <div className="property-card__price">
            <p className="property-card__price-primary">{property.price_display}</p>
            <p className="property-card__price-secondary">
              {property.price.toLocaleString()} RWF
            </p>
          </div>
        )}

        {/* Location line */}
        <p className="property-card__location">
          {property.location} · {property.bedrooms > 0 ? `${property.bedrooms} bed · ` : ""}
          {property.type}
        </p>

        {/* Proximity tag */}
        {property.landmark && (
          <p className="property-card__proximity">{property.landmark}</p>
        )}

        {/* CTA */}
        {isUnavailable ? (
          <a
            href={`/properties?location=${encodeURIComponent(property.location.toLowerCase())}&type=${encodeURIComponent(property.type)}`}
            className="property-card__cta property-card__cta--secondary"
          >
            Similar properties available →
          </a>
        ) : (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="property-card__cta property-card__cta--primary"
          >
            Ask Clement about this →
          </a>
        )}
      </div>
    </article>
  );
}

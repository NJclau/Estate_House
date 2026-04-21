// app/properties/[slug]/page.tsx
// Property detail — deep trust + conversion surface
// OG metadata for WhatsApp link previews
//
// Source: Estate2.0 Website Spec Section 4.3

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/properties";
import { formatRWF, formatRWFFull } from "@/lib/currency";
import PhotoCarousel from "@/components/PhotoCarousel";
import VerificationTimeline from "@/components/VerificationTimeline";
import ClementSidebar from "@/components/ClementSidebar";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import USDToggle from "@/components/USDToggle";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyViewTracker from "@/components/PropertyViewTracker";
import { waGeneral } from "@/lib/whatsapp";

// ── OG Metadata ─────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: "Property Not Available · EstateClaw",
    };
  }

  const title = `${property.price_display} · ${property.location} · EstateClaw`;
  const description = `${property.type} in ${property.location}. Title verified. Commission only.`;

  return {
    title,
    description,
    openGraph: {
      title: `${property.price_display} · ${property.location} — Verified Property`,
      description: `${property.bedrooms} bed ${property.type} near ${property.landmark}. ✓ Title verified.`,
      images: property.photos
        ? [{ url: JSON.parse(property.photos)[0], width: 1200, height: 630 }]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

// ── Page ────────────────────────────────────────────────────

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getPropertyBySlug(params.slug);

  // 404 — property no longer available
  if (!property) {
    return (
      <section className="property-detail__not-found">
        <h1>This property is no longer available</h1>
        <p>Clement may have similar options.</p>
        <div className="property-detail__not-found-actions">
          <a href="/properties" className="property-detail__browse-link">
            Browse all listings
          </a>
          <WhatsAppButton
            href={waGeneral()}
            label="Message Clement"
            variant="secondary"
            fullWidth={false}
          />
        </div>
      </section>
    );
  }

  const photos: string[] = JSON.parse(property.photos);
  const proximity: string[] = JSON.parse(property.proximity);

  const priceRWFDisplay = formatRWF(property.price);
  const priceRWFFull = formatRWFFull(property.price);

  return (
    <article className="property-detail">
      {/* Track this view for returning user personalization */}
      <PropertyViewTracker
        slug={property.slug}
        location={locationNormalized}
        type={property.type}
      />
      {/* Photo Carousel */}
      <PhotoCarousel
        photos={photos}
        propertyTitle={property.title}
        location={property.location}
        type={property.type}
      />

      {/* Main content grid */}
      <div className="property-detail__layout">
        {/* Left column — property info */}
        <div className="property-detail__main">
          {/* Price block */}
          <div className="property-detail__price-block">
            <p className="property-detail__price-primary">{priceRWFDisplay}</p>
            <p className="property-detail__price-secondary">{priceRWFFull}</p>
            <USDToggle rwfAmount={property.price} />
          </div>

          {/* Title + location */}
          <h1 className="property-detail__title">{property.title}</h1>
          <p className="property-detail__location">
            {property.location}
            {property.bedrooms > 0 && ` · ${property.bedrooms} bed`}
            {property.bathrooms > 0 && ` · ${property.bathrooms} bath`}
            {` · ${property.type}`}
          </p>

          {/* Proximity tags */}
          {proximity.length > 0 && (
            <ul className="property-detail__proximity" role="list">
              {proximity.map((tag) => (
                <li key={tag} className="property-detail__proximity-tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {/* Features */}
          <div className="property-detail__features">
            <h2>Features</h2>
            <dl className="property-detail__features-list">
              {property.water && (
                <>
                  <dt>Water</dt>
                  <dd>{property.water}</dd>
                </>
              )}
              {property.parking && (
                <>
                  <dt>Parking</dt>
                  <dd>{property.parking}</dd>
                </>
              )}
              {property.security && (
                <>
                  <dt>Security</dt>
                  <dd>{property.security}</dd>
                </>
              )}
              {property.generator !== null && (
                <>
                  <dt>Generator</dt>
                  <dd>{property.generator ? "Yes" : "No"}</dd>
                </>
              )}
            </dl>
          </div>

          {/* Verification Timeline */}
          <VerificationTimeline
            data={{
              upi: property.upi,
              upi_verified_date: property.upi_verified_date,
              price_confirmed_date: property.price_confirmed_date,
              verified_date: property.verified_date,
              photo_count: photos.length,
              verified_by_Clement: property.verified_by_Clement,
            }}
          />
        </div>

        {/* Right column — Clement sidebar (desktop) */}
        <div className="property-detail__sidebar">
          <ClementSidebar
            propertySlug={property.slug}
            propertyTitle={property.title}
            propertyPrice={property.price_display}
            verifiedDate={property.verified_date}
          />
        </div>
      </div>

      {/* Mobile: Clement sidebar rendered below features */}
      <div className="property-detail__sidebar-mobile">
        <ClementSidebar
          propertySlug={property.slug}
          propertyTitle={property.title}
          propertyPrice={property.price_display}
          verifiedDate={property.verified_date}
        />
      </div>

      {/* Sticky bottom CTA */}
      <StickyBottomCTA
        propertySlug={property.slug}
        propertyTitle={property.title}
        propertyPrice={property.price_display}
      />
    </article>
  );
}

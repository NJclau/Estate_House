// components/ReturningBanner.tsx
// Personalized welcome banner for returning users
// 3 variants: recent property, filter context, generic
// Placed below Hero on homepage
//
// Source: Estate2.0 Website Spec Section 8

"use client";

import { useEffect, useState } from "react";
import { useReturningUser } from "@/hooks/useReturningUser";
import {
  getSeenProperties,
  getLastLocation,
  getLastType,
} from "@/lib/storage";
import WhatsAppButton from "./WhatsAppButton";
import { waGeneral } from "@/lib/whatsapp";

type BannerVariant = "recent-property" | "filter-context" | "generic";

interface BannerConfig {
  variant: BannerVariant;
  headline: string;
  ctaLabel: string;
  ctaHref?: string;
}

function determineVariant(): BannerConfig {
  const slugs = getSeenProperties();
  const location = getLastLocation();

  // Variant 1: Has viewed a property recently
  if (slugs.length > 0) {
    return {
      variant: "recent-property",
      headline: "Welcome back. Want to continue where you left off?",
      ctaLabel: "View recent properties",
      ctaHref: `/properties/${slugs[0]}`,
    };
  }

  // Variant 2: Has filter context but no property views
  if (location) {
    const type = getLastType();
    const searchUrl = type
      ? `/properties?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`
      : `/properties?location=${encodeURIComponent(location)}`;

    return {
      variant: "filter-context",
      headline: `Still looking in ${location.charAt(0).toUpperCase() + location.slice(1)}?`,
      ctaLabel: "View latest listings",
      ctaHref: searchUrl,
    };
  }

  // Variant 3: Generic returning user
  return {
    variant: "generic",
    headline: "Welcome back. Clement can help you find the right property.",
    ctaLabel: "Message Clement on WhatsApp",
  };
}

export default function ReturningBanner() {
  const { isReturning, isReady } = useReturningUser();
  const [dismissed, setDismissed] = useState(false);

  // Check session dismissal (does not persist across sessions)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const sessionDismissed = sessionStorage.getItem("estate_banner_dismissed");
      if (sessionDismissed === "true") {
        setDismissed(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  if (!isReady || !isReturning || dismissed) {
    return null;
  }

  const config = determineVariant();

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("estate_banner_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const isWhatsAppCta = config.variant === "generic";

  return (
    <div
      className="returning-banner"
      role="region"
      aria-label="Returning user message"
    >
      <div className="returning-banner__inner">
        <div className="returning-banner__content">
          <p className="returning-banner__headline">{config.headline}</p>

          {isWhatsAppCta ? (
            <WhatsAppButton
              href={waGeneral()}
              label={config.ctaLabel}
              variant="secondary"
              fullWidth={false}
            />
          ) : (
            <a
              href={config.ctaHref}
              className="returning-banner__cta"
            >
              {config.ctaLabel}
            </a>
          )}
        </div>

        <button
          type="button"
          className="returning-banner__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss welcome message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

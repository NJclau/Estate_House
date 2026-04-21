// components/PropertyViewTracker.tsx
// Records property view in localStorage on page load
// Used inside server-rendered property detail pages
//
// Source: Estate2.0 Website Spec Section 8

"use client";

import { useEffect } from "react";
import { useViewedProperties } from "@/hooks/useViewedProperties";

interface PropertyViewTrackerProps {
  slug: string;
  location?: string;
  type?: string;
}

export default function PropertyViewTracker({
  slug,
  location,
  type,
}: PropertyViewTrackerProps) {
  const { recordView } = useViewedProperties();

  useEffect(() => {
    recordView(slug, location, type);
  }, [slug, location, type, recordView]);

  return null;
}

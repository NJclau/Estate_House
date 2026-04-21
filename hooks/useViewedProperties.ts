// hooks/useViewedProperties.ts
// Tracks last 5 viewed property slugs in localStorage
// Deduplicated, most recent first
//
// Source: Estate2.0 Website Spec Section 8

"use client";

import { useCallback } from "react";
import {
  getSeenProperties,
  setSeenProperties,
  setLastLocation,
  setLastType,
} from "@/lib/storage";

const MAX_HISTORY = 5;

export function useViewedProperties() {
  const recordView = useCallback(
    (slug: string, location?: string, type?: string) => {
      const current = getSeenProperties();

      // Deduplicate: remove if exists, then prepend
      const filtered = current.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, MAX_HISTORY);

      setSeenProperties(updated);

      // Also track last filter context
      if (location) setLastLocation(location);
      if (type) setLastType(type);
    },
    []
  );

  const getRecentSlug = useCallback((): string | null => {
    const slugs = getSeenProperties();
    return slugs[0] ?? null;
  }, []);

  const getAllSlugs = useCallback((): string[] => {
    return getSeenProperties();
  }, []);

  return { recordView, getRecentSlug, getAllSlugs };
}

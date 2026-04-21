// components/FilterBottomSheet.tsx
// Mobile filter drawer — slides up from bottom
// Lazy loaded via next/dynamic. Zero render cost until opened.
//
// Source: Estate2.0 Website Spec Section 4.2.2

"use client";

import { useEffect, useRef, useCallback } from "react";

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

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    location: string;
    type: string;
    priceMax: string;
  };
  onApply: (filters: {
    location: string;
    type: string;
    priceMax: string;
  }) => void;
}

export default function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onApply,
}: FilterBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusable = sheet.querySelectorAll<HTMLElement>(
      'button, select, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    sheet.addEventListener("keydown", handleTab);
    return () => sheet.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleApply = useCallback(() => {
    onApply({
      location: locationRef.current?.value ?? "",
      type: typeRef.current?.value ?? "",
      priceMax: priceRef.current?.value ?? "",
    });
    onClose();
  }, [onApply, onClose]);

  const handleClear = useCallback(() => {
    if (locationRef.current) locationRef.current.value = "";
    if (typeRef.current) typeRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
    onApply({ location: "", type: "", priceMax: "" });
    onClose();
  }, [onApply, onClose]);

  if (!isOpen) return null;

  return (
    <div className="filter-sheet-overlay" onClick={onClose} role="presentation">
      <div
        ref={sheetRef}
        className="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Filter listings"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="filter-sheet__handle" aria-hidden="true">
          <div className="filter-sheet__handle-bar" />
        </div>

        <h2 className="filter-sheet__title">Filter listings</h2>

        <div className="filter-sheet__fields">
          <div className="filter-sheet__field">
            <label htmlFor="sheet-location">Location</label>
            <select
              id="sheet-location"
              ref={locationRef}
              defaultValue={filters.location}
            >
              {LOCATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-sheet__field">
            <label htmlFor="sheet-type">Type</label>
            <select
              id="sheet-type"
              ref={typeRef}
              defaultValue={filters.type}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-sheet__field">
            <label htmlFor="sheet-price">Price range</label>
            <select
              id="sheet-price"
              ref={priceRef}
              defaultValue={filters.priceMax}
            >
              {PRICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-sheet__actions">
          <button
            type="button"
            className="filter-sheet__apply"
            onClick={handleApply}
          >
            Apply filters
          </button>
          <button
            type="button"
            className="filter-sheet__clear"
            onClick={handleClear}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

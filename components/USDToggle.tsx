// components/USDToggle.tsx
// RWF/USD currency toggle with localStorage persistence
// Source: Estate2.0 Website Spec Section 4.3.2

"use client";

import { useState, useEffect } from "react";
import { formatUSD } from "@/lib/currency";

interface USDToggleProps {
  rwfAmount: number;
}

const STORAGE_KEY = "estate_currency_pref";

export default function USDToggle({ rwfAmount }: USDToggleProps) {
  const [showUSD, setShowUSD] = useState(false);

  // Load preference from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "usd") {
        setShowUSD(true);
      }
    } catch {
      // localStorage unavailable — ignore
    }
  }, []);

  // Persist preference
  const toggle = () => {
    const next = !showUSD;
    setShowUSD(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "usd" : "rwf");
    } catch {
      // Ignore
    }
  };

  return (
    <div className="usd-toggle">
      <button
        type="button"
        onClick={toggle}
        className="usd-toggle__button"
        aria-expanded={showUSD}
      >
        {showUSD ? "Show in RWF" : "Show in USD"}
      </button>

      {showUSD && (
        <div className="usd-toggle__display">
          <p className="usd-toggle__amount">≈ {formatUSD(rwfAmount)} USD</p>
          <p className="usd-toggle__disclaimer">
            Exchange rate approximate — April 2026
          </p>
        </div>
      )}
    </div>
  );
}

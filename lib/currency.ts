// lib/currency.ts
// Hardcoded RWF to USD conversion rate
// Updated weekly. No external API in Phase 1.
//
// Source: Estate2.0 Website Spec Section 4.3.2

export const RWF_TO_USD = 0.000703; // Rate: April 2026

export function formatUSD(rwfAmount: number): string {
  const usd = rwfAmount * RWF_TO_USD;
  return usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatRWF(rwfAmount: number): string {
  return `${(rwfAmount / 1_000_000).toFixed(0)}M RWF`;
}

export function formatRWFFull(rwfAmount: number): string {
  return `${rwfAmount.toLocaleString()} RWF`;
}

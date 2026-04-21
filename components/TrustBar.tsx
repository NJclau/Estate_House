// components/TrustBar.tsx
// Horizontal trust strip: verification, process, fee model + live deal counter
// Desktop: horizontal row | Mobile: 2x2 grid
// Source: Estate2.0 Website Spec Section 4.1.3

import DealCounter from "./DealCounter";

interface TrustItemProps {
  icon: React.ReactNode;
  label: string;
}

function TrustItem({ icon, label }: TrustItemProps) {
  return (
    <li className="trust-item" role="listitem">
      <span className="trust-item__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="trust-item__label">{label}</span>
    </li>
  );
}

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Trust signals">
      <ul className="trust-bar__list" role="list">
        {/* Item 1: Verification */}
        <TrustItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
          label="Title Verified Listings"
        />

        {/* Item 2: Channel */}
        <TrustItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
          label="WhatsApp-First — No Forms"
        />

        {/* Item 3: Fee model */}
        <TrustItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
            </svg>
          }
          label="Commission Only — No Upfront Fees"
        />

        {/* Item 4: DealCounter — conditional, server-fetched */}
        <li className="trust-item trust-item--counter" role="listitem">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5h3a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5h-3a2.5 2.5 0 0 0-2.5 2.5v7a2.5 2.5 0 0 0 2.5 2.5h3a2.5 2.5 0 0 0 0-5H18" />
          </svg>
          <DealCounter />
        </li>
      </ul>
    </section>
  );
}

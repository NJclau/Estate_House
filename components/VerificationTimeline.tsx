// components/VerificationTimeline.tsx
// Evidence-based trust component — converts "title verified" claim to proof
// Steps rendered ONLY if data present. Never "pending" or "unknown".
// Mobile: first 2 inline, rest collapsed behind toggle.
//
// Source: Estate2.0 Website Spec Section 4.3.3

"use client";

import { useState } from "react";

interface TimelineData {
  upi: string | null;
  upi_verified_date: string | null;
  price_confirmed_date: string | null;
  verified_date: string | null;
  photo_count: number;
  verified_by_Clement: number | null;
}

interface VerificationTimelineProps {
  data: TimelineData;
}

interface TimelineStep {
  key: string;
  label: string;
  date: string | null;
  detail?: string;
}

export default function VerificationTimeline({ data }: VerificationTimelineProps) {
  const [expanded, setExpanded] = useState(false);

  // Build steps array — only include steps with data
  const steps: TimelineStep[] = [];

  if (data.upi && data.upi_verified_date) {
    steps.push({
      key: "upi",
      label: "UPI title check",
      date: data.upi_verified_date,
      detail: `irembo.gov.rw · UPI: ${data.upi}`,
    });
  }

  if (data.price_confirmed_date) {
    steps.push({
      key: "price",
      label: "Price confirmed with owner",
      date: data.price_confirmed_date,
    });
  }

  if (data.verified_date && data.photo_count > 0) {
    steps.push({
      key: "photos",
      label: `${data.photo_count} photos added`,
      date: data.verified_date,
      detail: "Reviewed by Clement",
    });
  }

  if (data.verified_by_Clement && data.verified_date) {
    steps.push({
      key: "final",
      label: "Final verification by Clement",
      date: data.verified_date,
    });
  }

  if (steps.length === 0) return null;

  // Mobile: show first 2 inline, collapse rest
  const visibleSteps = expanded ? steps : steps.slice(0, 2);
  const hasHiddenSteps = steps.length > 2;

  return (
    <div className="verification-timeline">
      <h2 className="verification-timeline__title">How we verified this property</h2>

      <ol aria-label="How we verified this property">
        {visibleSteps.map((step) => (
          <li key={step.key} className="verification-timeline__step">
            <div className="verification-timeline__marker" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="verification-timeline__content">
              <p className="verification-timeline__label">
                {step.label}
              </p>
              <p className="verification-timeline__date">
                <time
                  dateTime={step.date}
                  aria-label={`Verified ${new Date(step.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}`}
                >
                  {new Date(step.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {step.detail && (
                  <span className="verification-timeline__detail">
                    {" "}
                    · {step.detail}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {hasHiddenSteps && (
        <button
          type="button"
          className="verification-timeline__toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded
            ? "Show fewer steps"
            : `+ Show all verification steps (${steps.length - 2} more)`}
        </button>
      )}
    </div>
  );
}

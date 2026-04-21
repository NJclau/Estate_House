// app/about/page.tsx
// Trust + transparency page — Clement identity + process explanation
// Source: Estate2.0 Website Spec Section 9

import { Metadata } from "next";
import ClementProfile from "@/components/ClementProfile";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppButton from "@/components/WhatsAppButton";
import { waGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About · Clement · EstateClaw Kigali",
  description:
    "Kigali-based real estate agent. Verified listings only. No upfront fees. Commission only.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero" aria-label="Introduction">
        <h1 className="about-hero__headline">
          Real estate in Kigali, handled personally.
        </h1>
        <p className="about-hero__subline">
          I verify listings, confirm pricing, and help you book viewings
          directly.
        </p>
        <WhatsAppButton
          href={waGeneral()}
          label="Message Clement on WhatsApp"
          variant="primary"
          fullWidth={false}
        />
      </section>

      {/* Profile */}
      <section aria-label="Agent profile">
        <ClementProfile />
      </section>

      {/* Process */}
      <section aria-label="How it works">
        <HowItWorks />
      </section>

      {/* Trust reinforcement */}
      <section className="about-trust" aria-label="Our commitments">
        <h2 className="about-trust__title">What you can expect</h2>

        <ul className="about-trust__list" role="list">
          <li className="about-trust__item">
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
            No fake listings
          </li>
          <li className="about-trust__item">
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
            No outdated prices
          </li>
          <li className="about-trust__item">
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Direct communication via WhatsApp
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="about-cta" aria-label="Get started">
        <h2 className="about-cta__title">Start by messaging Clement</h2>
        <WhatsAppButton
          href={waGeneral()}
          label="Message Clement on WhatsApp"
          variant="primary"
          fullWidth={false}
        />
      </section>
    </main>
  );
}

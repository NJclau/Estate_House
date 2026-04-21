// components/Hero.tsx
// Split-screen hero — primary conversion surface
// Desktop: 55% content / 45% Clement photo
// Mobile: stacked, photo ~240px
//
// Source: Estate2.0 Website Spec Section 4.1.1

import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__container">
        {/* LEFT COLUMN — 55% desktop */}
        <div className="hero__content">
          <p className="hero__eyebrow">Kigali Real Estate · Title Verified</p>

          <h1 className="hero__headline">Verified property in Kigali.</h1>

          <p className="hero__subline">
            Title-checked listings. Commission only. Handled by Clement.
          </p>

          <div className="hero__cta">
            <WhatsAppButton
              label="Message Clement on WhatsApp"
              variant="primary"
              fullWidth
            />
          </div>

          <p className="hero__trust">
            Responds within 30 min · 8AM–8PM
          </p>
        </div>

        {/* RIGHT COLUMN — 45% desktop */}
        <div className="hero__image-wrapper">
          <Image
            src="/clement.jpg"
            alt="Clement, Kigali-based real estate agent"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}

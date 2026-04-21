import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialStrip from "@/components/TestimonialStrip";
import PropertyGrid from "@/components/PropertyGrid";
import ReturningBanner from "@/components/ReturningBanner";
import { mockProperties } from "@/lib/mockProperties";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero — split-screen, primary conversion surface */}
      <Hero />

      {/* Section 2: Returning user banner (personalized) */}
      <ReturningBanner />

      {/* Section 3: Trust Bar — verification, process, fees, deal counter */}
      <TrustBar />

      {/* Section 4: Testimonial Strip — social proof */}
      <TestimonialStrip />

      {/* Section 5: Featured Listings — Bento 2fr/1fr grid */}
      <PropertyGrid properties={mockProperties} />
    </>
  );
}

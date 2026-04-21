// components/StickyBottomCTA.tsx
// Fixed bottom bar — hides when Clement sidebar is in viewport
// Uses IntersectionObserver on #clement-sidebar
//
// Source: Estate2.0 Website Spec Section 4.3.5

"use client";

import { useState, useEffect } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { waBookViewing } from "@/lib/whatsapp";

interface StickyBottomCTAProps {
  propertySlug: string;
  propertyTitle: string;
  propertyPrice: string;
}

export default function StickyBottomCTA({
  propertySlug,
  propertyTitle,
  propertyPrice,
}: StickyBottomCTAProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sidebar = document.getElementById("clement-sidebar");
    if (!sidebar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-bottom-cta" role="complementary">
      <WhatsAppButton
        href={waBookViewing(propertySlug, propertyTitle, propertyPrice)}
        label="Book a Viewing — message Clement on WhatsApp"
        variant="primary"
        fullWidth
      />
    </div>
  );
}

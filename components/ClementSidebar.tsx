// components/ClementSidebar.tsx
// Agent sidebar — personal trust signal + viewing CTA
// Desktop: right sidebar | Mobile: bottom section
//
// Source: Estate2.0 Website Spec Section 4.3.4

import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";
import { waBookViewing } from "@/lib/whatsapp";

interface ClementSidebarProps {
  propertySlug: string;
  propertyTitle: string;
  propertyPrice: string;
  verifiedDate: string | null;
}

export default function ClementSidebar({
  propertySlug,
  propertyTitle,
  propertyPrice,
  verifiedDate,
}: ClementSidebarProps) {
  const formattedDate = verifiedDate
    ? new Date(verifiedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <aside
      id="clement-sidebar"
      className="clement-sidebar"
      aria-label="Agent information"
    >
      <div className="clement-sidebar__profile">
        <div className="clement-sidebar__photo">
          <Image
            src="/clement.jpg"
            alt="Clement, Kigali-based real estate agent"
            width={60}
            height={60}
            className="clement-sidebar__avatar"
          />
        </div>
        <div className="clement-sidebar__info">
          <p className="clement-sidebar__name">
            Clement — Kigali-based real estate agent
          </p>
          {formattedDate && (
            <p className="clement-sidebar__verified">
              Verified this listing on {formattedDate}
            </p>
          )}
        </div>
      </div>

      <p className="clement-sidebar__response">
        He&apos;ll confirm a viewing within 30 minutes during business hours
        (8AM–8PM).
      </p>

      <WhatsAppButton
        href={waBookViewing(propertySlug, propertyTitle, propertyPrice)}
        label="Book a Viewing via WhatsApp"
        variant="primary"
        fullWidth
      />
    </aside>
  );
}

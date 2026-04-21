// components/ClementProfile.tsx
// Clement's professional profile — factual, no storytelling
// Source: Estate2.0 Website Spec Section 9

import Image from "next/image";

export default function ClementProfile() {
  return (
    <div className="clement-profile">
      <div className="clement-profile__photo">
        <Image
          src="/clement.jpg"
          alt="Clement, Kigali-based real estate agent"
          width={200}
          height={200}
          className="clement-profile__avatar"
          priority
        />
      </div>

      <div className="clement-profile__info">
        <h2 className="clement-profile__name">Clement</h2>
        <p className="clement-profile__title">Kigali-based real estate agent</p>

        <p className="clement-profile__bio">
          I work directly with property owners to verify listings before they go
          online. Each property is checked for title status, pricing accuracy,
          and availability.
        </p>

        <ul className="clement-profile__claims" role="list">
          <li>Verified listings only</li>
          <li>No upfront fees</li>
          <li>Commission only</li>
        </ul>
      </div>
    </div>
  );
}

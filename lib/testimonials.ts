// lib/testimonials.ts
// Hardcoded testimonials — Clement approves each before display
// Compliance: No last names, no photos per Rwanda Law No. 058/2021
//
// Source: Estate2.0 Website Spec Section 4.1.4

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Clement found us a house in Kicukiro within our budget in just two days. The title verification gave us confidence to proceed.",
    name: "Jean-Baptiste",
    location: "Kicukiro",
    date: "March 2026",
  },
  {
    quote:
      "I was skeptical about buying property online, but the WhatsApp process was smooth. Clement responded within minutes and showed us the property the same day.",
    name: "Marie",
    location: "Remera",
    date: "February 2026",
  },
  {
    quote:
      "No upfront fees meant we could explore options without pressure. Clement handled everything from viewing to closing.",
    name: "Patrick",
    location: "Gasabo",
    date: "January 2026",
  },
];

// components/TestimonialStrip.tsx
// 3-card testimonial strip — static, hardcoded data
// Compliance: No last names, no buyer photos (Rwanda Law No. 058/2021)
// Source: Estate2.0 Website Spec Section 4.1.4

import { testimonials } from "@/lib/testimonials";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  date: string;
}

function TestimonialCard({ quote, name, location, date }: TestimonialCardProps) {
  return (
    <article
      className="testimonial-card"
      aria-label={`Testimonial from ${name} in ${location}`}
    >
      <p className="testimonial-card__quote">{quote}</p>

      <div className="testimonial-card__meta">
        <p className="testimonial-card__author">
          {name} · {location}
        </p>
        <p className="testimonial-card__date">{date}</p>
      </div>

      <p className="testimonial-card__badge">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Verified buyer
      </p>
    </article>
  );
}

export default function TestimonialStrip() {
  return (
    <section className="testimonial-strip" aria-label="Buyer testimonials">
      <div className="testimonial-strip__grid">
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            name={t.name}
            location={t.location}
            date={t.date}
          />
        ))}
      </div>
    </section>
  );
}

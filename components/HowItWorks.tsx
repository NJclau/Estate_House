// components/HowItWorks.tsx
// 6-step process explanation — factual, concise
// Source: Estate2.0 Website Spec Section 9

const STEPS = [
  "Property sourced from owners",
  "Title checked via UPI verification",
  "Price confirmed with owner",
  "Listed on EstateClaw",
  "You message Clement on WhatsApp",
  "Viewing arranged directly",
];

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title">How it works</h2>

      <ol className="how-it-works__list" role="list">
        {STEPS.map((step, i) => (
          <li key={i} className="how-it-works__step">
            <span className="how-it-works__number" aria-hidden="true">
              {i + 1}
            </span>
            <span className="how-it-works__text">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

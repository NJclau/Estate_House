// app/privacy/page.tsx
// Privacy policy compliant with Rwanda Law No. 058/2021
// Language matches actual system behavior — no false claims
//
// Source: Estate2.0 Website Spec Section 9

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · EstateClaw Kigali",
  description:
    "How EstateClaw handles your data. Compliant with Rwanda Law No. 058/2021.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <h1 className="privacy-page__title">Privacy Policy</h1>
      <p className="privacy-page__updated">Last updated: April 2026</p>

      <p className="privacy-page__intro">
        This policy explains how EstateClaw handles information. It is written
        to comply with{" "}
        <strong>Rwanda Law No. 058/2021</strong> on data protection and privacy.
      </p>

      {/* 1. What we collect */}
      <section aria-labelledby="collection-heading">
        <h2 id="collection-heading">1. What we collect</h2>
        <p>
          <strong>We do not require accounts.</strong> You can browse all
          property listings without providing any personal information.
        </p>
        <p>
          The only time you share information is when you contact Clement via
          WhatsApp. WhatsApp messages are handled through your own WhatsApp
          account — we do not operate a separate messaging system.
        </p>
        <p>We do not store:</p>
        <ul>
          <li>Names or contact details on our servers</li>
          <li>Payment information</li>
          <li>Identity documents</li>
        </ul>
      </section>

      {/* 2. Local storage */}
      <section aria-labelledby="storage-heading">
        <h2 id="storage-heading">2. Browser storage</h2>
        <p>
          We use your browser&apos;s local storage to improve your experience.
          This data never leaves your device.
        </p>
        <p>What we store locally:</p>
        <ul>
          <li>Properties you have viewed (last 5)</li>
          <li>Your last filter selections (location, type)</li>
          <li>Whether you are a returning visitor</li>
          <li>Currency preference (RWF or USD)</li>
        </ul>
        <p>
          You can clear this data at any time by clearing your browser&apos;s
          local storage for this website.
        </p>
      </section>

      {/* 3. How we use information */}
      <section aria-labelledby="use-heading">
        <h2 id="use-heading">3. How we use information</h2>
        <p>WhatsApp conversations are used only to:</p>
        <ul>
          <li>Respond to your property inquiries</li>
          <li>Arrange property viewings</li>
          <li>Share relevant listings</li>
        </ul>
        <p>
          We do not use your information for marketing, advertising, or any
          purpose beyond responding to your inquiry.
        </p>
      </section>

      {/* 4. Data sharing */}
      <section aria-labelledby="sharing-heading">
        <h2 id="sharing-heading">4. Data sharing</h2>
        <p>
          We do not sell, rent, or share your personal information with third
          parties. Property owner contact details are only shared when you
          explicitly request a viewing and Clement arranges it.
        </p>
      </section>

      {/* 5. Your rights */}
      <section aria-labelledby="rights-heading">
        <h2 id="rights-heading">5. Your rights</h2>
        <p>Under Rwanda Law No. 058/2021, you have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> — request copies of any data we hold about
            you
          </li>
          <li>
            <strong>Correction</strong> — request inaccurate information be
            corrected
          </li>
          <li>
            <strong>Deletion</strong> — request your data be removed from our
            records
          </li>
          <li>
            <strong>Withdraw consent</strong> — stop us from processing your
            data
          </li>
        </ul>
        <p>
          Since we do not store personal data on our servers, most requests will
          be straightforward. We will respond to all requests within 30 days.
        </p>
      </section>

      {/* 6. Security */}
      <section aria-labelledby="security-heading">
        <h2 id="security-heading">6. Security</h2>
        <p>
          The website does not collect sensitive personal data. WhatsApp
          conversations are protected by WhatsApp&apos;s end-to-end encryption.
          We do not operate a separate database of user accounts or personal
          profiles.
        </p>
      </section>

      {/* 7. Cookies */}
      <section aria-labelledby="cookies-heading">
        <h2 id="cookies-heading">7. Cookies and tracking</h2>
        <p>
          We do not use cookies. We do not use analytics tracking (Google
          Analytics, Meta Pixel, or similar). We do not track you across
          websites.
        </p>
      </section>

      {/* 8. Changes */}
      <section aria-labelledby="changes-heading">
        <h2 id="changes-heading">8. Changes to this policy</h2>
        <p>
          If we change how we handle data, we will update this page. The last
          updated date is shown at the top of this page.
        </p>
      </section>

      {/* 9. Contact */}
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">9. Contact</h2>
        <p>
          For questions about this privacy policy or to exercise your data
          rights, message Clement directly on WhatsApp. He handles all inquiries
          personally.
        </p>
        <p className="privacy-page__contact">
          <a
            href="https://wa.me/250781234567"
            target="_blank"
            rel="noopener noreferrer"
            className="privacy-page__whatsapp"
          >
            Message Clement on WhatsApp
          </a>
        </p>
      </section>
    </main>
  );
}

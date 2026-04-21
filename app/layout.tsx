import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstateClaw · Verified Property in Kigali",
  description:
    "Title-checked listings. Commission only. Handled by Clement. WhatsApp-first real estate agency in Kigali, Rwanda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav aria-label="Main navigation" style={{ display: "none" }}>
          {/* Navigation stub — implemented in Task 2 (Hero) */}
        </nav>

        <main role="main">{children}</main>

        <footer role="contentinfo" className="site-footer">
          <div className="footer-inner">
            <p className="footer-disclosure">
              AI-assisted · All commitments verified by Clement · Not a licensed
              brokerage
            </p>
            <p className="footer-disclaimer">
              Prices and availability verified by Clement at time of listing.
              Verify all details before proceeding.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

// lib/whatsapp.ts
// WhatsApp link generators — synced with Hermes agent conversation flows
// Source: Estate2.0 Website Spec Section 6

const CLEMENT_NUMBER = process.env.CLEMENT_WHATSAPP_NUMBER ?? "250781234567";

/**
 * Flow A: Standard Buyer — greeting language
 * Matches Hermes Flow A Message 1
 */
export function waGeneral(): string {
  const text =
    "Hi Clement, I am looking for property in Kigali. Can you help?";
  return `https://wa.me/${CLEMENT_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Flow A Message 6: Viewing Escalation
 */
export function waBookViewing(
  slug: string,
  title: string,
  price: string
): string {
  const text = `Hi Clement, I'd like to book a viewing for: ${title} at ${price}. When are you available?`;
  return `https://wa.me/${CLEMENT_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Listing inquiry — pre-qualifies with location + price
 */
export function waListingInquiry(
  location: string,
  price: string
): string {
  const text = `Hi Clement, I'm interested in the ${location} property (${price}). Can I get more details?`;
  return `https://wa.me/${CLEMENT_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Empty-state CTA — saves search for notification
 */
export function waSaveSearch(
  location: string,
  type: string,
  priceMax: string
): string {
  const text = `Hi Clement, please notify me when ${type} properties in ${location} under ${priceMax} become available.`;
  return `https://wa.me/${CLEMENT_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Returning buyer with remembered preferences — skips Flow A Messages 1-3
 */
export function waReturningBuyer(
  location: string,
  type: string,
  budget: string
): string {
  const text = `Hi Clement, I'm back — any new ${type} listings in ${location} under ${budget}?`;
  return `https://wa.me/${CLEMENT_NUMBER}?text=${encodeURIComponent(text)}`;
}

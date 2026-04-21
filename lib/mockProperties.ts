// lib/mockProperties.ts
// Placeholder data matching API response shape exactly
// Future compatibility: swap for real /api/properties call
//
// Source: Estate2.0 Website Spec Section 5.1

export interface Property {
  slug: string;
  title: string;
  price: number;
  price_display: string;
  location: string;
  landmark: string;
  type: "house" | "apartment" | "land" | "commercial";
  bedrooms: number;
  bathrooms: number;
  upi: string;
  upi_verified_date: string;
  price_confirmed_date: string;
  verified_date: string;
  verified: boolean;
  photos: string[];
  photo_count: number;
  features: {
    water: string;
    parking: string;
    security: string;
    generator: boolean;
  };
  proximity: string[];
  availability?: "Available" | "Sold" | "Unavailable";
}

export const mockProperties: Property[] = [
  {
    slug: "kicukiro-3bed-house-01",
    title: "3-bedroom house near Nyacyiga Market",
    price: 80000000,
    price_display: "80M RWF",
    location: "Kicukiro",
    landmark: "5 min from Nyacyiga Market",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    upi: "RW-KIC-1234",
    upi_verified_date: "2026-04-01",
    price_confirmed_date: "2026-04-03",
    verified_date: "2026-04-05",
    verified: true,
    photos: ["/photos/kicukiro-3bed-house-01/img_01.jpg"],
    photo_count: 3,
    features: {
      water: "WASAC",
      parking: "2 cars",
      security: "Wall + guard",
      generator: true,
    },
    proximity: ["school", "transport", "market"],
    availability: "Available",
  },
  {
    slug: "remera-2bed-apartment-01",
    title: "2-bedroom apartment near UTC Remera",
    price: 45000000,
    price_display: "45M RWF",
    location: "Remera",
    landmark: "10 min from city centre",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    upi: "RW-REM-5678",
    upi_verified_date: "2026-04-02",
    price_confirmed_date: "2026-04-04",
    verified_date: "2026-04-06",
    verified: true,
    photos: ["/photos/remera-2bed-apartment-01/img_01.jpg"],
    photo_count: 2,
    features: {
      water: "WASAC",
      parking: "1 car",
      security: "Secure compound",
      generator: false,
    },
    proximity: ["school", "transport"],
    availability: "Available",
  },
  {
    slug: "gasabo-plot-land-01",
    title: "Residential plot in Gasabo",
    price: 35000000,
    price_display: "35M RWF",
    location: "Gasabo",
    landmark: "Near Kigali Heights",
    type: "land",
    bedrooms: 0,
    bathrooms: 0,
    upi: "RW-GAS-9012",
    upi_verified_date: "2026-04-03",
    price_confirmed_date: "2026-04-05",
    verified_date: "2026-04-07",
    verified: true,
    photos: ["/photos/gasabo-plot-land-01/img_01.jpg"],
    photo_count: 1,
    features: {
      water: "WASAC nearby",
      parking: "N/A",
      security: "Fence",
      generator: false,
    },
    proximity: ["school"],
    availability: "Available",
  },
];

// Unavailable property for testing sold state
export const mockUnavailableProperty: Property = {
  slug: "nyamirambo-4bed-house-01",
  title: "4-bedroom house in Nyamirambo",
  price: 95000000,
  price_display: "95M RWF",
  location: "Nyamirambo",
  landmark: "Near Nyamirambo Stadium",
  type: "house",
  bedrooms: 4,
  bathrooms: 3,
  upi: "RW-NYA-3456",
  upi_verified_date: "2026-03-15",
  price_confirmed_date: "2026-03-18",
  verified_date: "2026-03-20",
  verified: true,
  photos: ["/photos/nyamirambo-4bed-house-01/img_01.jpg"],
  photo_count: 4,
  features: {
    water: "Borehole",
    parking: "3 cars",
    security: "Wall + guard + camera",
    generator: true,
  },
  proximity: ["school", "transport", "market"],
  availability: "Sold",
};

/**
 * Single source of truth for Tex N Tailor business information.
 *
 * RULE: nothing in this file may be invented. Every value is either
 *   - verified (found in a public source about Tex N Tailor), or
 *   - explicitly marked `VERIFY` and listed in README.md → "Information to confirm".
 * Optional values left as `null` are hidden across the site until filled in.
 */

export const site = {
  name: 'Tex N Tailor',
  legalName: null as string | null, // VERIFY: trade-licence name, used in footer + schema
  url: 'https://texntailor.ae',
  locale: 'en_AE',

  // From texntailor.ae (public search index): "custom suits, wedding attire, and casual outfits…"
  descriptionShort:
    'Custom suits, wedding attire and everyday clothing, measured and made for you in Al Nahda, Dubai.',

  contact: {
    // VERIFY: sourced from a public directory listing; not yet confirmed by the business.
    phoneDisplay: '+971 56 723 7172',
    phoneE164: '+971567237172',
    // VERIFY: assumed to be the same number as the phone line. Change here if different.
    whatsappE164: '971567237172',
    email: null as string | null, // VERIFY: add the business email to show it site-wide
  },

  address: {
    // Verified area: "Deira, Al Nahda 1, Dubai" (public listings).
    // VERIFY: building / street / shop number for the full street address.
    street: null as string | null,
    area: 'Al Nahda 1',
    district: 'Deira',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    // Used for the "Directions" link + map. Replace with the exact Google Maps
    // place link once confirmed (open the listing in Google Maps → Share → Copy link).
    mapsQuery: 'Tex N Tailor, Al Nahda 1, Dubai',
    mapsUrl: null as string | null, // VERIFY: exact Google Maps share link
    geo: null as { lat: number; lng: number } | null, // VERIFY: for schema.org
  },

  // VERIFY: opening hours. Leave empty to hide hours everywhere.
  // Example format: { days: 'Saturday – Thursday', hours: '10:00 – 22:00' }
  hours: [] as { days: string; hours: string }[],

  social: {
    instagram: { handle: '@tex_n_tailor', url: 'https://www.instagram.com/tex_n_tailor/' },
    facebook: null as string | null,
    tiktok: null as string | null,
  },
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.contact.whatsappE164}` +
  (message ? `?text=${encodeURIComponent(message)}` : '');

export const telLink = `tel:${site.contact.phoneE164}`;

export const mapsLink =
  site.address.mapsUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&z=15&output=embed`;

export const addressLine = [site.address.street, site.address.area, site.address.district, site.address.city]
  .filter(Boolean)
  .join(', ');

export const nav = [
  { href: '/tailoring/', label: 'Tailoring' },
  { href: '/process/', label: 'The Process' },
  { href: '/work/', label: 'Our Work' },
  { href: '/contact/', label: 'Visit & Contact' },
];

/**
 * Single source of truth for Tex N Tailor business information.
 *
 * RULE: nothing in this file may be invented. Every value is either
 *   - verified (published by the business on the live texntailor.ae, checked 2026-09-28), or
 *   - explicitly marked `VERIFY` and listed in README.md → "Information to confirm".
 * Optional values left as `null` are hidden across the site until filled in.
 */

export const site = {
  name: 'Tex N Tailor',
  legalName: null as string | null, // VERIFY: trade-licence name, used in footer + schema
  url: 'https://texntailor.ae',
  locale: 'en_AE',

  // Paraphrases the live texntailor.ae: suits, shirts, trousers, linen wear and alterations.
  descriptionShort:
    'Tailor-made suits, shirts, trousers and linen wear, cut to your measurements in Al Nahda 1, Dubai. Alterations too.',

  contact: {
    // Published on texntailor.ae as the phone and WhatsApp number.
    phoneDisplay: '+971 56 723 7172',
    phoneE164: '+971567237172',
    whatsappE164: '971567237172',
    email: null as string | null, // VERIFY: add the business email to show it site-wide
  },

  address: {
    // From the schema.org data on texntailor.ae.
    street: 'Shop 16, A. W. Bin Shabib Twin Tower, 3rd Street' as string | null,
    area: 'Al Nahda 1',
    district: null as string | null,
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    // Used for the "Directions" link + map. Replace with the exact Google Maps
    // place link once confirmed (open the listing in Google Maps → Share → Copy link).
    mapsQuery: 'Tex N Tailor, A. W. Bin Shabib Twin Tower, Al Nahda 1, Dubai',
    mapsUrl: null as string | null, // VERIFY: exact Google Maps share link
    geo: null as { lat: number; lng: number } | null, // VERIFY: for schema.org
  },

  // Published on texntailor.ae. `schemaDays`/`opens`/`closes` feed schema.org.
  hours: [
    { days: 'Saturday – Thursday', hours: '9:00 am – 10:00 pm', schemaDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '22:00' },
    { days: 'Friday', hours: '4:00 pm – 10:00 pm', schemaDays: ['Friday'], opens: '16:00', closes: '22:00' },
  ] as { days: string; hours: string; schemaDays: string[]; opens: string; closes: string }[],

  social: {
    instagram: { handle: '@texntailor', url: 'https://www.instagram.com/texntailor/' },
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

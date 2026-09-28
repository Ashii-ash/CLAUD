# Tex N Tailor — website

A rebuild of [texntailor.ae](https://texntailor.ae): a static, fast, editorial site for a
made-to-measure tailoring studio in Al Nahda 1, Dubai.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the build
```

**Stack:** Astro (static output), hand-written CSS with design tokens, about 7 KB of vanilla JS in total,
self-hosted variable fonts (Bodoni Moda + Jost), Netlify Forms for enquiries. No frameworks,
no trackers, no third-party scripts on page load.

---

## ⚠️ Before launch: information to confirm

The live site and directory listings could not be read directly from the build environment,
so **every business fact lives in [`src/data/site.ts`](src/data/site.ts)** and each unconfirmed
value is marked `VERIFY`. Nothing has been invented. Optional values left as `null` are hidden across the site.

| Item | Current value | Status |
|---|---|---|
| Phone | +971 56 723 7172 | From a public directory listing — **confirm** |
| WhatsApp | same as phone | **Confirm** it is the WhatsApp number |
| Area | Al Nahda 1, Deira, Dubai | From public listings |
| Street / building / shop no. | — | **Needed** |
| Google Maps link / coordinates | search query fallback | **Needed** (exact place link) |
| Opening hours | — | **Needed** (hidden until added) |
| Email | — | **Needed** (hidden until added) |
| Instagram | @tex_n_tailor | Verified |
| Trade-licence / legal name | — | Optional (footer, privacy policy) |
| Logo | typographic placeholder (`Wordmark.astro`) | **Supply official logo** (SVG) |
| Services | Custom suits · Wedding attire · Everyday & casual wear | From texntailor.ae copy. Add others (e.g. shirts, kandura, alterations) **only if offered** |
| Process steps | 6 generic made-to-measure stages | **Confirm** they match how you work (`src/data/content.ts`) |
| Testimonials | none | Add **real** reviews only (section hidden while empty) |

Also confirm: whether the current site sells products online ("free shipping over $50" appears
in its search listing). E-commerce was deliberately left out of this build.

## Photography

There is no real Tex N Tailor photography in this repository, and none was generated or taken from stock.
Every image slot shows a labelled **cloth-texture placeholder** with a shot brief
("Photograph to come — …") that doubles as a shot list for the photographer.

To add a photo:

1. Put the file in `src/assets/photos/` (JPG/PNG, ideally ≥ 2000 px on the long edge).
2. Set `photo: 'filename.jpg'` on the matching slot in `src/data/content.ts`.

The build converts it to responsive AVIF/WebP automatically. Suggested minimum shoot: the hero (tailor measuring a client),
one finished piece and one macro detail per service, the studio front, a fitting, and cloth/swatches.

## Enquiry form

- Netlify Forms, form name `enquiry`. Fields: name*, phone*, email, service*, preferred date,
  contact preference, message, reference image (≤ 5 MB).
- Works without JavaScript (POST → `/contact/thanks/`). With JavaScript it validates inline, shows
  loading, success and error states, and offers "Send via WhatsApp instead" with the details prefilled.
- Spam: honeypot field + Netlify's spam filter.
- **After first deploy:** Netlify → Forms → enable form detection, then add an email notification
  (Forms → Notifications) so enquiries reach the business inbox.
- The form submits only on Netlify hosting. If you host elsewhere, point the `fetch('/')` in
  `EnquiryForm.astro` at another form backend (e.g. Formspree) and update the privacy policy.

## Deployment (Netlify)

Set **Base directory = `texntailor`** (build `npm run build`, publish `dist`); `texntailor/netlify.toml`
covers the rest. Note: the repository-root `netlify.toml` still points at the older `meliz/` project.
Change it or the site's base directory in the Netlify UI when switching over.

## Structure

```
src/
  data/site.ts        business facts (single source of truth)
  data/content.ts     services, process, details, portfolio, testimonials
  components/         Header (+ mobile dialog menu), Footer, WhatsAppFab, EnquiryForm,
                      Visit (click-to-load map), Photo (image/placeholder), Tape, CtaBand …
  layouts/Base.astro  SEO, Open Graph, LocalBusiness JSON-LD, reveal-on-scroll
  pages/              / · /tailoring/ · /process/ · /work/ · /contact/ · /contact/thanks/ · /privacy/ · 404
```

SEO: unique titles and descriptions, canonical URLs, Open Graph and Twitter cards, `ClothingStore`, `Service`
and `HowTo` schema (verified fields only), sitemap and robots.txt.
Accessibility: axe-core clean (WCAG 2 A/AA + best practice) on every page at 390 px and 1366 px,
with a skip link, visible focus states, a native `<dialog>` menu (focus trap, Esc), 44 px+ touch targets,
labelled form errors announced with `aria-live`, and `prefers-reduced-motion` respected.

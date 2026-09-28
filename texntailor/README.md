# Tex N Tailor — website

A rebuild of [texntailor.ae](https://texntailor.ae): a static, fast, editorial site for a
made-to-measure tailoring studio in Al Nahda 1, Dubai.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the build
```

**Stack:** Astro (static output), hand-written CSS with design tokens, self-hosted Poppins,
three.js for real-time 3D, Netlify Forms for enquiries. No frameworks, no trackers, no
third-party scripts on page load.

**Design:** an all-white canvas with no rules or borders. Hierarchy comes from Poppins at
scale, soft grey surfaces, pill controls and space.

**3D** (`src/scripts/atelier3d.ts`, all procedural, no model files):
- Hero: "the gentleman" in a navy suit, standing in front of navy suiting cloth (twill weave, fabric sheen, draping on the GPU), with mother-of-pearl and horn buttons. He breathes and blinks, follows the pointer, and waves on arrival and on click.
- Closing CTA: a turning mother-of-pearl button.
- three.js (~135 KB gzip) loads only when a scene nears the viewport. Rendering pauses off-screen and in background tabs, shows a single still frame with `prefers-reduced-motion`, and falls back to a soft gradient without WebGL. Page JS outside the 3D is about 8 KB.

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
| Logo | typographic placeholder "TEX (N) TAILOR" (`Wordmark.astro`) | **Supply official logo** (SVG) |
| Services | Custom suits · Wedding attire · Everyday & casual wear | From texntailor.ae copy. Add others (e.g. shirts, kandura, alterations) **only if offered** |
| Process steps | 6 generic made-to-measure stages | **Confirm** they match how you work (`src/data/content.ts`) |
| Testimonials | none | Add **real** reviews only (section hidden while empty) |

Also confirm: whether the current site sells products online ("free shipping over $50" appears
in its search listing). E-commerce was deliberately left out of this build.

## Images

The site's images are **3D illustrations rendered for this project**, not photographs and not
stock or AI imagery. They show "the gentleman" (a stylised client, `src/scripts/character.ts`)
in a navy suit, wedding and everyday looks, detail crops (lapel, collar, cuff, trouser break), and still lifes
(buttons, cloth, lining, thread and tape). The homepage calls them a lookbook and says they're illustrations.
The `/work/` portfolio keeps labelled placeholders for **real client photographs**.

- Re-render: in `texntailor/` run `npx vite --port 5199`, then `node tools/render/shoot.mjs [scene …]`.
  Scenes live in `tools/render/studio.ts` and are written to `src/assets/photos/render-*.webp`.
- Add real photos: drop a file into `src/assets/photos/` and set `photo: 'file.jpg'` on the slot in
  `src/data/content.ts`. The build makes responsive AVIF/WebP automatically.

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

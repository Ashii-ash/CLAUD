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

On 2026-09-28 the live **texntailor.ae was read directly**, and the content, services, prices,
opening hours and address below were taken from it. **Every business fact lives in
[`src/data/site.ts`](src/data/site.ts)** and [`src/data/content.ts`](src/data/content.ts);
anything still unconfirmed is marked `VERIFY`. Nothing has been invented, and optional values
left as `null` are hidden across the site.

| Item | Current value | Status |
|---|---|---|
| Phone / WhatsApp | +971 56 723 7172 | From texntailor.ae (shown there as phone **and** WhatsApp) |
| Address | Shop 16, A. W. Bin Shabib Twin Tower, 3rd Street, Al Nahda 1, Dubai | From texntailor.ae schema data |
| Opening hours | Sat–Thu 9:00–22:00 · Fri 16:00–22:00 | From texntailor.ae |
| Google Maps link / coordinates | search query fallback | **Needed** (exact place link, for the map + schema) |
| Email | — | **Needed** (hidden until added) |
| Instagram | @texntailor | From texntailor.ae |
| Trade-licence / legal name | — | Optional (footer, privacy policy) |
| Logo | official woven-T mark, name set in Poppins (`Wordmark.astro`) | Supply the original **SVG** if you have it |
| Services | Suits · Shirts · Trousers · Linen · Alterations | From texntailor.ae |
| Prices | Shirts from AED 120 · Gurkha trousers from AED 160 | From texntailor.ae — **confirm still current** |
| Process steps | the 5 steps published as "How It Works" | From texntailor.ae |
| Testimonials | none | Add **real** reviews only (section hidden while empty) |

Two photographs on the old site (`hero-suit.jpg`, `bespoke-suit.jpg`) are the only real imagery
available. `hero-suit.jpg` is used as `suit-blue-desert.jpg` in the Bespoke Suits section and the
portfolio. **Confirm it shows a Tex N Tailor garment** and that you have the right to use it;
otherwise remove it from `src/data/content.ts`.

Also confirm: whether the business sells products online ("free shipping over $50" appears
in its search listing). E-commerce was deliberately left out of this build.

## Images

Images come from three places, and none of them is AI-generated. Full table in
[`src/assets/photos/CREDITS.md`](src/assets/photos/CREDITS.md).

- **`render-*`** — 3D illustrations rendered for this project: "the gentleman"
  (`src/scripts/character.ts`) in a navy suit, wedding and everyday looks, plus still lifes
  (buttons, cloth, lining, thread and tape). The homepage lookbook says they are illustrations.
- **`stock-*`** — CC0 (public domain) photographs from StockSnap and rawpixel, found through
  Openverse. They carry the craft close-ups in "The details" and the Linen hero. Free for
  commercial use with no attribution required, and none shows an identifiable face.
  **They are stand-ins, not Tex N Tailor's garments or studio** — swap them for the studio's
  own photography when it exists.
- **Business-supplied** — `suit-blue-desert.jpg`, carried over from the old texntailor.ae.

The `/work/` portfolio keeps labelled placeholders for **real client photographs** only; never
put a `render-*` or `stock-*` file there.

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

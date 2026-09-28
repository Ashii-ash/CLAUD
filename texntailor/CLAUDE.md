# Tex N Tailor website — project memory

Rebuild of texntailor.ae for a made-to-measure tailoring studio in Al Nahda 1, Dubai.
Full history of how we got here: [HANDOFF.md](HANDOFF.md).

## Commands (run in `texntailor/`)

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static site → dist/
npm run preview      # serve dist/
npm run export       # build + export/texntailor-home.html (single self-contained homepage)
npx vite --port 5199 # render studio, then: node tools/render/shoot.mjs [scene …]
```

Form backend is chosen at build time: `PUBLIC_FORM_ENDPOINT=<formspree url>`, or `NETLIFY=true`
(Netlify Forms), otherwise the form validates and hands off to WhatsApp prefilled.

## Non-negotiable rules from the client

- **Never invent business facts**: reviews, names, stats, years, awards, partners, hours, prices.
  All facts live in `src/data/site.ts`; unconfirmed ones are marked `VERIFY`, and `null` hides them.
- **No fake functionality.** Every button and link does something real. There is no fake form success.
- **Rendered illustrations are not client work.** The `/work/` portfolio is for real photos only.
  Alt text calls renders "Illustration of …", and the homepage lookbook says they're illustrations.
- **Visual language the client chose:** all-white canvas, **no lines, rules or borders**, **Poppins
  only** (no serif or italic display type), soft grey surfaces (`--soft`), pill buttons, navy
  `#1b2640` as the only accent. It must not look "AI-made": avoid em-dash-heavy copy, gradients,
  glassmorphism and repetitive card grids.
- **3D is a feature the client asked for:** the cloth, the buttons, and the cartoon gentleman in a suit.
- Keep it fast and accessible: axe-clean, 44px+ targets, reduced-motion respected, 3D lazy-loaded.

## Architecture

- Astro static site. `src/pages/` has index, tailoring, process, work, contact (+ thanks), privacy and 404.
- `src/data/site.ts` holds business facts and WhatsApp/tel/maps helpers; `src/data/content.ts` holds
  services, process, details, portfolio, lookbook and testimonials (empty means the section is hidden).
- `src/components/`: Header (native `<dialog>` mobile menu), Footer, WhatsAppFab, EnquiryForm, Visit
  (click-to-load map), Photo (AVIF/WebP from `src/assets/photos`, or a labelled placeholder), Scene3D
  (lazy three.js host), CtaBand, PageIntro, Tape (eyebrow label), Wordmark (temporary text logo).
- `src/scripts/kit.ts` holds shared 3D pieces (studio light, twill bump, lathe buttons, GPU drape shader).
  `character.ts` is the procedural gentleman with outfits and his breathe/blink/gaze/wave logic.
  `atelier3d.ts` mounts the scenes: `mountCloth` (hero: gentleman + cloth + buttons) and `mountButton` (CTA).
- `tools/render/` is the render studio for the site illustrations; `tools/export-single.mjs` does the single-file export.
- Reveal animations clip or scale the child, never the observed element, because a fully clipped
  target never intersects. This was a real bug once.

## Verification habit

After changes: `npm run build`; check pages at 390/820/1366/1920 with Playwright
(Chromium is at `/opt/pw-browsers` in cloud sessions; WebGL needs `--use-angle=swiftshader`);
run axe-core on every page; click-test the form in the relevant backend mode.

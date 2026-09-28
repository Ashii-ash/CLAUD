# Handoff: Tex N Tailor rebuild (chat migration)

This file carries the full context of the original Claude Code on the web session into any
new Claude Code session, local or cloud. Read it with [CLAUDE.md](CLAUDE.md).

- **Repo / branch:** `Ashii-ash/CLAUD`, branch `claude/lucid-darwin-pgt79i`, project folder `texntailor/`
- **Original session:** https://claude.ai/code/session_01SRTj4aAxdeRCE7aajKCD99
- **State at handoff:** everything committed and pushed; builds clean; axe-clean; forms tested.

## 1. The brief (client's words, condensed)

Completely redesign and rebuild texntailor.ae. The reference sites (m2m.ae, vavci.ae, houseoftailors.co)
set the level of premium finish only. Do not copy their design, content or imagery. It must feel
agency-designed, not AI-made. It should communicate craftsmanship, precision, personal service, trust and Dubai.

Requirements:
- A real enquiry form with validation, loading, success and error states, and spam protection.
- A floating WhatsApp button.
- Clickable phone numbers, a location section and a premium footer.
- Designed for mobile first.
- SEO (meta tags, Open Graph, schema, sitemap, robots), accessibility and performance.
- **Never invent business information or claims.**

## 2. What we could and couldn't access

The cloud environment's network policy blocked texntailor.ae, all three reference sites, HiDubai,
Instagram, Unsplash, Pexels, web.archive.org and **api.vercel.com**. Business facts came only from
search-index snippets:

| Fact | Value | Status |
|---|---|---|
| Name | Tex N Tailor ("Texntailor – Dubai's best bespoke tailor") | search index |
| Offer | "custom suits, wedding attire, and casual outfits… business meeting, special occasion, everyday refinement" | search index |
| Area | Deira, Al Nahda 1, Dubai | search index |
| Instagram | @tex_n_tailor | verified |
| Phone / WhatsApp | +971 56 723 7172 | **UNVERIFIED** (directory snippet); used site-wide |
| Street, hours, email, maps link, logo | — | **unknown**, hidden until supplied |
| "Free shipping over $50" in search listing | — | suggests an online store; not rebuilt, ask client |

With `texntailor.ae` and `instagram.com` allowed (locally there's no proxy), a follow-up session should pull
the real copy, photos, testimonials and contact details, and fill in `src/data/site.ts` and `content.ts`.

## 3. Timeline of decisions

1. **Repo inspection.** The repo held an unrelated gifting project (`meliz/`, Next.js) and a calculator,
   both left untouched. The Tex N Tailor site was built fresh in `texntailor/` with Astro (static): minimal JS,
   Netlify Forms for real submissions, self-hosted fonts.
2. **v1 design** (superseded): an ivory/navy editorial look with Bodoni Moda and Jost, tape-measure rules and
   cloth-texture placeholders.
3. **Client rejected v1** as looking "Claude-made". Their direction, which is still current:
   - a full white colour scheme
   - no lines of any kind
   - no serif "Claude signature" type; use **Poppins**
   - **sophisticated 3D**

   We rebuilt the design system accordingly and added procedural three.js: a GPU-draped navy suiting
   cloth with twill bump and sheen, plus mother-of-pearl and horn lathe buttons, in the hero and CTA.
4. **Hosting via Vercel token.** The client pasted two Vercel tokens; `api.vercel.com` is blocked in the
   cloud environment, so nothing was deployed. **Both tokens are in the chat history. The client should
   revoke them** (Vercel → Account Settings → Tokens). Never commit tokens. We made the form host-agnostic
   and added `vercel.json`. The client chose to import the project into Vercel themselves. Steps: import the repo,
   set Root Directory = `texntailor`, set Production Branch = `claude/lucid-darwin-pgt79i` (the repo default branch
   `claude/busy-edison-cFQMR` doesn't contain the site), then redeploy.
5. **"Give me the html file."** Added `npm run export`, which produces `export/texntailor-home.html`: the homepage
   as one file with CSS, fonts, JS, the 3D chunk (loaded from a Blob URL) and images all inlined. It works
   from `file://` with zero network requests. Page links become in-page anchors, and Privacy and Sitemap are
   removed from that file. `export/texntailor-site.zip` holds the full multi-page site (`dist/`).
6. **"Add high-quality images, and a cartoon character in a suit."** No image-generation tool was
   available and the stock photo sites were blocked, so we built **the gentleman** (`character.ts`) in code
   and a **render studio** (`tools/render/`) that produces 11 WebP illustrations: full-length suit, wedding
   and everyday looks; lapel, collar, cuff and trouser-hem crops; and buttons, swatches, lining and studio
   still lifes. In the hero he stands in front of the cloth and waves on load and on click, blinks,
   breathes and follows the pointer. The renders fill the service, detail, process and homepage
   "lookbook" slots, while the `/work/` portfolio keeps placeholders for real client photos.
7. **Hero service tiles** (01 Custom Suits, 02 Wedding Attire, 03 Everyday) now jump to their own homepage
   sections (`#suits`, `#wedding`, `#everyday`), in both the site and the single-file export.

## 3b. Follow-up session, 2026-09-28 (local)

Run locally, where texntailor.ae **is** reachable. The live site was read and the placeholders filled in:

- Services replaced with the business's own five: Bespoke Suits, Tailor-Made Shirts (from AED 120),
  Bespoke Trousers (Gurkha from AED 160), Linen Collection, Alterations. The old three
  (suits / wedding / everyday) are gone; `?service=` values and export anchors follow the new ids.
- Process replaced with the five steps published as "How It Works" (was six generic stages).
- Address, opening hours and Instagram handle (`@texntailor`, not `@tex_n_tailor`) filled in;
  hours now also feed `openingHoursSpecification` in the schema.
- `Wordmark.astro` and the favicon now use the official woven-T mark; `--claret: #880002` from the logo.
- `hero-suit.jpg` from the old site is in as `suit-blue-desert.jpg` (suits section + portfolio). It is
  the only real photograph on the site; the client must confirm it is theirs to use.
- Verified: build clean, axe-clean and no overflow at 390/820/1366/1920 on every page; all 18 internal
  links resolve; the form was click-tested in both modes (WhatsApp handoff, and success + failure against
  a mocked endpoint); the single-file export loads from `file://` with zero network requests.

## 3c. Photography pass, 2026-09-28

Added eight CC0 photographs (StockSnap / rawpixel, found via the Openverse API) so the craft
sections are real photography rather than renders. Unsplash was rejected as a source: its search
sits behind a proof-of-work bot wall, and scraping it would breach their API terms.

- "The details" on the homepage is now six real macro shots. Its sixth term changed from
  **Trouser break** to **Cloth**, because no honest photograph of a trouser break was available
  and cloth is the bigger decision anyway.
- The Linen Collection hero is a real linen weave; the Bespoke Suits inset is a real sleeve macro.
- The process page runs one photographic sequence (swatches → cloth → collar → buttons → cuff),
  replacing the render that used to sit at step 01.
- Every file is licensed CC0 (commercial use, no attribution needed) and none shows an
  identifiable face, so there is no model-release exposure. Provenance and swap-out instructions
  live in `src/assets/photos/CREDITS.md`.
- The homepage lookbook deliberately stays as `render-*` illustrations, still labelled as such,
  and `/work/` still holds placeholders for real client photography.

## 4. Open items and next steps

- [ ] Client to confirm the exact Google Maps place link, an email address, and whether the two prices
      (shirts AED 120, Gurkha trousers AED 160) are current. Edit `src/data/site.ts` / `content.ts`.
- [ ] Client to confirm `suit-blue-desert.jpg` (from the old site) shows their own work.
- [ ] Original logo **SVG** if available (the mark is currently redrawn as inline paths in `Wordmark.astro`).
- [ ] Real photography for `/work/`, and to replace the eight `stock-*` stand-ins (see
      `src/assets/photos/CREDITS.md`). Drop files into `src/assets/photos/` and set `photo:` in `content.ts`.
- [ ] Real testimonials (e.g. Google reviews, with permission). The section appears automatically.
- [ ] Ask whether anything is offered beyond the five services on the old site (e.g. kandura, wedding
      packages), and whether the site should sell online ("free shipping over $50" in its search listing).
- [ ] Deploy: Vercel (steps above) or Netlify (base dir `texntailor`; Forms then work natively; enable
      form notifications). To send enquiries by email on Vercel, set `PUBLIC_FORM_ENDPOINT`.
- [ ] Point texntailor.ae DNS at the new host when the client is ready. This replaces the current site.
- [ ] Optional ideas the client may want: the gentleman in a kandura or with a different skin tone, hair or
      beard, then re-render with `tools/render`; more 3D (process or details sections).

## 5. How to continue in Claude Code

**Locally (CLI):**
```bash
git clone https://github.com/Ashii-ash/CLAUD.git && cd CLAUD
git checkout claude/lucid-darwin-pgt79i
cd texntailor && npm install
claude            # CLAUDE.md loads automatically; say "read HANDOFF.md and continue"
```

**Bring this exact web session to your terminal:** from the repo folder on the same account, run
`claude --teleport` and pick this session, or use "Open in CLI" in the web session's menu.

**Cloud:** start a new session on `Ashii-ash/CLAUD`, branch `claude/lucid-darwin-pgt79i`. If it should
fetch the live site or deploy to Vercel, first allow `texntailor.ae`, `instagram.com` and `api.vercel.com` in
the environment's Network access settings.

/**
 * Editorial content. Services, options, prices and process steps are the ones Tex N Tailor
 * publishes on the live texntailor.ae (checked 2026-09-28). Nothing here is invented.
 *
 * `photo` values are filenames inside src/assets/photos/. While a file is missing
 * the site shows a labelled fabric placeholder carrying the shot brief below.
 *
 * Image provenance, so nothing is passed off as the studio's own work:
 *   render-*  rendered illustrations made for this project (tools/render).
 *   stock-*   CC0 stock photographs (StockSnap / rawpixel) standing in for craft and
 *             cloth details. They are NOT Tex N Tailor garments, clients or premises.
 *             Replace with the studio's own photography. See README "Images".
 *   anything else: supplied by the business.
 * The /work/ portfolio takes real client photographs only, never render-* or stock-*.
 */

export type Weave = 'herringbone' | 'pinstripe' | 'twill' | 'birdseye' | 'linen' | 'check';
export type Tone = 'navy' | 'charcoal' | 'sand' | 'ivory' | 'claret' | 'olive';

export interface PhotoSlot {
  photo?: string; // filename in src/assets/photos (e.g. 'suit-lapel.jpg')
  alt: string; // real alt text for the final photograph
  brief: string; // art direction for the photographer, shown on the placeholder
  weave: Weave;
  tone: Tone;
}

export interface Service {
  id: 'suits' | 'shirts' | 'trousers' | 'linen' | 'alterations';
  formValue: string;
  /** Used in sentences: "Enquire about <term>", "I would like to ask about <term>." */
  enquiryTerm: string;
  occasion: string;
  title: string;
  lede: string;
  body: string[];
  optionsLabel: string;
  decisions: string[];
  price?: string; // only prices the business publishes
  hero: PhotoSlot;
  detail: PhotoSlot;
}

export const services: Service[] = [
  {
    id: 'suits',
    formValue: 'Bespoke suit',
    enquiryTerm: 'a bespoke suit',
    occasion: 'Business, weddings, occasions',
    title: 'Bespoke Suits',
    lede: 'A suit cut to your measurements sits differently from one bought off a rail.',
    body: [
      'Suits for business, weddings, special occasions and everyday wear, made to your measurements. Shoulders that follow yours, a jacket length chosen for your height, sleeves that show the right amount of cuff.',
      'Choose from a wide selection of cloths and colours, then the lapel, lining, buttons and finishing. We will talk you through each decision, or leave you to it.',
    ],
    optionsLabel: 'Styles we make',
    decisions: ['Single-breasted', 'Double-breasted', 'Tuxedos', 'Wedding suits', 'Business suits', 'Linen suits', 'Wool & wool-blend suits'],
    hero: { photo: 'suit-blue-desert.jpg',
      alt: 'A man in a tailored mid-blue two-piece suit buttoning his jacket on an open road outside Dubai',
      brief: 'Finished suit on a client, three-quarter length, studio daylight',
      weave: 'pinstripe',
      tone: 'navy',
    },
    detail: { photo: 'stock-suit-buttons.jpg',
      alt: 'Close-up of the buttons and working buttonholes on the sleeve of a blue suit jacket',
      brief: 'Macro: lapel roll and buttonhole',
      weave: 'herringbone',
      tone: 'navy',
    },
  },
  {
    id: 'shirts',
    formValue: 'Tailor-made shirt',
    enquiryTerm: 'tailor-made shirts',
    occasion: 'Worn more than anything else',
    title: 'Tailor-Made Shirts',
    lede: 'A properly fitted shirt makes a noticeable difference.',
    body: [
      'Collars that sit right with or without a tie, sleeves that end at the wrist, and a body that neither billows nor pulls. You wear shirts more than anything else you own, so the fit shows.',
      'Choose from premium cotton, Italian shirting, Indian shirting, linen and other selected fabrics.',
    ],
    optionsLabel: 'What you choose',
    decisions: ['Collar', 'Cuffs', 'Fit', 'Buttons', 'Placket', 'Pocket', 'Monogram', 'Sleeve length', 'Shirt length'],
    price: 'From AED 120',
    hero: { photo: 'render-collar.webp',
      alt: 'Illustration close-up of a shirt collar and tie under a charcoal jacket',
      brief: 'Finished shirt on a client, collar and placket, soft side light',
      weave: 'linen',
      tone: 'ivory',
    },
    detail: { photo: 'render-cuff.webp',
      alt: 'Illustration close-up of a jacket sleeve showing the shirt cuff',
      brief: 'Macro: cuff and button',
      weave: 'pinstripe',
      tone: 'navy',
    },
  },
  {
    id: 'trousers',
    formValue: 'Bespoke trousers',
    enquiryTerm: 'bespoke trousers',
    occasion: 'Formal to Gurkha',
    title: 'Bespoke Trousers',
    lede: 'Trousers made around your measurements and the fit you prefer.',
    body: [
      'From formal business trousers to contemporary pleated styles, Gurkha trousers and linen trousers. The rise, the seat and the hem are cut for you, not averaged across a size range.',
    ],
    optionsLabel: 'What you choose',
    decisions: ['Waistband', 'Pleats', 'Side adjusters', 'Pockets', 'Finishing'],
    price: 'Gurkha from AED 160',
    hero: { photo: 'render-trousers.webp',
      alt: 'Illustration of trouser hems resting on polished shoes',
      brief: 'Tailored trousers on a client, full length, low angle',
      weave: 'check',
      tone: 'olive',
    },
    detail: { photo: 'render-swatches.webp',
      alt: 'Illustration of folded suiting cloth with a tape measure and chalk',
      brief: 'Macro: waistband and side adjuster',
      weave: 'twill',
      tone: 'charcoal',
    },
  },
  {
    id: 'linen',
    formValue: 'Linen wear',
    enquiryTerm: 'the linen collection',
    occasion: 'Made for the UAE climate',
    title: 'Linen Collection',
    lede: 'Comfort, breathability and relaxed elegance for Dubai weather.',
    body: [
      'Linen breathes in the heat and softens with every wear. We make it in classic neutrals, pastels and deeper contemporary colours.',
      'Order a single piece or a full set: shirts, trousers, jackets and suits, or a matching outfit for smart-casual days.',
    ],
    optionsLabel: 'Available in',
    decisions: ['Linen shirts', 'Linen trousers', 'Linen suits', 'Linen jackets', 'Matching linen sets', 'Smart-casual outfits'],
    hero: { photo: 'stock-linen.jpg',
      alt: 'Close-up of charcoal linen cloth showing the open weave of the fibre',
      brief: 'Client in a linen outfit, outdoors, natural light',
      weave: 'linen',
      tone: 'sand',
    },
    detail: { photo: 'render-swatches.webp',
      alt: 'Illustration of folded cloth with a tape measure and chalk',
      brief: 'Macro: linen texture in three colours',
      weave: 'linen',
      tone: 'ivory',
    },
  },
  {
    id: 'alterations',
    formValue: 'Alterations',
    enquiryTerm: 'alterations',
    occasion: 'For clothes you already own',
    title: 'Alterations',
    lede: 'Already own a garment that doesn’t fit quite right?',
    body: [
      'We improve the fit of suits, jackets, shirts, trousers and formalwear while keeping the original balance and structure of the garment.',
    ],
    optionsLabel: 'We alter',
    decisions: ['Suits', 'Jackets', 'Shirts', 'Trousers', 'Formalwear'],
    hero: { photo: 'render-studio.webp',
      alt: 'Illustration of thread spools, a tape measure and tailor’s chalk on the work table',
      brief: 'Tailor pinning a jacket on a client at a fitting',
      weave: 'twill',
      tone: 'navy',
    },
    detail: { photo: 'render-lining.webp',
      alt: 'Illustration of navy cloth draped to show a claret lining',
      brief: 'Macro: chalk marks on a sleeve',
      weave: 'twill',
      tone: 'claret',
    },
  },
];

/** The business's own five steps, as published on texntailor.ae ("How It Works"). */
export const processSteps = [
  {
    n: '01',
    title: 'Visit us',
    text: 'Come to the boutique in Al Nahda 1, or start the conversation on WhatsApp. Tell us what the garment is for and when you need it.',
  },
  {
    n: '02',
    title: 'Choose your fabric',
    text: 'Browse the collection and choose the material, colour and pattern that suit you.',
  },
  {
    n: '03',
    title: 'Get measured',
    text: 'Our tailoring team takes your measurements and talks through the fit you prefer.',
  },
  {
    n: '04',
    title: 'Customise',
    text: 'Collars, lapels, cuffs, buttons, pockets and finishing. Decide as much or as little as you like.',
  },
  {
    n: '05',
    title: 'Fitting & finishing',
    text: 'You try the garment on. It is adjusted where needed before it is handed over.',
  },
];

export const details: { term: string; text: string; slot: PhotoSlot }[] = [
  {
    term: 'Cloth',
    text: 'The first decision, and the one you feel all day. Weight, weave and colour are chosen for the climate and the occasion.',
    slot: { photo: 'stock-cloth-stripe.jpg', alt: 'Close-up of black and grey striped wool suiting cloth', brief: 'Cloth from your own swatch books, raking light', weave: 'pinstripe', tone: 'charcoal' },
  },
  {
    term: 'Lapel',
    text: 'Notch, peak or shawl; narrow or generous. The lapel sets the character of a jacket more than any other detail.',
    slot: { photo: 'stock-lapel-pocket.jpg', alt: 'Close-up of a blue jacket lapel and breast pocket holding a patterned pocket square, with stitching along the edge', brief: 'Lapel, shot from above on the cutting table', weave: 'herringbone', tone: 'navy' },
  },
  {
    term: 'Collar',
    text: 'The frame for your face. Its spread and height should suit your neck and how you wear a tie, or don’t.',
    slot: { photo: 'stock-collar.jpg', alt: 'Close-up of hands fastening the top button of a white shirt collar', brief: 'Collar on a finished shirt, soft side light', weave: 'linen', tone: 'ivory' },
  },
  {
    term: 'Cuff',
    text: 'Where jacket sleeve meets shirt. A good fit shows a measured line of shirt cuff when your arms are at rest.',
    slot: { photo: 'stock-cuff.jpg', alt: 'Close-up of a hand adjusting the cuff of a black dinner jacket worn over a white shirt', brief: 'Sleeve and cuff line, arm at rest', weave: 'twill', tone: 'charcoal' },
  },
  {
    term: 'Buttons',
    text: 'Small, but seen all day. Material, colour and finish are chosen to suit the cloth.',
    slot: { photo: 'stock-buttons.jpg', alt: 'Close-up of four dark buttons stitched along the sleeve of a black jacket', brief: 'Button selection laid on cloth swatches', weave: 'twill', tone: 'charcoal' },
  },
  {
    term: 'Lining',
    text: 'The part only you see. A chance for a quiet flash of pattern, or simply something cool and comfortable.',
    slot: { photo: 'stock-lining-paisley.jpg', alt: 'Close-up of black and cream paisley-patterned lining cloth', brief: 'Jacket held open to reveal lining', weave: 'twill', tone: 'charcoal' },
  },
];

export type WorkCategory = 'suits' | 'wedding' | 'shirts' | 'details';

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: 'suits', label: 'Suits' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'shirts', label: 'Shirts & linen' },
  { id: 'details', label: 'Details' },
];

/** Portfolio. Replace placeholders with real client work (with client permission). */
export const work: (PhotoSlot & { category: WorkCategory; caption: string; shape: 'tall' | 'wide' | 'square' })[] = [
  // From texntailor.ae. VERIFY that it shows a Tex N Tailor garment before launch.
  { photo: 'suit-blue-desert.jpg', category: 'suits', caption: 'Two-piece suit', shape: 'tall', alt: 'A man in a tailored mid-blue two-piece suit buttoning his jacket on an open road outside Dubai', brief: 'Finished two-piece suit, full length', weave: 'pinstripe', tone: 'navy' },
  { category: 'details', caption: 'Lapel and buttonhole', shape: 'square', alt: 'Lapel and buttonhole detail', brief: 'Macro: lapel and buttonhole', weave: 'herringbone', tone: 'charcoal' },
  { category: 'wedding', caption: 'Wedding suit', shape: 'tall', alt: 'Wedding suit worn by a groom', brief: 'Groom, full length, on the day', weave: 'birdseye', tone: 'ivory' },
  { category: 'shirts', caption: 'Linen outfit', shape: 'wide', alt: 'Tailored linen outfit', brief: 'Linen outfit, half length, outdoors', weave: 'linen', tone: 'sand' },
  { category: 'details', caption: 'Cloth selection', shape: 'square', alt: 'Fabric swatches on the studio table', brief: 'Swatch books open on the studio table', weave: 'check', tone: 'olive' },
  { category: 'suits', caption: 'Fitting', shape: 'wide', alt: 'A client at a fitting', brief: 'Fitting in progress, tailor marking with chalk', weave: 'twill', tone: 'charcoal' },
  { category: 'wedding', caption: 'Ceremony detail', shape: 'square', alt: 'Detail of a wedding suit', brief: 'Detail of embroidery / finishing', weave: 'twill', tone: 'claret' },
  { category: 'shirts', caption: 'Collar and cuff', shape: 'tall', alt: 'Shirt collar and cuff detail', brief: 'Shirt collar and cuff, close crop', weave: 'linen', tone: 'ivory' },
  { category: 'suits', caption: 'Double-breasted jacket', shape: 'square', alt: 'Double-breasted jacket', brief: 'Double-breasted jacket on a client', weave: 'pinstripe', tone: 'charcoal' },
];

/**
 * Testimonials: ONLY real, attributable reviews (e.g. copied from Google reviews with
 * permission). The section is hidden while this list is empty. Never invent entries.
 */
export const testimonials: { quote: string; name: string; source: string }[] = [];

export const swatchSlot: PhotoSlot = {
  photo: 'stock-swatches.jpg',
  alt: 'Close-up of stacked cloth swatches in checks, houndstooth and plain weaves',
  brief: 'The boutique: cloth on the shelves, or the shopfront in Al Nahda 1',
  weave: 'check',
  tone: 'sand',
};

export const studioSlot: PhotoSlot = { photo: 'render-studio.webp',
  alt: 'Illustration of thread spools, a tape measure and tailor’s chalk',
  brief: 'The studio: shopfront or cutting table, wide shot',
  weave: 'twill',
  tone: 'navy',
};

export const heroSlot: PhotoSlot = {
  alt: 'A tailor at Tex N Tailor measuring a client for a custom suit',
  brief: 'Hero: tailor measuring a client at the shoulder, portrait crop',
  weave: 'herringbone',
  tone: 'navy',
};

/** Homepage lookbook: rendered illustrations of the looks we make (not client photographs). */
export const lookbook: (PhotoSlot & { caption: string })[] = [
  { photo: 'render-suit.webp', caption: 'The navy suit', alt: 'Illustration of the gentleman in a navy two-piece suit', brief: '', weave: 'pinstripe', tone: 'navy' },
  { photo: 'render-buttons.webp', caption: 'Buttons', alt: 'Illustration of horn and mother-of-pearl buttons on navy cloth', brief: '', weave: 'herringbone', tone: 'charcoal' },
  { photo: 'render-wedding.webp', caption: 'The wedding look', alt: 'Illustration of the gentleman in an ivory dinner jacket and bow tie', brief: '', weave: 'birdseye', tone: 'ivory' },
  { photo: 'render-swatches.webp', caption: 'Cloth', alt: 'Illustration of folded suiting cloth with a tape measure and chalk', brief: '', weave: 'linen', tone: 'sand' },
  { photo: 'render-trousers.webp', caption: 'The finish', alt: 'Illustration of trouser hems resting on polished shoes', brief: '', weave: 'check', tone: 'olive' },
];

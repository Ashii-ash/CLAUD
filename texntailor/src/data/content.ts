/**
 * Editorial content. Services are limited to what Tex N Tailor publicly offers:
 * "custom suits, wedding attire, and casual outfits … for a business meeting,
 * a special occasion, or everyday refinement" (texntailor.ae).
 *
 * `photo` values are filenames inside src/assets/photos/. While a file is missing
 * the site shows a labelled fabric placeholder carrying the shot brief below.
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
  id: 'suits' | 'wedding' | 'everyday';
  formValue: string;
  index: string;
  occasion: string;
  title: string;
  lede: string;
  body: string[];
  decisions: string[];
  hero: PhotoSlot;
  detail: PhotoSlot;
}

export const services: Service[] = [
  {
    id: 'suits',
    formValue: 'Custom suit',
    index: 'I',
    occasion: 'For the meeting',
    title: 'Custom Suits',
    lede: 'A suit cut to your measurements sits differently from one bought off a rail.',
    body: [
      'Shoulders that follow yours, a jacket length chosen for your height, sleeves that show the right amount of cuff. These are the details a custom suit gets right, because it starts from your measurements instead of a size chart.',
      'Tell us where the suit will be worn, whether that is the boardroom, a client dinner or a week of travel. We will help you choose a cloth and a cut that suit both you and the occasion.',
    ],
    decisions: ['Cloth and colour', 'Single or double-breasted', 'Lapel style and width', 'Buttons and lining', 'Trouser cut and finish'],
    hero: {
      alt: 'A finished navy custom suit by Tex N Tailor, photographed on a client in the studio',
      brief: 'Finished suit on a client, three-quarter length, studio daylight',
      weave: 'pinstripe',
      tone: 'navy',
    },
    detail: {
      alt: 'Close-up of a jacket lapel and buttonhole',
      brief: 'Macro: lapel roll and buttonhole',
      weave: 'herringbone',
      tone: 'charcoal',
    },
  },
  {
    id: 'wedding',
    formValue: 'Wedding attire',
    index: 'II',
    occasion: 'For the occasion',
    title: 'Wedding Attire',
    lede: 'Clothes for the day you will look back on in photographs for years.',
    body: [
      'Wedding clothes carry more weight than anything else in a wardrobe. They have to fit perfectly, photograph well and feel comfortable through a long day and a longer evening.',
      'Start early and bring your plans with you: the date, the setting, the colours. We will talk you through cloth, cut and finishing so the result feels like you on the day it matters most.',
    ],
    decisions: ['The look for the ceremony and the evening', 'Cloth, colour and texture', 'Cut and silhouette', 'Finishing details', 'Timing of fittings around your date'],
    hero: {
      alt: 'Wedding attire tailored by Tex N Tailor, worn by a groom',
      brief: 'Groom in finished wedding attire, full length, warm light',
      weave: 'birdseye',
      tone: 'ivory',
    },
    detail: {
      alt: 'Detail of fabric and finishing on wedding attire',
      brief: 'Detail: cloth texture and finishing on the wedding garment',
      weave: 'twill',
      tone: 'claret',
    },
  },
  {
    id: 'everyday',
    formValue: 'Everyday & casual wear',
    index: 'III',
    occasion: 'For every day',
    title: 'Everyday & Casual Wear',
    lede: 'The clothes you wear most deserve to fit best.',
    body: [
      'Tailoring is not only for formal occasions. The pieces you reach for every week are the ones where a good fit makes the biggest difference.',
      'Bring a favourite garment, a photo of something you like, or simply an idea. We will measure you and make it to fit.',
    ],
    decisions: ['Relaxed or structured fit', 'Cloth for Dubai weather', 'Collars, cuffs and pockets', 'Length and proportion'],
    hero: {
      alt: 'Casual tailored clothing by Tex N Tailor worn in the city',
      brief: 'Client in relaxed tailored clothing, outdoors, natural light',
      weave: 'linen',
      tone: 'sand',
    },
    detail: {
      alt: 'Close-up of a shirt collar and cuff',
      brief: 'Macro: collar and cuff on a casual garment',
      weave: 'check',
      tone: 'olive',
    },
  },
];

/**
 * VERIFY with the business: the stages below describe how made-to-measure tailoring
 * usually works. Adjust wording/number of stages to match Tex N Tailor's actual workflow.
 */
export const processSteps = [
  {
    n: '01',
    title: 'Conversation',
    text: 'What is the garment for, when do you need it, and how do you like your clothes to feel? Everything starts here.',
  },
  {
    n: '02',
    title: 'Measurements',
    text: 'Your measurements are taken in person, along with notes on posture and how you like things to sit.',
  },
  {
    n: '03',
    title: 'Cloth & details',
    text: 'Choose the fabric, then the details: lapels, collars, cuffs, buttons and lining. Guidance is there whenever you want it.',
  },
  {
    n: '04',
    title: 'Cutting & making',
    text: 'The garment is cut to your measurements and sewn by our tailors.',
  },
  {
    n: '05',
    title: 'Fitting',
    text: 'You try it on. Anything that is not right is marked and adjusted.',
  },
  {
    n: '06',
    title: 'Collection',
    text: 'A final check before it is yours to wear.',
  },
];

export const details: { term: string; text: string; slot: PhotoSlot }[] = [
  {
    term: 'Lapel',
    text: 'Notch, peak or shawl; narrow or generous. The lapel sets the character of a jacket more than any other detail.',
    slot: { alt: 'Close-up of a jacket lapel', brief: 'Lapel, shot from above on the cutting table', weave: 'herringbone', tone: 'charcoal' },
  },
  {
    term: 'Collar',
    text: 'The frame for your face. Its spread and height should suit your neck and how you wear a tie, or don’t.',
    slot: { alt: 'Close-up of a shirt collar', brief: 'Collar on a finished shirt, soft side light', weave: 'linen', tone: 'ivory' },
  },
  {
    term: 'Cuff',
    text: 'Where jacket sleeve meets shirt. A good fit shows a measured line of shirt cuff when your arms are at rest.',
    slot: { alt: 'Close-up of a sleeve and cuff', brief: 'Sleeve and cuff line, arm at rest', weave: 'pinstripe', tone: 'navy' },
  },
  {
    term: 'Buttons',
    text: 'Small, but seen all day. Material, colour and finish are chosen to suit the cloth.',
    slot: { alt: 'Selection of suit buttons on fabric', brief: 'Button selection laid on cloth swatches', weave: 'birdseye', tone: 'sand' },
  },
  {
    term: 'Lining',
    text: 'The part only you see. A chance for a quiet flash of colour, or simply something cool and comfortable.',
    slot: { alt: 'Jacket opened to show the lining', brief: 'Jacket held open to reveal lining', weave: 'twill', tone: 'claret' },
  },
  {
    term: 'Trouser break',
    text: 'How the hem meets the shoe. No break, a slight break or a full one, decided at the fitting.',
    slot: { alt: 'Trouser hem resting on a shoe', brief: 'Trouser hem and shoe, low angle', weave: 'check', tone: 'olive' },
  },
];

export type WorkCategory = 'suits' | 'wedding' | 'everyday' | 'details';

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: 'suits', label: 'Suits' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'everyday', label: 'Everyday' },
  { id: 'details', label: 'Details' },
];

/** Portfolio. Replace placeholders with real client work (with client permission). */
export const work: (PhotoSlot & { category: WorkCategory; caption: string; shape: 'tall' | 'wide' | 'square' })[] = [
  { category: 'suits', caption: 'Two-piece suit', shape: 'tall', alt: 'Two-piece custom suit', brief: 'Finished two-piece suit, full length', weave: 'pinstripe', tone: 'navy' },
  { category: 'details', caption: 'Lapel and buttonhole', shape: 'square', alt: 'Lapel and buttonhole detail', brief: 'Macro: lapel and buttonhole', weave: 'herringbone', tone: 'charcoal' },
  { category: 'wedding', caption: 'Wedding attire', shape: 'tall', alt: 'Wedding attire worn by a groom', brief: 'Groom, full length, on the day', weave: 'birdseye', tone: 'ivory' },
  { category: 'everyday', caption: 'Everyday tailoring', shape: 'wide', alt: 'Casual tailored outfit', brief: 'Casual outfit, half length, outdoors', weave: 'linen', tone: 'sand' },
  { category: 'details', caption: 'Cloth selection', shape: 'square', alt: 'Fabric swatches on the studio table', brief: 'Swatch books open on the studio table', weave: 'check', tone: 'olive' },
  { category: 'suits', caption: 'Fitting', shape: 'wide', alt: 'A client at a fitting', brief: 'Fitting in progress, tailor marking with chalk', weave: 'twill', tone: 'charcoal' },
  { category: 'wedding', caption: 'Ceremony detail', shape: 'square', alt: 'Detail of wedding attire', brief: 'Detail of embroidery / finishing', weave: 'twill', tone: 'claret' },
  { category: 'everyday', caption: 'Collar and cuff', shape: 'tall', alt: 'Shirt collar and cuff detail', brief: 'Shirt collar and cuff, close crop', weave: 'linen', tone: 'ivory' },
  { category: 'suits', caption: 'Double-breasted jacket', shape: 'square', alt: 'Double-breasted jacket', brief: 'Double-breasted jacket on a client', weave: 'pinstripe', tone: 'charcoal' },
];

/**
 * Testimonials: ONLY real, attributable reviews (e.g. copied from Google reviews with
 * permission). The section is hidden while this list is empty. Never invent entries.
 */
export const testimonials: { quote: string; name: string; source: string }[] = [];

export const studioSlot: PhotoSlot = {
  alt: 'The Tex N Tailor studio in Al Nahda, Dubai',
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

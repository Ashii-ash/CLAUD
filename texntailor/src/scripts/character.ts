/**
 * "The Gentleman": a stylised, toy-proportioned client in a tailored outfit, modelled
 * procedurally (lathe-turned body, extruded lapels, capsule limbs) so it costs no downloads.
 * Used live in the hero and for the site's rendered illustrations.
 */
import {
  CapsuleGeometry, Color, CylinderGeometry, DoubleSide, ExtrudeGeometry, Group, LatheGeometry,
  Mesh, MeshPhysicalMaterial, Shape, SphereGeometry, TorusGeometry, Vector2, type Material,
} from 'three';
import { twillTexture } from './kit';

export interface Outfit {
  jacket: string | null;          // null = no jacket (shirt only)
  trousers: string;
  shirt: string;
  neckwear: 'tie' | 'bow' | 'none';
  neckwearColor: string;
  shoes: string;
  pocketSquare?: string | null;
  lapelSatin?: boolean;           // silk-faced lapels for evening/wedding wear
  sleeves?: 'long' | 'rolled';
}

export const OUTFITS: Record<string, Outfit> = {
  suit: { jacket: '#1b2640', trousers: '#1b2640', shirt: '#f7f7f5', neckwear: 'tie', neckwearColor: '#7a2230', shoes: '#1a1210', pocketSquare: '#ffffff' },
  wedding: { jacket: '#efe8da', trousers: '#15161a', shirt: '#ffffff', neckwear: 'bow', neckwearColor: '#15161a', shoes: '#0e0e10', pocketSquare: '#7a2230', lapelSatin: true },
  everyday: { jacket: null, trousers: '#b8a888', shirt: '#cdd9ea', neckwear: 'none', neckwearColor: '#000', shoes: '#6b4128', sleeves: 'rolled' },
  charcoal: { jacket: '#34363b', trousers: '#34363b', shirt: '#ffffff', neckwear: 'tie', neckwearColor: '#1b2640', shoes: '#1a1210', pocketSquare: '#ffffff' },
};

const SKIN = '#c98f6b';
const HAIR = '#1d1714';

function cloth(color: string, bump = true, repeat = 6) {
  return new MeshPhysicalMaterial({
    color: new Color(color), roughness: 0.8, sheen: 0.35, sheenRoughness: 0.55,
    sheenColor: new Color(color).lerp(new Color('#ffffff'), 0.25),
    ...(bump ? { bumpMap: twillTexture(repeat, repeat), bumpScale: 0.6 } : {}),
  });
}
const skinMat = () => new MeshPhysicalMaterial({ color: SKIN, roughness: 0.58, sheen: 0.3, sheenColor: new Color('#ffd9c2'), clearcoat: 0.08 });
const gloss = (c: string, r = 0.25) => new MeshPhysicalMaterial({ color: c, roughness: r, clearcoat: 1, clearcoatRoughness: 0.12 });
const silk = (c: string) => new MeshPhysicalMaterial({ color: c, roughness: 0.4, sheen: 0.25, sheenColor: new Color(c).lerp(new Color('#ffffff'), 0.2), clearcoat: 0.15, clearcoatRoughness: 0.35 });

function add(parent: Group, geo: any, mat: Material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) {
  const m = new Mesh(geo, mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function flat(points: [number, number][], depth = 0.02, bevel = 0.012) {
  const sh = new Shape(points.map(([x, y]) => new Vector2(x, y)));
  return new ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 8 });
}

export function createCharacter(outfit: Outfit = OUTFITS.suit) {
  const root = new Group();
  const skin = skinMat();
  const jacketMat = outfit.jacket ? cloth(outfit.jacket) : null;
  const shirtMat = cloth(outfit.shirt, true, 10);
  const trouserMat = cloth(outfit.trousers);
  const shoeMat = gloss(outfit.shoes, 0.3);

  // ---- Legs & shoes
  for (const s of [-1, 1]) {
    add(root, new CapsuleGeometry(0.165, 0.95, 8, 24), trouserMat, s * 0.19, 0.78, 0);
    add(root, new SphereGeometry(0.2, 32, 20), shoeMat, s * 0.2, 0.11, 0.08, 0.92, 0.55, 1.55);
  }

  // ---- Torso: jacket turned on a lathe (shoulders, suppressed waist, skirt), or a shirt
  const torso = new Group();
  root.add(torso);
  const profile = outfit.jacket
    ? [[0.001, 1.02], [0.46, 1.02], [0.48, 1.1], [0.46, 1.25], [0.41, 1.48], [0.44, 1.7], [0.5, 1.92], [0.54, 2.08], [0.5, 2.2], [0.36, 2.28], [0.16, 2.32], [0.001, 2.33]]
    : [[0.001, 1.15], [0.43, 1.15], [0.42, 1.4], [0.44, 1.65], [0.49, 1.9], [0.52, 2.08], [0.48, 2.2], [0.34, 2.28], [0.15, 2.32], [0.001, 2.33]];
  const body = add(torso, new LatheGeometry(profile.map(([r, y]) => new Vector2(r, y)), 64), jacketMat ?? shirtMat, 0, 0, 0, 1, 1, 0.74);
  if (!outfit.jacket) {
    // belt + tucked hem
    add(torso, new CylinderGeometry(0.44, 0.44, 0.07, 64, 1, true), gloss('#3b2518', 0.45), 0, 1.18, 0, 1, 1, 0.74);
    add(torso, new CylinderGeometry(0.05, 0.05, 0.06, 20), gloss('#b9a27a', 0.2), 0, 1.18, 0.33, 1.3, 1, 0.4).rotation.x = Math.PI / 2;
  }

  // Shirt front (the V between the lapels) and neckwear
  const chestZ = 0.37;
  if (outfit.jacket) {
    const bib = add(torso, flat([[-0.2, 0.66], [0.2, 0.66], [0, 0]], 0.01, 0.006), shirtMat, 0, 1.62, chestZ - 0.012);
    bib.rotation.x = -0.11;
    // Lapels: notched shapes framing the V, turned slightly outward
    const lapelMat = outfit.lapelSatin ? silk(outfit.jacket!).clone() : jacketMat!;
    if (outfit.lapelSatin) (lapelMat as MeshPhysicalMaterial).color.offsetHSL(0, 0, -0.04);
    for (const s of [-1, 1]) {
      // point at the top button, broad at the chest, notch below the collar, gorge toward the neck
      const pts: [number, number][] = [[0, 0], [0.22, 0.5], [0.3, 0.56], [0.26, 0.6], [0.29, 0.66], [0.16, 0.7], [0.1, 0.5], [0.02, 0.1]];
      const lapel = add(torso, flat(pts.map(([x, y]) => [s * x, y]) as [number, number][], 0.018, 0.014), lapelMat, 0, 1.6, chestZ + 0.004);
      lapel.rotation.set(-0.12, s * -0.2, 0);
    }
    // Buttons
    for (const y of [1.55, 1.38]) add(torso, new CylinderGeometry(0.035, 0.035, 0.02, 24), gloss('#16110e', 0.3), 0.0, y, 0.33).rotation.x = Math.PI / 2;
    // Hip pocket flaps
    for (const x of [-1, 1]) {
      const flap = add(torso, new CapsuleGeometry(0.03, 0.2, 6, 12), jacketMat!, x * 0.26, 1.22, 0.315, 1, 1, 0.5);
      flap.rotation.set(0, x * 0.55, Math.PI / 2);
    }
    // Pocket square
    if (outfit.pocketSquare) {
      const sq = add(torso, flat([[-0.07, 0], [0.07, 0], [0.05, 0.06], [0.0, 0.1], [-0.04, 0.05]], 0.01, 0.006), silk(outfit.pocketSquare), -0.27, 1.98, 0.33);
      sq.rotation.set(-0.2, 0.35, 0);
      add(torso, new CapsuleGeometry(0.012, 0.15, 4, 8), jacketMat!, -0.27, 1.97, 0.345).rotation.z = Math.PI / 2;
    }
  } else {
    // Open collar + placket for the shirt-only look
    add(torso, new CapsuleGeometry(0.012, 0.6, 4, 8), cloth(outfit.shirt, false), 0, 1.72, chestZ - 0.005, 1, 1, 1).rotation.x = -0.12;
    for (const y of [1.88, 1.7, 1.52]) add(torso, new SphereGeometry(0.018, 12, 8), gloss('#f2efe8', 0.2), 0.0, y, 0.33 + (y - 1.5) * 0.08);
  }
  if (outfit.neckwear === 'tie') {
    const tm = silk(outfit.neckwearColor);
    add(torso, flat([[-0.045, 0], [0.045, 0], [0.035, -0.07], [-0.035, -0.07]], 0.03, 0.015), tm, 0, 2.23, chestZ + 0.02).rotation.x = -0.12;
    const blade = add(torso, flat([[-0.035, 0], [0.035, 0], [0.065, -0.44], [0, -0.51], [-0.065, -0.44]], 0.012, 0.01), tm, 0, 2.16, chestZ + 0.002);
    blade.rotation.x = -0.13;
  } else if (outfit.neckwear === 'bow') {
    const bm = silk(outfit.neckwearColor);
    for (const s of [-1, 1]) add(torso, new SphereGeometry(0.075, 24, 16), bm, s * 0.07, 2.22, chestZ + 0.04, 1.1, 0.7, 0.45);
    add(torso, new SphereGeometry(0.03, 16, 12), bm, 0, 2.22, chestZ + 0.06);
  }

  // Collar & neck
  add(torso, new TorusGeometry(0.15, 0.045, 12, 40), shirtMat, 0, 2.3, 0.02, 1, 1, 0.9).rotation.x = Math.PI / 2 - 0.15;
  if (outfit.neckwear === 'none') {
    for (const s of [-1, 1]) {
      const c = add(torso, flat([[0, 0], [s * 0.14, -0.02], [s * 0.05, -0.15]], 0.012, 0.008), shirtMat, s * 0.06, 2.3, 0.14);
      c.rotation.set(-0.5, 0, s * 0.1);
    }
  } else {
    for (const s of [-1, 1]) {
      const c = add(torso, flat([[0, 0], [s * 0.11, 0.0], [s * 0.04, -0.12]], 0.012, 0.008), shirtMat, s * 0.05, 2.3, 0.15);
      c.rotation.set(-0.35, 0, 0);
    }
  }
  add(torso, new CylinderGeometry(0.12, 0.13, 0.2, 24), skin, 0, 2.38, 0);

  // ---- Arms (shoulder → elbow → hand), pivoted for animation
  const sleeveMat = jacketMat ?? shirtMat;
  const arms = [-1, 1].map((s) => {
    const shoulder = new Group();
    shoulder.position.set(s * 0.52, 2.12, 0);
    shoulder.rotation.z = s * 0.1;
    torso.add(shoulder);
    add(shoulder, new SphereGeometry(0.15, 24, 16), sleeveMat, 0, 0, 0);
    add(shoulder, new CapsuleGeometry(0.135, 0.42, 8, 20), sleeveMat, 0, -0.3, 0);
    const elbow = new Group();
    elbow.position.set(0, -0.55, 0);
    shoulder.add(elbow);
    const rolled = outfit.sleeves === 'rolled';
    add(elbow, new CapsuleGeometry(rolled ? 0.105 : 0.125, 0.38, 8, 20), rolled ? skin : sleeveMat, 0, -0.24, 0);
    if (rolled) add(elbow, new TorusGeometry(0.12, 0.045, 12, 32), shirtMat, 0, 0.0, 0).rotation.x = Math.PI / 2;
    else add(elbow, new CylinderGeometry(0.118, 0.118, 0.07, 28), shirtMat, 0, -0.47, 0);
    const hand = new Group();
    hand.position.set(0, -0.57, 0);
    elbow.add(hand);
    add(hand, new SphereGeometry(0.115, 24, 16), skin, 0, -0.05, 0, 0.85, 1.15, 0.7);
    add(hand, new CapsuleGeometry(0.035, 0.07, 4, 10), skin, s * -0.08, 0.0, 0.04).rotation.z = s * 0.6;
    return { shoulder, elbow, hand, side: s };
  });

  // ---- Head
  const head = new Group();
  head.position.set(0, 2.84, 0);
  root.add(head);
  add(head, new SphereGeometry(0.46, 48, 32), skin, 0, 0, 0, 1, 1.04, 0.95);
  for (const s of [-1, 1]) add(head, new SphereGeometry(0.085, 20, 14), skin, s * 0.45, -0.02, -0.02, 0.6, 1, 0.8);
  add(head, new SphereGeometry(0.06, 20, 14), skin, 0, -0.07, 0.44, 1, 0.9, 0.9);
  // Hair: a swept cap with a soft quiff and short sides
  const hairMat = new MeshPhysicalMaterial({ color: HAIR, roughness: 0.55, sheen: 0.6, sheenColor: new Color('#5a4a40') });
  const cap = add(head, new SphereGeometry(0.475, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.5), hairMat, 0, 0.03, -0.04, 1.02, 1.05, 1.0);
  cap.rotation.x = -0.55;
  // short sides
  for (const s of [-1, 1]) add(head, new SphereGeometry(0.2, 20, 14), hairMat, s * 0.34, 0.12, -0.12, 0.45, 1, 1.1);
  add(head, new CapsuleGeometry(0.12, 0.34, 8, 16), hairMat, 0.06, 0.42, 0.16, 1, 0.85, 0.8).rotation.set(0.35, 0, Math.PI / 2 + 0.2);
  // Eyes with highlights, brows, smile
  const eyes: Mesh[] = [];
  for (const s of [-1, 1]) {
    const e = add(head, new SphereGeometry(0.058, 24, 16), gloss('#141210', 0.1), s * 0.16, 0.05, 0.415, 1, 1.25, 0.6);
    eyes.push(e);
    add(head, new SphereGeometry(0.016, 10, 8), new MeshPhysicalMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.6 }), s * 0.16 + 0.02, 0.08, 0.45);
    add(head, new CapsuleGeometry(0.022, 0.11, 4, 10), hairMat, s * 0.16, 0.2, 0.4).rotation.z = Math.PI / 2 + s * 0.12;
  }
  const mouth = add(head, new TorusGeometry(0.085, 0.014, 10, 32, Math.PI * 0.8), new MeshPhysicalMaterial({ color: '#6b2f28', roughness: 0.6 }), 0, -0.14, 0.425, 1, 0.8, 1);
  mouth.rotation.set(0.35, 0, Math.PI + Math.PI * 0.1);


  // ---- Animation state
  let waveStart = -10;
  const rest = (a: (typeof arms)[number]) => { a.shoulder.rotation.set(0, 0, a.side * 0.1); a.elbow.rotation.set(0, 0, 0); };
  arms.forEach(rest);

  return {
    group: root,
    head,
    arms,
    body,
    wave(t: number) { waveStart = t; },
    /** Pose helpers for stills. */
    pose(p: { leftHandInPocket?: boolean; lookX?: number; lookY?: number; waveAt?: number; tilt?: number }) {
      if (p.leftHandInPocket) {
        const a = arms[1];
        a.shoulder.rotation.set(0.15, 0, 0.28);
        a.elbow.rotation.set(0.35, 0, -0.55);
      }
      head.rotation.set(p.lookY ?? 0, p.lookX ?? 0, p.tilt ?? 0);
      if (p.waveAt !== undefined) {
        const a = arms[0];
        a.shoulder.rotation.set(0, 0, -2.3);
        a.elbow.rotation.set(0, 0, -0.9 + p.waveAt);
      }
    },
    /** Idle life: breathing, blinking, gaze following the pointer, and a friendly wave on cue. */
    update(t: number, ptr: { x: number; y: number }) {
      torso.scale.y = 1 + Math.sin(t * 1.6) * 0.006;
      head.position.y = 2.84 + Math.sin(t * 1.6) * 0.006;
      head.rotation.y += (ptr.x * 0.45 - head.rotation.y) * 0.06;
      head.rotation.x += (ptr.y * 0.18 - head.rotation.x) * 0.06;
      head.rotation.z = Math.sin(t * 0.7) * 0.03;
      const blink = (t % 4.2) < 0.12 ? 0.12 : 1.25;
      eyes.forEach((e) => { e.scale.y += (blink - e.scale.y) * 0.5; });
      root.rotation.y = Math.sin(t * 0.35) * 0.05;
      const w = t - waveStart;
      const a = arms[0];
      if (w >= 0 && w < 2.6) {
        const up = Math.min(1, w / 0.35) * Math.min(1, (2.6 - w) / 0.35);
        a.shoulder.rotation.z = -0.1 + (-2.2) * up;
        a.elbow.rotation.z = (-0.7 + Math.sin(w * 11) * 0.35) * up;
      } else {
        a.shoulder.rotation.z += (-0.1 - a.shoulder.rotation.z) * 0.1;
        a.elbow.rotation.z += (0 - a.elbow.rotation.z) * 0.1;
      }
    },
  };
}

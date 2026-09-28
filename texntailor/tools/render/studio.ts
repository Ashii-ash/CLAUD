/**
 * Render studio for the site's illustrations. Serve with `npx vite` from texntailor/, open
 * /tools/render/?scene=<name>&w=<px>&h=<px>; tools/render/shoot.mjs captures every scene
 * into src/assets/photos/. Everything is procedural: no stock or AI imagery.
 */
import {
  ACESFilmicToneMapping, AmbientLight, CanvasTexture, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera,
  PlaneGeometry, RepeatWrapping, Scene, ShadowMaterial, SphereGeometry, SRGBColorSpace, TorusGeometry,
  Vector3, WebGLRenderer, BoxGeometry, CapsuleGeometry,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { studio, twillTexture, makeButton, pearl, horn, holeMat, applyDrape } from '../../src/scripts/kit';
import { createCharacter, OUTFITS } from '../../src/scripts/character';

const q = new URLSearchParams(location.search);
const W = +(q.get('w') ?? 1600), H = +(q.get('h') ?? 2000);
const name = q.get('scene') ?? 'suit';

const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new Scene();
studio(renderer, scene);
(scene as any).environmentIntensity = 0.55;
const camera = new PerspectiveCamera(30, W / H, 0.1, 100);

/** Seamless paper backdrop: a vertical gradient, plus a floor that only catches shadow. */
function backdrop(top: string, bottom: string) {
  const c = document.createElement('canvas'); c.width = 4; c.height = 512;
  const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, top); gr.addColorStop(1, bottom);
  g.fillStyle = gr; g.fillRect(0, 0, 4, 512);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
  scene.background = t;
  const floor = new Mesh(new PlaneGeometry(60, 60), new ShadowMaterial({ opacity: 0.22 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  return floor;
}

function lights(intensity = 3.2, from = new Vector3(3, 7, 5)) {
  const key = new DirectionalLight('#fff6ea', intensity);
  key.position.copy(from); key.castShadow = true;
  key.shadow.mapSize.set(4096, 4096); key.shadow.radius = 10; key.shadow.blurSamples = 24; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  const s = key.shadow.camera; s.left = -6; s.right = 6; s.top = 6; s.bottom = -6; s.near = 0.5; s.far = 30;
  scene.add(key);
  const rim = new DirectionalLight('#dfe8ff', 0.8); rim.position.set(-4, 5, -4); scene.add(rim);
  scene.add(new AmbientLight('#ffffff', 0.15));
}

function shadows(o: Group | Mesh) { o.traverse((m: any) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); }

function look(pos: [number, number, number], target: [number, number, number], fov = 30) {
  camera.fov = fov; camera.position.set(...pos); camera.lookAt(...target); camera.updateProjectionMatrix();
}

/** A folded length of cloth as a softly rounded slab. */
function folded(color: string, w = 1.6, h = 0.16, d = 1.1) {
  const m = new MeshPhysicalMaterial({ color, roughness: 0.85, sheen: 0.9, sheenRoughness: 0.45, sheenColor: new Color(color).lerp(new Color('#fff'), 0.45), bumpMap: twillTexture(8, 6), bumpScale: 0.8 });
  const mesh = new Mesh(new RoundedBoxGeometry(w, h, d, 6, 0.07), m); shadows(mesh); return mesh;
}

function spool(color: string) {
  const g = new Group();
  const wood = new MeshStandardMaterial({ color: '#c9a77c', roughness: 0.6 });
  const thread = new MeshPhysicalMaterial({ color, roughness: 0.6, sheen: 1, sheenColor: new Color(color).lerp(new Color('#fff'), 0.5), bumpMap: (() => { const t = twillTexture(1, 40); return t; })(), bumpScale: 0.6 });
  for (const y of [-0.34, 0.34]) { const r = new Mesh(new CylinderGeometry(0.3, 0.3, 0.07, 48), wood); r.position.y = y; g.add(r); }
  g.add(new Mesh(new CylinderGeometry(0.24, 0.24, 0.62, 48), thread));
  shadows(g); return g;
}

function tapeMeasure() {
  const g = new Group();
  const tape = new MeshPhysicalMaterial({ color: '#e8c64a', roughness: 0.45, clearcoat: 0.5 });
  for (let i = 0; i < 7; i++) { const t = new Mesh(new TorusGeometry(0.34 + i * 0.022, 0.012, 8, 64), tape); t.rotation.x = Math.PI / 2; t.scale.z = 6; t.position.y = 0.02; g.add(t); }
  const strip = new Mesh(new BoxGeometry(1.8, 0.012, 0.13), tape); strip.position.set(1.2, 0.01, 0.42); strip.rotation.y = -0.12; g.add(strip);
  shadows(g); return g;
}

function chalk() {
  const m = new Mesh(new CylinderGeometry(0.34, 0.34, 0.07, 3), new MeshStandardMaterial({ color: '#e9e4f0', roughness: 0.95 }));
  shadows(m); return m;
}

function drapeSheet(front: string, back: string, w = 3, h = 4, time = 2.2) {
  const g = new Group(); const u = { uTime: { value: time } };
  for (const [c, side] of [[front, 0], [back, 1]] as const) {
    const m = new MeshPhysicalMaterial({ color: c, roughness: 0.8, sheen: 1, sheenRoughness: side ? 0.3 : 0.45, sheenColor: new Color(c).lerp(new Color('#fff'), 0.5), bumpMap: twillTexture(10, 13), bumpScale: side ? 0.3 : 1.1, side: side ? 1 : 0 });
    applyDrape(m, u);
    const mesh = new Mesh(new PlaneGeometry(w, h, 180, 240), m); mesh.castShadow = true; g.add(mesh);
  }
  return g;
}

const scenes: Record<string, () => void> = {
  // --- The gentleman, full length
  suit() {
    backdrop('#eceae6', '#d9d4cc'); lights();
    const c = createCharacter(OUTFITS.suit); c.pose({ leftHandInPocket: true, lookX: 0.25, tilt: 0.04 });
    c.group.rotation.y = -0.35; shadows(c.group); scene.add(c.group);
    look([2.1, 2.0, 6.7], [0, 1.62, 0], 30);
  },
  wedding() {
    backdrop('#f1ece6', '#dcd1c6'); lights(2.1);
    const c = createCharacter(OUTFITS.wedding); c.pose({ lookX: -0.2, tilt: -0.03 });
    c.group.rotation.y = 0.3; shadows(c.group); scene.add(c.group);
    const petal = new MeshPhysicalMaterial({ color: '#e9c9c9', roughness: 0.5, sheen: 1, side: DoubleSide });
    for (let i = 0; i < 14; i++) { const p = new Mesh(new SphereGeometry(0.06, 12, 8), petal); p.scale.set(1, 0.18, 0.7); p.position.set(Math.sin(i * 2.4) * 1.6, 0.01, 0.6 + Math.cos(i * 1.7) * 0.9); p.rotation.y = i; p.castShadow = true; scene.add(p); }
    look([-1.9, 2.0, 6.7], [0, 1.62, 0], 30);
  },
  everyday() {
    backdrop('#e7ebe4', '#cfd6cb'); lights(2.3, new Vector3(-4, 7, 5));
    const c = createCharacter(OUTFITS.everyday); c.pose({ leftHandInPocket: true, lookX: -0.35 });
    c.group.position.x = -1.25; c.group.rotation.y = 0.45; shadows(c.group); scene.add(c.group);
    const stack = new Group(); [['#b8a888', 0], ['#cdd9ea', 1], ['#6b7a5a', 2], ['#f2eee6', 3]].forEach(([col, i]) => { const f = folded(col as string, 1.4, 0.15, 1.0); f.position.y = 0.08 + (i as number) * 0.16; f.rotation.y = (i as number) * 0.07; stack.add(f); });
    stack.position.set(1.55, 0, 0.3); stack.rotation.y = -0.4; scene.add(stack);
    const s = spool('#7a2230'); s.position.set(1.95, 0.72, 0.4); scene.add(s);
    look([0.1, 1.75, 7.6], [0.05, 1.6, 0], 30);
  },
  // --- Close crops of the gentleman
  lapel() {
    backdrop('#e9e6e1', '#d8d2c9'); lights(2.0);
    const c = createCharacter(OUTFITS.suit); c.pose({ lookX: 0.35, lookY: -0.05 }); c.group.rotation.y = -0.45; shadows(c.group); scene.add(c.group);
    look([1.0, 2.1, 2.5], [0, 1.95, 0], 34);
  },
  collar() {
    backdrop('#edeae4', '#dcd6cd'); lights(2.0);
    const c = createCharacter(OUTFITS.charcoal); c.pose({ lookX: -0.2, lookY: 0.08, tilt: 0.05 }); c.group.rotation.y = 0.25; shadows(c.group); scene.add(c.group);
    look([-0.6, 2.6, 2.3], [0, 2.45, 0], 34);
  },
  cuff() {
    backdrop('#e8e6e2', '#d6d0c7'); lights(2.2);
    const c = createCharacter(OUTFITS.suit); c.group.rotation.y = -0.3; shadows(c.group); scene.add(c.group);
    c.arms[0].shoulder.rotation.set(-0.35, 0, -0.1); c.arms[0].elbow.rotation.set(-0.9, 0, 0);
    look([-1.25, 1.6, 1.7], [-0.5, 1.35, 0.25], 34);
  },
  trousers() {
    backdrop('#ebe8e3', '#d7d0c6'); lights(2.2);
    const c = createCharacter(OUTFITS.charcoal); c.group.rotation.y = -0.5; shadows(c.group); scene.add(c.group);
    look([1.2, 0.55, 2.8], [0, 0.45, 0], 32);
  },
  // --- Still lifes
  buttons() {
    backdrop('#1b2640', '#141c30'); lights(2.4, new Vector3(2, 8, 3));
    const cloth = new Mesh(new PlaneGeometry(12, 12, 1, 1), new MeshPhysicalMaterial({ color: '#1b2640', roughness: 0.85, sheen: 1, sheenRoughness: 0.4, sheenColor: new Color('#8ea3d6'), bumpMap: twillTexture(40, 40), bumpScale: 1.4 }));
    cloth.rotation.x = -Math.PI / 2; cloth.receiveShadow = true; scene.add(cloth);
    const hm = holeMat();
    [[0, 0, 0.5, pearl()], [0.9, 0.3, 0.36, horn()], [-0.75, 0.55, 0.3, pearl()], [0.35, -0.85, 0.28, horn()], [-0.5, -0.6, 0.24, pearl()]].forEach(([x, z, r, m]) => {
      const b = makeButton(m as any, hm, r as number); b.rotation.set(-Math.PI / 2 + 0.05, 0, 0); b.children[0].rotation.x = 0; b.rotation.x = 0;
      b.position.set(x as number, 0.02, z as number); b.rotation.y = (x as number) * 2; shadows(b); scene.add(b);
    });
    const s = spool('#efe8da'); s.rotation.z = Math.PI / 2; s.position.set(-1.4, 0.3, -0.6); s.rotation.y = 0.5; scene.add(s);
    look([0.2, 4.2, 2.4], [0, 0, -0.1], 30);
  },
  swatches() {
    backdrop('#f1efeb', '#e1ddd6'); lights(2.3);
    const cols = ['#1b2640', '#34363b', '#6b7a5a', '#b8a888', '#efe8da', '#7a2230'];
    cols.forEach((col, i) => { const f = folded(col, 1.9, 0.17, 1.3); f.position.set(0, 0.09 + i * 0.18, 0); f.rotation.y = Math.sin(i * 1.7) * 0.12; scene.add(f); });
    const t = tapeMeasure(); t.position.set(1.4, 0, 1.2); t.rotation.y = 0.6; scene.add(t);
    const ch = chalk(); ch.position.set(-1.5, 0.04, 1.1); ch.rotation.y = 0.4; scene.add(ch);
    look([3.2, 3.2, 4.6], [0, 0.55, 0], 30);
  },
  lining() {
    backdrop('#f0ede8', '#ddd6cc'); lights(2.2, new Vector3(-3, 6, 6));
    const d = drapeSheet('#1b2640', '#7a2230', 3, 4, 3.4); d.rotation.set(-0.12, 2.1, 0.05); d.position.set(0, 2.2, 0); scene.add(d);
    const hm = holeMat(); const b = makeButton(horn(), hm, 0.3); b.position.set(1.4, 0.05, 1.2); b.rotation.x = -1.2; shadows(b); scene.add(b);
    look([0, 2.1, 7.5], [0, 2.0, 0], 32);
  },
  studio() {
    backdrop('#eeebe6', '#d9d3ca'); lights(2.3);
    const colors = ['#1b2640', '#7a2230', '#efe8da', '#6b7a5a', '#34363b'];
    colors.forEach((c, i) => { const s = spool(c); s.position.set(-1.6 + i * 0.75, 0.38, Math.sin(i * 2.1) * 0.3); scene.add(s); });
    const t = tapeMeasure(); t.position.set(0.5, 0, 1.3); t.rotation.y = -0.4; scene.add(t);
    const f = folded('#1b2640', 2.4, 0.18, 1.2); f.position.set(0, 0.09, -1.4); scene.add(f);
    const ch = chalk(); ch.position.set(-1.3, 0.04, 1.3); scene.add(ch);
    look([0, 2.6, 5.6], [0, 0.4, 0], 30);
  },
};

(scenes[name] ?? scenes.suit)();
requestAnimationFrame(() => { renderer.render(scene, camera); requestAnimationFrame(() => { renderer.render(scene, camera); (window as any).__done = true; }); });

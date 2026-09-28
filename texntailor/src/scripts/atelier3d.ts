/**
 * Real-time 3D for the site, built procedurally (no model files, no textures to download):
 *  - mountCloth: a length of navy suiting cloth, draping in a slow breeze, with a woven
 *    twill surface and fabric sheen, accompanied by suit buttons.
 *  - mountButton: a single large mother-of-pearl button turning under studio light.
 * Both pause when off-screen or in a background tab and render one still frame
 * when the visitor prefers reduced motion.
 */
import {
  ACESFilmicToneMapping, CanvasTexture, CylinderGeometry, DoubleSide, Group, LatheGeometry,
  Mesh, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry,
  PMREMGenerator, RepeatWrapping, Scene, SRGBColorSpace, Vector2, WebGLRenderer, Color,
  type Material,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

function makeRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0xffffff, 0);
  return renderer;
}

function studio(renderer: WebGLRenderer, scene: Scene) {
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
}

/** Twill weave as a bump map: diagonal ribs with slight irregularity, like worsted wool. */
function twillTexture() {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d')!;
  g.fillStyle = '#808080';
  g.fillRect(0, 0, s, s);
  const step = 8;
  for (let i = -s; i < s * 2; i += step) {
    const shade = 150 + Math.round(Math.random() * 40);
    g.strokeStyle = `rgb(${shade},${shade},${shade})`;
    g.lineWidth = step * 0.55;
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i + s, s);
    g.stroke();
  }
  for (let n = 0; n < 1800; n++) {
    const v = Math.round(Math.random() * 255);
    g.fillStyle = `rgba(${v},${v},${v},0.08)`;
    g.fillRect(Math.random() * s, Math.random() * s, 1, 2);
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(10, 13);
  t.anisotropy = 4;
  return t;
}

/** A four-hole suit button turned on a lathe: raised rim, dished centre. */
function makeButton(material: Material, holeMaterial: Material, radius = 0.32) {
  const r = radius;
  const pts = [
    [0, 0.016], [r * 0.5, 0.02], [r * 0.66, 0.03], [r * 0.78, 0.052], [r * 0.9, 0.062],
    [r * 0.97, 0.05], [r, 0.028], [r * 0.985, 0.006], [r * 0.9, 0], [0, 0],
  ].map(([x, y]) => new Vector2(x, y));
  const group = new Group();
  const body = new Mesh(new LatheGeometry(pts, 96), material);
  group.add(body);
  const holeGeo = new CylinderGeometry(r * 0.085, r * 0.085, 0.012, 24);
  const o = r * 0.2;
  for (const [x, z] of [[o, o], [-o, o], [o, -o], [-o, -o]]) {
    const h = new Mesh(holeGeo, holeMaterial);
    h.position.set(x, 0.013, z);
    group.add(h);
  }
  group.rotation.x = Math.PI / 2;
  const holder = new Group();
  holder.add(group);
  return holder;
}

const pearl = () => new MeshPhysicalMaterial({
  color: new Color('#f3efe8'), roughness: 0.16, metalness: 0,
  clearcoat: 1, clearcoatRoughness: 0.08,
  iridescence: 1, iridescenceIOR: 1.5, iridescenceThicknessRange: [180, 620],
  sheen: 0.4, sheenColor: new Color('#ffffff'),
});
const horn = () => new MeshPhysicalMaterial({
  color: new Color('#2e2019'), roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15,
});
const holeMat = () => new MeshStandardMaterial({ color: '#141414', roughness: 0.9 });

/** Drive a render loop only while the canvas is visible. */
function loop(canvas: HTMLCanvasElement, frame: (t: number) => void) {
  let raf = 0;
  let visible = false;
  const start = performance.now();
  const tick = () => {
    frame((performance.now() - start) / 1000);
    raf = requestAnimationFrame(tick);
  };
  const play = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  if (reduced()) { frame(4); return; }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
}

function fit(canvas: HTMLCanvasElement, renderer: WebGLRenderer, camera: PerspectiveCamera, onResize?: (aspect: number) => void) {
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    onResize?.(w / h);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();
}

function pointer(target: HTMLElement) {
  const p = { x: 0, y: 0 };
  target.addEventListener('pointermove', (e) => {
    const r = target.getBoundingClientRect();
    p.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    p.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  }, { passive: true });
  target.addEventListener('pointerleave', () => { p.x = 0; p.y = 0; });
  return p;
}

export function mountCloth(canvas: HTMLCanvasElement) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  studio(renderer, scene);
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  const rig = new Group();
  scene.add(rig);

  // Cloth: displacement and normals computed on the GPU, so it costs almost nothing per frame.
  const uniforms = { uTime: { value: 0 } };
  const cloth = new MeshPhysicalMaterial({
    color: new Color('#131b2e'), roughness: 0.86, metalness: 0,
    sheen: 1, sheenRoughness: 0.35, sheenColor: new Color('#8ea3d6'),
    bumpMap: twillTexture(), bumpScale: 1.2, side: DoubleSide,
  });
  cloth.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    const fn = /* glsl */ `
      uniform float uTime;
      float drape(vec2 p) {
        float t = uTime;
        float hang = smoothstep(2.4, -2.4, p.y);            // pinned along the top, free at the hem
        float wobble = sin(p.y * 0.9 - t * 0.35) * 0.5;
        float folds = 0.34 * sin(p.x * 2.4 + wobble + t * 0.45)
                    + 0.15 * sin(p.x * 5.1 - p.y * 0.35 - t * 0.6)
                    + 0.05 * sin(p.x * 11.0 + p.y * 0.8 + t * 0.8);
        float billow = 0.28 * sin(p.y * 1.3 - t * 0.5) * hang;
        return folds * mix(0.35, 1.35, hang) + billow;
      }`;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${fn}`)
      .replace('#include <beginnormal_vertex>', `
        float e = 0.01;
        float dx = (drape(position.xy + vec2(e, 0.0)) - drape(position.xy - vec2(e, 0.0))) / (2.0 * e);
        float dy = (drape(position.xy + vec2(0.0, e)) - drape(position.xy - vec2(0.0, e))) / (2.0 * e);
        vec3 objectNormal = normalize(vec3(-dx, -dy, 1.0));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`)
      .replace('#include <begin_vertex>', `
        vec3 transformed = vec3(position);
        transformed.z += drape(position.xy);
        transformed.x += 0.08 * sin(position.y * 1.5 + uTime * 0.45) * smoothstep(2.4, -2.4, position.y);`);
  };
  const clothMesh = new Mesh(new PlaneGeometry(3.1, 4.5, 180, 240), cloth);
  clothMesh.rotation.set(-0.1, -0.55, -0.16);
  clothMesh.position.set(0.15, -0.1, 0);
  rig.add(clothMesh);

  const holes = holeMat();
  const buttons = [
    { m: makeButton(pearl(), holes, 0.34), p: [-1.55, 1.25, 1.2], s: 1.0, sp: 0.35 },
    { m: makeButton(horn(), holes, 0.3), p: [1.45, -1.05, 1.5], s: 1.0, sp: -0.28 },
    { m: makeButton(pearl(), holes, 0.22), p: [1.25, 1.75, 0.6], s: 1.0, sp: 0.5 },
  ];
  buttons.forEach((b) => { b.m.position.set(...(b.p as [number, number, number])); rig.add(b.m); });

  fit(canvas, renderer, camera, (aspect) => {
    // Keep the whole composition in frame on tall (mobile) canvases.
    camera.position.z = aspect < 0.8 ? 11.5 : aspect < 1.1 ? 10 : 9;
  });

  const ptr = pointer(canvas.parentElement ?? canvas);
  let rx = 0, ry = 0;
  loop(canvas, (t) => {
    uniforms.uTime.value = t;
    rx += (ptr.y * 0.12 - rx) * 0.04;
    ry += (ptr.x * 0.18 - ry) * 0.04;
    rig.rotation.set(rx, ry, 0);
    buttons.forEach((b, i) => {
      b.m.rotation.y = t * b.sp + i;
      b.m.rotation.x = Math.sin(t * 0.4 + i) * 0.35;
      b.m.position.y = b.p[1] + Math.sin(t * 0.6 + i * 2) * 0.08;
    });
    renderer.render(scene, camera);
  });
}

export function mountButton(canvas: HTMLCanvasElement) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  studio(renderer, scene);
  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0, 4.2);
  const button = makeButton(pearl(), holeMat(), 0.72);
  const small = makeButton(horn(), holeMat(), 0.26);
  small.position.set(0.72, -0.52, 0.5);
  scene.add(button, small);
  fit(canvas, renderer, camera);
  const ptr = pointer(canvas.parentElement ?? canvas);
  loop(canvas, (t) => {
    button.rotation.y = -0.45 + Math.sin(t * 0.5) * 0.35 + ptr.x * 0.3;
    button.rotation.x = 0.55 + Math.cos(t * 0.4) * 0.2 + ptr.y * 0.2;
    small.rotation.y = -t * 0.6;
    small.rotation.x = 0.6 + Math.sin(t * 0.5) * 0.3;
    small.position.y = -0.52 + Math.sin(t * 0.7) * 0.06;
    renderer.render(scene, camera);
  });
}

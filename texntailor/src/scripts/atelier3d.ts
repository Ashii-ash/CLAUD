/**
 * Real-time 3D for the site, built procedurally (no model files, no textures to download):
 *  - the hero also features "the gentleman" (see character.ts), waving and following the pointer.
 *  - mountCloth: a length of navy suiting cloth, draping in a slow breeze, with a woven
 *    twill surface and fabric sheen, accompanied by suit buttons.
 *  - mountButton: a single large mother-of-pearl button turning under studio light.
 * Both pause when off-screen or in a background tab and render one still frame
 * when the visitor prefers reduced motion.
 */
import {
  ACESFilmicToneMapping, DoubleSide, Group, Mesh, MeshPhysicalMaterial, PerspectiveCamera,
  PlaneGeometry, Scene, SRGBColorSpace, WebGLRenderer, Color,
} from 'three';
import { studio, twillTexture, makeButton, pearl, horn, holeMat, applyDrape } from './kit';
import { createCharacter, OUTFITS } from './character';
import { CanvasTexture, DirectionalLight } from 'three';

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
  applyDrape(cloth, uniforms);
  const clothMesh = new Mesh(new PlaneGeometry(3.1, 4.5, 180, 240), cloth);
  clothMesh.rotation.set(-0.1, -0.55, -0.16);
  clothMesh.position.set(1.0, -0.2, -1.1);
  rig.add(clothMesh);

  // The gentleman: stands in front of the cloth, follows the pointer, waves hello.
  const guy = createCharacter(OUTFITS.suit);
  guy.group.scale.setScalar(1.0);
  guy.group.position.set(-0.55, -2.35, 0.9);
  guy.group.rotation.y = 0.18;
  rig.add(guy.group);
  const key = new DirectionalLight('#fff5e8', 0.9);
  key.position.set(3, 5, 6);
  scene.add(key);
  // Soft contact shadow under his feet
  const sc = document.createElement('canvas'); sc.width = sc.height = 128;
  const g = sc.getContext('2d')!; const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(17,17,19,0.38)'); gr.addColorStop(1, 'rgba(17,17,19,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const shadow = new Mesh(new PlaneGeometry(2.2, 1.1), new MeshPhysicalMaterial({ map: new CanvasTexture(sc), transparent: true, depthWrite: false, roughness: 1 }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(-0.55, -2.34, 0.95);
  rig.add(shadow);
  (scene as any).environmentIntensity = 0.62;

  const holes = holeMat();
  const buttons = [
    { m: makeButton(pearl(), holes, 0.3), p: [-1.9, 1.2, 0.4], s: 1.0, sp: 0.35 },
    { m: makeButton(horn(), holes, 0.28), p: [1.75, -1.35, 1.2], s: 1.0, sp: -0.28 },
    { m: makeButton(pearl(), holes, 0.2), p: [1.75, 1.35, 0.4], s: 1.0, sp: 0.5 },
  ];
  buttons.forEach((b) => { b.m.position.set(...(b.p as [number, number, number])); rig.add(b.m); });

  fit(canvas, renderer, camera, (aspect) => {
    // Keep the whole composition in frame on tall (mobile) canvases.
    camera.position.z = aspect < 0.8 ? 12 : aspect < 1.1 ? 10.5 : 9.5;
    // on wide layouts the service tiles overlap the bottom of the stage: lift the scene clear
    rig.position.y = aspect < 0.8 ? 0 : 0.45;
  });

  const ptr = pointer((canvas.closest('section') as HTMLElement) ?? canvas);
  let rx = 0, ry = 0, clock = 0;
  guy.wave(0.9);
  canvas.addEventListener('click', () => guy.wave(clock));
  loop(canvas, (t) => {
    clock = t;
    uniforms.uTime.value = t;
    rx += (ptr.y * 0.06 - rx) * 0.04;
    ry += (ptr.x * 0.12 - ry) * 0.04;
    rig.rotation.set(rx, ry, 0);
    // gaze toward the pointer (the canvas sits right of the copy, so bias left)
    guy.update(t, { x: ptr.x * 0.9 - 0.25, y: ptr.y });
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

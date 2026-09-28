/** Shared procedural 3D building blocks: studio light, woven cloth, suit buttons, materials. */
import {
  CanvasTexture, CylinderGeometry, Group, LatheGeometry, Mesh, MeshPhysicalMaterial,
  MeshStandardMaterial, PMREMGenerator, RepeatWrapping, Scene, Vector2, WebGLRenderer, Color,
  type Material,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function studio(renderer: WebGLRenderer, scene: Scene) {
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
}

/** Twill weave as a bump map: diagonal ribs with slight irregularity, like worsted wool. */
export function twillTexture(repeatX = 10, repeatY = 13) {
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
  t.repeat.set(repeatX, repeatY);
  t.anisotropy = 4;
  return t;
}

/** A four-hole suit button turned on a lathe: raised rim, dished centre. */
export function makeButton(material: Material, holeMaterial: Material, radius = 0.32) {
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

export const pearl = () => new MeshPhysicalMaterial({
  color: new Color('#f3efe8'), roughness: 0.16, metalness: 0,
  clearcoat: 1, clearcoatRoughness: 0.08,
  iridescence: 1, iridescenceIOR: 1.5, iridescenceThicknessRange: [180, 620],
  sheen: 0.4, sheenColor: new Color('#ffffff'),
});
export const horn = () => new MeshPhysicalMaterial({
  color: new Color('#2e2019'), roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15,
});
export const holeMat = () => new MeshStandardMaterial({ color: '#141414', roughness: 0.9 });

/** GPU drape: displaces a plane like cloth hanging from its top edge, with analytic-ish normals. */
export function applyDrape(material: MeshPhysicalMaterial, uniforms: { uTime: { value: number } }) {
  material.onBeforeCompile = (shader) => {
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
}

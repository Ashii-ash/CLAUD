// Captures render-studio scenes to src/assets/photos/. Usage: node tools/render/shoot.mjs [scene ...]
// Needs `npx vite --port 5199` running in texntailor/.
import sharp from 'sharp';
import fs from 'fs';
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const all = { suit: [1600, 2000], wedding: [1600, 2000], everyday: [2400, 1030], lapel: [1600, 2000], collar: [1600, 2000], cuff: [1600, 2000], trousers: [1600, 2000], buttons: [1800, 1800], swatches: [1800, 1500], lining: [1600, 2000], studio: [2100, 1400] };
const pick = process.argv.slice(2); const list = pick.length ? pick : Object.keys(all);
const out = process.env.OUT || 'src/assets/photos';
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const s of list) {
  const [w, h] = all[s];
  const p = await b.newPage({ viewport: { width: w, height: h } }); p.setDefaultTimeout(300000);
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:5199/tools/render/index.html?scene=${s}&w=${w}&h=${h}`);
  await p.waitForFunction(() => window.__done === true);
  const png = `${out}/render-${s}.png`;
  await p.locator('canvas').screenshot({ path: png });
  await sharp(png).webp({ quality: 90, effort: 5 }).toFile(png.replace('.png', '.webp'));
  fs.unlinkSync(png);
  console.log(s, errs.length ? errs : 'ok');
  await p.close();
}
await b.close();

// Builds export/texntailor-home.html: the homepage as ONE self-contained file (CSS, fonts,
// scripts and the 3D chunk inlined; links point to on-page sections). Run: npm run export
import fs from 'fs';
const D = 'dist', A = `${D}/_astro/`;
let html = fs.readFileSync(`${D}/index.html`, 'utf8');
const b64 = (f) => fs.readFileSync(f).toString('base64');

// 1. Stylesheets inline, fonts as data URIs (woff2 only; drop the woff fallback).
html = html.replace(/<link rel="stylesheet" href="\/_astro\/([^"]+)">/g, (_, f) => {
  let css = fs.readFileSync(A + f, 'utf8');
  css = css.replace(/url\(\/_astro\/([^)]+\.woff2)\)\s*format\("woff2"\)(,\s*url\(\/_astro\/[^)]+\.woff\)\s*format\("woff"\))?/g,
    (_, w) => `url(data:font/woff2;base64,${b64(A + w)}) format("woff2")`);
  return `<style>${css}</style>`;
});

// 2. External module scripts inline; the 3D chunk becomes an embedded Blob module.
const chunk = fs.readdirSync(A).find((f) => f.startsWith('atelier3d.'));
html = html.replace(/<script type="module" src="\/_astro\/([^"]+)"><\/script>/g, (_, f) => {
  let js = fs.readFileSync(A + f, 'utf8');
  js = js.replace('import(`./' + chunk + '`)',
    'import(URL.createObjectURL(new Blob([atob(document.getElementById("tnt-3d").textContent)],{type:"text/javascript"})))');
  return `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`;
});
html = html.replace('</body>', `<script type="text/plain" id="tnt-3d">${b64(A + chunk)}</script></body>`);

// 3. Favicon inline.
html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${b64(D + '/favicon.svg')}"`)
           .replace(/<link rel="apple-touch-icon"[^>]*>/, '').replace(/<link rel="sitemap"[^>]*>/, '');

// 4. Single page: section anchors instead of other pages.
html = html.replace('<section class="hero"', '<section id="top" class="hero"')
  .replace('<section class="make"', '<section id="make" class="make"')
  .replace('<section class="proc section"', '<section id="process" class="proc section"')
  .replace('<section class="work section"', '<section id="work" class="work section"');
const map = [[/href="\/tailoring\/[^"]*"/g, 'href="#make"'], [/href="\/process\/"/g, 'href="#process"'],
  [/href="\/work\/"/g, 'href="#work"'], [/href="\/contact\/[^"]*"/g, 'href="#visit"'], [/href="\/"/g, 'href="#top"']];
for (const [re, to] of map) html = html.replace(re, to);
html = html.replace(/<li[^>]*><a href="\/privacy\/"[^>]*>Privacy Policy<\/a><\/li>/g, "").replace(/<li[^>]*><a href="\/sitemap-index.xml"[^>]*>Sitemap<\/a><\/li>/g, "");

const left = html.match(/(href|src)="\/(?!\/)[^"]*"/g);
if (left) console.log('remaining root-relative refs:', [...new Set(left)]);
fs.mkdirSync('export', { recursive: true });
fs.writeFileSync('export/texntailor-home.html', html);
console.log('size', (html.length / 1024).toFixed(0) + ' KB');

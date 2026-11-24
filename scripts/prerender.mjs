// Writes one static HTML file per route (and 404.html) from the SSR build, then a sitemap.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const dist = path.join(root, 'dist');
const { render, paths } = await import(path.join(root, 'dist-ssr', 'entry-server.js'));
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const ORIGIN = process.env.SITE_ORIGIN ?? 'https://math.vananomad.com';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(p, { html, title, description }) {
  let out = template.replace('<!--app-->', html).replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`);
  if (description) out = out.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(description)}"`);
  const head = p ? `<link rel="canonical" href="${ORIGIN}${p}" />` : '<meta name="robots" content="noindex" />';
  return out.replace('<!--head-->', head);
}

for (const p of paths) {
  const file = p === '/' ? path.join(dist, 'index.html') : path.join(dist, p.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(p, render(p)));
}
await writeFile(path.join(dist, '404.html'), page(null, render(null)));
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${ORIGIN}${p}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${paths.length} pages + 404`);

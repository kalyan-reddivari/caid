// Writes a real HTML file for every public page after `vite build`, plus sitemap.xml and robots.txt.
// Run by `npm run build`. The employee portal is not prerendered: it is served from dist/app.html.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, head, PUBLIC_ROUTES, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');

if (!template.includes('<!--head:start-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--head:start--> marker or an empty <div id="root"></div>.');
}

const page = (url, html) => template
  .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, head(url))
  .replace('<div id="root"></div>', `<div id="root" data-prerendered="${url}">${html}</div>`);

// The untouched single-page shell, for the portal and any path that is not prerendered.
await writeFile(join(dist, 'app.html'), template.replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, head('/__app').replace(/<link rel="canonical"[^>]*>/, '')));

for (const url of PUBLIC_ROUTES) {
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(url, render(url)));
  console.log(`prerendered ${url}`);
}

const notFound = '/404';
await writeFile(join(dist, '404.html'), page(notFound, render(notFound)).replace(` data-prerendered="${notFound}"`, ''));

const today = new Date().toISOString().slice(0, 10);
const urls = PUBLIC_ROUTES.map((u) => `  <url><loc>${SITE.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /portal\nDisallow: /login\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`wrote sitemap.xml and robots.txt for ${SITE.url}`);

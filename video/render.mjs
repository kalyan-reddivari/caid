// Renders every composition to the site's public/media folder as MP4 (H.264) and WebM (VP9), plus a
// poster frame. Run `npm run render` here, or `npm run render -- agent-request` for one video.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia, renderStill } from '@remotion/renderer';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '../public/media');
const only = process.argv.slice(2);
// Use a local Chrome Headless Shell when one is set (REMOTION_BROWSER), otherwise Remotion's own.
const browserExecutable = process.env.REMOTION_BROWSER || null;
const POSTER_FRAME = { 'agent-request': 470, 'tradewire-flow': 490, 'delivery-demo': 505 };

const serveUrl = await bundle({ entryPoint: path.join(here, 'src/index.jsx'), publicDir: path.join(here, 'public') });
const comps = (await getCompositions(serveUrl, { browserExecutable })).filter((c) => !only.length || only.includes(c.id));

for (const composition of comps) {
  const base = path.join(outDir, composition.id);
  console.log(`rendering ${composition.id}`);
  await renderMedia({ serveUrl, composition, browserExecutable, codec: 'h264', crf: 26, outputLocation: `${base}.mp4`, muted: true, pixelFormat: 'yuv420p' });
  await renderMedia({ serveUrl, composition, browserExecutable, codec: 'vp9', crf: 36, outputLocation: `${base}.webm`, muted: true });
  await renderStill({ serveUrl, composition, browserExecutable, frame: POSTER_FRAME[composition.id] ?? 0, output: `${base}-poster.jpg`, imageFormat: 'jpeg', jpegQuality: 82 });
}
console.log('done');

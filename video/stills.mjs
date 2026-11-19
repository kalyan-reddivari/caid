// Quick check: renders a few frames of each composition to out/ as JPEGs.
//   node stills.mjs [composition-id …]
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';

const here = path.dirname(fileURLToPath(import.meta.url));
const only = process.argv.slice(2);
const browserExecutable = process.env.REMOTION_BROWSER || null;
const FRAMES = [60, 180, 300, 400, 500];

const serveUrl = await bundle({ entryPoint: path.join(here, 'src/index.jsx'), publicDir: path.join(here, 'public') });
const comps = (await getCompositions(serveUrl, { browserExecutable })).filter((c) => !only.length || only.includes(c.id));
for (const composition of comps) {
  for (const frame of FRAMES) {
    await renderStill({ serveUrl, composition, browserExecutable, frame, output: path.join(here, 'out', `${composition.id}-${frame}.jpg`), imageFormat: 'jpeg', jpegQuality: 70 });
  }
  console.log('stills', composition.id);
}

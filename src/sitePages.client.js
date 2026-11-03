// Public pages, each in its own chunk, so a visitor downloads only the page they open.
// The prerendered HTML stays on screen while a page's chunk loads; the rest are fetched when the browser is idle.
import { lazy } from 'react';

const loaders = [];
function page(load, pick = (m) => m.default) {
  let promise;
  const get = () => (promise ||= load().then((m) => ({ default: pick(m) })));
  loaders.push(get);
  return lazy(get);
}

export const Home = page(() => import('./pages/site/Home.jsx'));
export const Services = page(() => import('./pages/site/Services.jsx'));
export const AIAdoption = page(() => import('./pages/site/AIAdoption.jsx'));
export const AIEngineering = page(() => import('./pages/site/AIEngineering.jsx'));
export const Process = page(() => import('./pages/site/Process.jsx'));
export const AcademyOverview = page(() => import('./pages/site/academy/Overview.jsx'));
export const AcademyPaths = page(() => import('./pages/site/academy/Paths.jsx'));
export const AcademyCertifications = page(() => import('./pages/site/academy/Certifications.jsx'));
export const AcademyResources = page(() => import('./pages/site/academy/Resources.jsx'));
export const AcademyTeam = page(() => import('./pages/site/academy/Team.jsx'));
export const Products = page(() => import('./pages/site/Products.jsx'));
export const Platform = page(() => import('./pages/site/Platform.jsx'));
export const About = page(() => import('./pages/site/About.jsx'));
export const Careers = page(() => import('./pages/site/Careers.jsx'));
export const Contact = page(() => import('./pages/site/Contact.jsx'));
export const Privacy = page(() => import('./pages/site/Legal.jsx'), (m) => m.Privacy);
export const Terms = page(() => import('./pages/site/Legal.jsx'), (m) => m.Terms);

export function preloadAll() {
  const run = () => loaders.forEach((get) => get().catch(() => {}));
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2000);
}

// Public pages, imported directly. Used only by the build-time prerender (see vite.config.js).
export { default as Home } from './pages/site/Home.jsx';
export { default as Services } from './pages/site/Services.jsx';
export { default as AIAdoption } from './pages/site/AIAdoption.jsx';
export { default as AIEngineering } from './pages/site/AIEngineering.jsx';
export { default as Process } from './pages/site/Process.jsx';
export { default as Academy } from './pages/site/Academy.jsx';
export { default as Products } from './pages/site/Products.jsx';
export { default as Platform } from './pages/site/Platform.jsx';
export { default as About } from './pages/site/About.jsx';
export { default as Careers } from './pages/site/Careers.jsx';
export { default as Contact } from './pages/site/Contact.jsx';
export { Privacy, Terms } from './pages/site/Legal.jsx';

export const preloadAll = () => {};

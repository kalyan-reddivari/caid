import { useEffect, useRef, useState } from 'react';
import DotTerrain from './DotTerrain.jsx';
import NetworkGlobe from './NetworkGlobe.jsx';

// WebGL (three.js) versions of the hero globe and the page-hero backdrop. The prerendered page and
// visitors without WebGL, with reduced motion, or on small screens keep the Canvas 2D drawings; three.js
// loads on demand in the browser, so it never weighs on pages that do not use it.

function canUseWebGL(minWidth) {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (minWidth && window.innerWidth < minWidth) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

function useThreeScene(load, minWidth) {
  const ref = useRef(null);
  const [state, setState] = useState('fallback'); // fallback → loading → ready
  useEffect(() => {
    if (!canUseWebGL(minWidth)) return undefined;
    let cleanup = null;
    let cancelled = false;
    setState('loading');
    load().then((mount) => {
      if (cancelled || !ref.current) return;
      try {
        cleanup = mount(ref.current, { onReady: () => setState('ready') });
        setState((s) => (s === 'loading' ? 'ready' : s));
      } catch (e) {
        setState('fallback');
      }
    }).catch(() => setState('fallback'));
    return () => { cancelled = true; cleanup?.(); };
  }, [load, minWidth]);
  return [ref, state];
}

const loadGlobe = () => import('./three/GlobeScene.js').then((m) => m.mountGlobe);
const loadField = () => import('./three/NodeFieldScene.js').then((m) => m.mountNodeField);

export function GlobeHero() {
  const [ref, state] = useThreeScene(loadGlobe, 760);
  return (
    <div ref={ref} className={`globe-host is-${state}`} role="img"
      aria-label="A turning globe of business systems such as SAP, Salesforce and Workday, all connected through the CAID {Ai} core">
      {state !== 'ready' && <NetworkGlobe />}
    </div>
  );
}

export function NodeFieldBackdrop() {
  const [ref, state] = useThreeScene(loadField, 900);
  return (
    <div ref={ref} className={`node-field is-${state}`} aria-hidden="true">
      {state !== 'ready' && <DotTerrain />}
    </div>
  );
}

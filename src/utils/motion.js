// Pointer-driven motion for the public site, set up once for the whole page:
//   - cards and illustrations tilt toward the pointer in 3D, with a soft glare
//   - dark sections, call-to-action bands and the footer carry a spotlight that follows the pointer
// It only writes CSS variables; styles.css does the drawing. Off for touch-only devices and reduced motion.

const TILT = '.feature-card, .case-card, .team-card, .model, .showcase-art, .page-hero .hero-art, .page-hero .code-card, .contact-option, .gov-grid > article';
const SPOT = '.section-ink, .cta-band, .site-footer';
const MAX = 7; // degrees

export function installMotion() {
  if (typeof window === 'undefined') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !finePointer) return;

  let current = null;
  let frame = 0;
  let last = null;

  const reset = (el) => {
    el.classList.remove('tilt-on');
    el.style.removeProperty('--rx');
    el.style.removeProperty('--ry');
  };

  const update = () => {
    frame = 0;
    const e = last;
    if (!e) return;
    const card = e.target.closest?.(TILT);
    if (current && current !== card) { reset(current); current = null; }
    if (card) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      card.classList.add('tilt-on');
      current = card;
    }
    const band = e.target.closest?.(SPOT);
    if (band) {
      const r = band.getBoundingClientRect();
      band.style.setProperty('--mx', `${e.clientX - r.left}px`);
      band.style.setProperty('--my', `${e.clientY - r.top}px`);
      band.classList.add('spot-on');
    }
  };

  document.addEventListener('pointermove', (e) => {
    last = e;
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });

  document.addEventListener('pointerout', (e) => {
    const band = e.target.closest?.(SPOT);
    if (band && !band.contains(e.relatedTarget)) band.classList.remove('spot-on');
    if (current && !current.contains(e.relatedTarget)) { reset(current); current = null; }
  }, { passive: true });
}

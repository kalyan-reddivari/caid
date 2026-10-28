import { useEffect } from 'react';

// Runs draw(ctx, state) on a canvas every frame while it is on screen and the tab is visible.
// Sizes the canvas to its box (capped pixel ratio, for speed) and, for visitors who ask for
// reduced motion, draws a single still frame instead of animating.
export default function useCanvasLoop(ref, setup) {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const state = { w: 0, h: 0, dpr: 1, t: 0, px: 0, py: 0, inside: false };
    const draw = setup(state);
    let raf = 0;
    let last = 0;
    let visible = false;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      state.w = r.width;
      state.h = r.height;
      canvas.width = Math.max(1, Math.round(r.width * state.dpr));
      canvas.height = Math.max(1, Math.round(r.height * state.dpr));
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      if (reduced || !visible) draw(ctx, 0);
    };

    const frame = (now) => {
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      state.t += dt;
      draw(ctx, dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && !reduced && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect();
      state.px = ((e.clientX - r.left) / r.width) * 2 - 1;
      state.py = ((e.clientY - r.top) / r.height) * 2 - 1;
      state.inside = Math.abs(state.px) <= 1.2 && Math.abs(state.py) <= 1.2;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pointermove', onPointer, { passive: true });
    resize();
    if (reduced) draw(ctx, 0);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [ref, setup]);
}

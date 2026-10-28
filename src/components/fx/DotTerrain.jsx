import { useCallback, useRef } from 'react';
import useCanvasLoop from './useCanvasLoop.js';

// Page header backdrop: a field of dots in 3D perspective that rolls like a slow sea,
// with a ripple that follows the pointer. Sits behind the header content.

export default function DotTerrain({ tone = 'light' }) {
  const ref = useRef(null);

  const setup = useCallback((state) => {
    const COLS = 46;
    const ROWS = 20;
    const dot = tone === 'dark' ? [210, 225, 245] : [20, 33, 61];
    let mx = 0;
    let my = 0;
    return (ctx) => {
      const { w, h, t } = state;
      ctx.clearRect(0, 0, w, h);
      mx += ((state.inside ? state.px : 0) - mx) * 0.05;
      my += ((state.inside ? state.py : 0) - my) * 0.05;
      const time = t * 0.0006;
      const horizon = h * 0.18;
      const f = 1.6;
      for (let r = 0; r < ROWS; r += 1) {
        const depth = r / (ROWS - 1); // 0 far, 1 near
        const z = 4 - depth * 3.2;
        const s = f / z;
        for (let c = 0; c < COLS; c += 1) {
          const u = c / (COLS - 1) - 0.5;
          const xw = u * 9;
          const dx = u * 2 - mx;
          const dy = depth * 2 - 1 - my;
          const ripple = Math.exp(-(dx * dx + dy * dy) * 3) * Math.sin(time * 6 - Math.sqrt(dx * dx + dy * dy) * 9) * 0.35;
          const yw = Math.sin(xw * 0.7 + time * 2) * 0.22 + Math.cos(z * 1.3 - time * 1.4) * 0.22 + ripple;
          const sx = w / 2 + xw * s * (w / 6);
          const sy = horizon + (1.2 - yw) * s * (h * 0.36);
          if (sx < -10 || sx > w + 10 || sy > h + 10) continue;
          const a = 0.05 + depth * 0.32;
          const lift = Math.max(0, yw);
          ctx.fillStyle = lift > 0.36 && (c + r) % 5 === 0
            ? `rgba(240,169,59,${a + 0.25})`
            : `rgba(${dot[0]},${dot[1]},${dot[2]},${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.6 + depth * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
  }, [tone]);

  useCanvasLoop(ref, setup);
  return <canvas ref={ref} className="dot-terrain" aria-hidden="true" />;
}

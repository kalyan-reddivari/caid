import { useEffect, useRef, useState } from 'react';

// A number that counts up from zero the first time it scrolls into view. The prerendered page and
// reduced motion show the final number; so does a number that is already on screen when the page loads.
export default function CountUp({ value, duration = 900 }) {
  const [shown, setShown] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return undefined;

    let frame = 0;
    setShown(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setShown(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); setShown(value); };
  }, [value, duration]);

  return <span ref={ref} className="count-up">{shown}</span>;
}

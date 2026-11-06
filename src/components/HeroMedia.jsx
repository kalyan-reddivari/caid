import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './Graphics.jsx';

// Decorative hero visual from public/media: a muted looping video when one is set, otherwise a still.
// With reduced motion only the still shows. If the files fail to load, `fallback` (the drawn illustration) shows.
//
//   <HeroMedia still="/media/hero-still" video="/media/hero-loop" fallback={<NetworkGlobe />} />
//   `still` and `video` are paths without extension: the still needs .webp + .jpg, the video .webm + .mp4.
export default function HeroMedia({ still, video, className = '', fallback = null, position = 'center' }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const showVideo = !!video && !reduced;

  // Play only while on screen.
  useEffect(() => {
    const el = ref.current;
    if (!showVideo || !el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [showVideo]);

  if (failed) return fallback;

  const style = { objectPosition: position };
  return (
    <div className={`hero-media ${className}`.trim()} aria-hidden="true">
      {showVideo ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${still}.jpg`}
          style={style}
          onError={() => setFailed(true)}
        >
          <source src={`${video}.webm`} type="video/webm" />
          <source src={`${video}.mp4`} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      ) : (
        <picture>
          <source srcSet={`${still}.webp`} type="image/webp" />
          <img src={`${still}.jpg`} alt="" loading="eager" decoding="async" style={style} onError={() => setFailed(true)} />
        </picture>
      )}
    </div>
  );
}

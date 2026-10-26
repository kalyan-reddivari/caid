import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './Graphics.jsx';

// Shows a real recording (MP4/WebM video or an animated GIF) from public/media.
// Videos play muted and looped while on screen, like a GIF, and pause when scrolled away.
// If no file is set, or it fails to load, the `fallback` (usually an animated illustration) shows instead.
//
//   <MediaClip src="/media/demo.mp4" poster="/media/demo.jpg" caption="…" fallback={<SessionPlayer … />} />
//   <MediaClip gif="/media/demo.gif" caption="…" />
export default function MediaClip({ src, webm, gif, poster, caption, alt, ratio = '16 / 9', fallback = null }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const isVideo = !!(src || webm) && !failed;

  useEffect(() => { setFailed(false); }, [src, webm, gif]);

  // Autoplay while visible (never with reduced motion), pause when off screen.
  useEffect(() => {
    const video = ref.current;
    if (!isVideo || !video || reduced || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) video.play().catch(() => {});
      if (!e.isIntersecting) video.pause();
    }, { threshold: 0.35 });
    io.observe(video);
    return () => io.disconnect();
  }, [isVideo, reduced]);

  if ((!src && !webm && !gif) || failed) return fallback;

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <figure className="media-clip">
      <div className="media-frame" style={{ aspectRatio: ratio }}>
        {isVideo ? (
          <>
            <video ref={ref} poster={poster} muted loop playsInline preload="metadata"
              aria-label={alt || caption} onError={() => setFailed(true)}
              onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
              {/* the browser tries each source in turn; only the last one failing means nothing can play */}
              {webm && <source src={webm} type="video/webm" onError={() => !src && setFailed(true)} />}
              {src && <source src={src} type="video/mp4" onError={() => setFailed(true)} />}
            </video>
            <button type="button" className={`media-toggle${playing ? ' is-playing' : ''}`} onClick={toggle}
              aria-label={playing ? 'Pause video' : 'Play video'}>
              {playing ? (
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" /></svg>
              )}
            </button>
          </>
        ) : (
          <img src={gif} alt={alt || caption || ''} loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

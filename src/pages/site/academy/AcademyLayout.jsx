import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const TABS = [
  { to: '/ai-academy', label: 'Overview', end: true },
  { to: '/ai-academy/paths', label: 'Learning paths' },
  { to: '/ai-academy/certifications', label: 'Certifications' },
  { to: '/ai-academy/resources', label: 'Resources' },
  { to: '/ai-academy/verify', label: 'Verify' },
  { to: '/ai-academy/team', label: 'Our team' },
];

export default function AcademyLayout() {
  const nav = useRef(null);
  const { pathname } = useLocation();

  // On narrow screens the tabs scroll sideways: keep the current tab in view, and fade the edge
  // that has more tabs behind it so people can tell the row continues.
  useEffect(() => {
    const el = nav.current;
    if (!el) return undefined;
    const edges = () => {
      el.dataset.moreLeft = el.scrollLeft > 4 ? 'true' : 'false';
      el.dataset.moreRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 4 ? 'true' : 'false';
    };
    const active = el.querySelector('a.active');
    if (active) el.scrollLeft = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
    edges();
    el.addEventListener('scroll', edges, { passive: true });
    window.addEventListener('resize', edges);
    return () => {
      el.removeEventListener('scroll', edges);
      window.removeEventListener('resize', edges);
    };
  }, [pathname]);

  return (
    <>
      <div className="academy-tabs">
        <div className="wrap">
          <span className="academy-tabs-label">Academy</span>
          <nav aria-label="Academy" ref={nav}>
            {TABS.map((t) => (
              <NavLink key={t.to} to={t.to} end={t.end}>{t.label}</NavLink>
            ))}
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

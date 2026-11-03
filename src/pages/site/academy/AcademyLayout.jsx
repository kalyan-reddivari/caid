import { NavLink, Outlet } from 'react-router-dom';

const TABS = [
  { to: '/ai-academy', label: 'Overview', end: true },
  { to: '/ai-academy/paths', label: 'Learning paths' },
  { to: '/ai-academy/certifications', label: 'Certifications' },
  { to: '/ai-academy/resources', label: 'Resources' },
  { to: '/ai-academy/verify', label: 'Verify' },
  { to: '/ai-academy/team', label: 'Our team' },
];

export default function AcademyLayout() {
  return (
    <>
      <div className="academy-tabs">
        <div className="wrap">
          <span className="academy-tabs-label">Academy</span>
          <nav aria-label="Academy">
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

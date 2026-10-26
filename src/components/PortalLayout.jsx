import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { initials, label } from '../utils/format.js';

// `any`: the link shows if the user holds at least one of these permissions. No `any` means every signed-in user.
export const PORTAL_NAV = [
  { group: 'Me', items: [
    { to: '/portal', label: 'Dashboard', end: true },
    { to: '/portal/profile', label: 'My profile' },
    { to: '/portal/documents', label: 'Documents', any: ['SELF_WORKSPACE', 'DOCUMENT_MANAGE_ALL'] },
    { to: '/portal/payroll', label: 'Payroll', any: ['SELF_WORKSPACE', 'PAYROLL_READ_ALL'] },
  ]},
  { group: 'Work', items: [
    { to: '/portal/projects', label: 'Projects', any: ['PROJECT_READ_ALL', 'PROJECT_READ_CLIENT', 'SELF_WORKSPACE'] },
    { to: '/portal/clients', label: 'Clients', any: ['CLIENT_READ'] },
    { to: '/portal/inquiries', label: 'Inquiries', any: ['INQUIRY_MANAGE'] },
  ]},
  { group: 'People', items: [
    { to: '/portal/employees', label: 'Employees', any: ['EMPLOYEE_READ'] },
    { to: '/portal/skills', label: 'Skills', any: ['SKILL_WRITE'] },
    { to: '/portal/jobs', label: 'Job postings', any: ['JOB_READ', 'APPLICATION_MANAGE'] },
  ]},
];

export default function PortalLayout() {
  const { user, can, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const signOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="portal">
      <aside className={`sidebar${open ? ' open' : ''}`} aria-label="Portal navigation">
        <Wordmark to="/portal" onDark />
        {PORTAL_NAV.map((g) => {
          const items = g.items.filter((i) => !i.any || can(...i.any));
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <div className="side-group">{g.group}</div>
              {items.map((i) => (
                <NavLink key={i.to} to={i.to} end={i.end} className="side-link">{i.label}</NavLink>
              ))}
            </div>
          );
        })}
        <div className="side-foot">
          <NavLink to="/" className="side-link" style={{ padding: '.3rem 0' }}>View public site</NavLink>
          <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: '#3a4a70' }} onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="portal-main">
        <div className="topbar">
          <button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <span className="muted small">{user.role === 'CLIENT' ? 'CAID client portal' : 'CAID employee portal'}</span>
          <div className="who">
            <span style={{ textAlign: 'right' }}>
              <b>{user.fullName}</b><br />
              <span className="muted">{label(user.role)}</span>
            </span>
            <span className="avatar">{initials(user)}</span>
          </div>
        </div>
        <div className="portal-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

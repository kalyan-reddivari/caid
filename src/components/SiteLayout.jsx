import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Our process' },
  { to: '/ai-engineering', label: 'How we build' },
  { to: '/ai-adoption', label: 'AI adoption' },
  { to: '/ai-academy', label: 'AI Academy' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Wordmark />
          <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="site-nav" className={`site-nav${open ? ' open' : ''}`} aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
            ))}
            {/* Employee sign-in link hidden for now; the portal is still reachable at /login. */}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div>
            <Wordmark onDark />
            <p style={{ marginTop: '1rem', maxWidth: '36ch' }}>
              Custom application and integration development, with AI adoption built in from day one.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/ai-academy">AI Academy</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>What we do</h4>
            <Link to="/services">Services</Link>
            <Link to="/process">Our process</Link>
            <Link to="/ai-engineering">AI-native delivery</Link>
            <Link to="/ai-adoption">AI adoption</Link>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href="mailto:hello@caid.com">hello@caid.com</a>
            <a href="tel:+14045550100">+1 (404) 555-0100</a>
            <span>Atlanta, Georgia</span>
          </div>
          <div className="legal">© {new Date().getFullYear()} CAID. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import SITE from '../site.config.js';
import { usePageMeta } from '../seo.js';
import CallButton from './CallButton.jsx';
import Wordmark from './Wordmark.jsx';

// Five top-level items. Groups open as a menu on wide screens and list their links inline on phones.
const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  {
    label: 'AI',
    items: [
      { to: '/ai-engineering', label: 'How we build', note: 'AI in every phase, people at every gate' },
      { to: '/ai-adoption', label: 'AI adoption', note: 'From readiness assessment to production' },
      { to: '/ai-academy', label: 'AI Academy', note: 'How our whole team is trained' },
    ],
  },
  {
    label: 'Products',
    items: [
      { to: '/products', label: 'All products', note: 'Live, free and in development' },
      { to: '/platform', label: 'How the stack works', note: 'One request, step by step' },
    ],
  },
  {
    label: 'Company',
    items: [
      { to: '/about', label: 'About', note: 'Who we are and how we work' },
      { to: '/careers', label: 'Careers', note: 'Open roles' },
      { to: '/contact', label: 'Contact', note: 'Email or send us a message' },
    ],
  },
];

function NavGroup({ group, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const id = `nav-${group.label.toLowerCase()}`;
  const current = group.items.some((i) => pathname.startsWith(i.to));

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus(); }
    };
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className={`nav-group${open ? ' open' : ''}${current ? ' current' : ''}`} ref={ref}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="nav-group-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {group.label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
      <div className="nav-menu" id={id}>
        <span className="nav-menu-label" aria-hidden="true">{group.label}</span>
        {group.items.map((i) => (
          <NavLink key={i.to} to={i.to}>
            <b>{i.label}</b>
            <span>{i.note}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  usePageMeta(pathname);

  // Scroll to #section links. Pages load on demand, so the target may appear a moment after
  // navigation; keep looking briefly, and stop as soon as the visitor scrolls themselves.
  useEffect(() => {
    setOpen(false);
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    const id = decodeURIComponent(hash.slice(1));
    let stopped = false;
    const stop = () => { stopped = true; };
    const timers = [0, 120, 400, 900, 1600].map((ms) => setTimeout(() => {
      const target = !stopped && document.getElementById(id);
      if (target) target.scrollIntoView();
    }, ms));
    window.addEventListener('wheel', stop, { passive: true, once: true });
    window.addEventListener('touchstart', stop, { passive: true, once: true });
    window.addEventListener('keydown', stop, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, [pathname, hash]);

  const onContact = pathname.startsWith('/contact');

  // The phone call bar appears once the page's own buttons have scrolled out of view.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap">
          <Wordmark />
          <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="site-nav" className={`site-nav${open ? ' open' : ''}`} aria-label="Main">
            {NAV.map((n) => (n.items
              ? <NavGroup key={n.label} group={n} pathname={pathname} />
              : <NavLink key={n.to} to={n.to}>{n.label}</NavLink>))}
            <CallButton className="btn btn-primary nav-cta" from="header">Book a call</CallButton>
            {/* Employee sign-in link hidden for now; the portal is still reachable at /login. */}
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>

      {!onContact && !open && (
        <div className={`sticky-cta${scrolled ? ' shown' : ''}`}>
          <CallButton className="btn btn-primary" from="sticky-mobile">Book a free call</CallButton>
          <Link className="btn btn-ghost" to="/process#brief" data-track="brief:sticky-mobile">Project brief</Link>
        </div>
      )}

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-brand">
            <Wordmark onDark />
            <p>Systems integration, custom software and AI adoption for companies whose systems need to work together.</p>
            <CallButton className="btn footer-cta" from="footer">Book a free 30-min call</CallButton>
          </div>
          <div>
            <h2 className="footer-h">What we do</h2>
            <Link to="/services">Services</Link>
            <Link to="/process">Process</Link>
            <Link to="/products">Products</Link>
            <Link to="/platform">How the stack works</Link>
          </div>
          <div>
            <h2 className="footer-h">AI</h2>
            <Link to="/ai-engineering">How we build</Link>
            <Link to="/ai-adoption">AI adoption</Link>
            <Link to="/ai-academy">AI Academy</Link>
          </div>
          <div>
            <h2 className="footer-h">Company</h2>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h2 className="footer-h">Get in touch</h2>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {SITE.phone && <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>}
            <span>{SITE.city}, {SITE.region}</span>
          </div>
          <div className="legal">
            <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
            <span className="legal-links"><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of use</Link></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

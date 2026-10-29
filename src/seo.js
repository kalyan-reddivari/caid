// Title, description and share text for each public page. Used twice:
// by the prerender script (scripts/prerender.mjs) to write real <head> tags into each page's HTML,
// and by usePageMeta() to keep them correct as visitors move around the site.
import { useEffect } from 'react';
import SITE from './site.config.js';

export const DEFAULT_IMAGE = '/og-image.png';

export const ROUTE_META = {
  '/': {
    title: 'CAID | Systems integration, custom software and AI adoption, Atlanta',
    description: 'CAID connects the ERP, CRM, HR and finance systems you already run, builds the applications your teams need, and puts AI to work across them. Free 30-minute first call.',
  },
  '/services': {
    title: 'Custom software and systems integration services | CAID',
    description: 'Custom applications, ERP and CRM integration, AI adoption, product development, cloud and DevOps, and technology consulting from one in-house team.',
  },
  '/process': {
    title: 'How a software project with CAID works, stage by stage | CAID',
    description: 'Seven stages from a free first conversation to live software: what you decide, what you receive and what each stage costs. Send a five-minute project brief.',
  },
  '/ai-engineering': {
    title: 'AI-native software delivery and spec-driven development | CAID',
    description: 'How CAID builds with AI in every phase and people at every gate: written specs first, short build cycles, and an engineer reviewing every change.',
  },
  '/ai-adoption': {
    title: 'AI adoption that reaches production | CAID',
    description: 'Assess, pilot, integrate and scale AI against your own systems and data, with clear success measures. Ask about the six-week AI readiness assessment.',
  },
  '/ai-academy': {
    title: 'CAID AI Academy: how every person at CAID learns to build with AI',
    description: 'A four-level path with labs, mentors and paid certification time that every analyst, engineer and lead at CAID completes.',
  },
  '/products': {
    title: 'Products by CAID: Underwrit, Orbitward, Agentcraft Studio, Dryva and more',
    description: 'Underwrit approves and proves AI agent actions, Orbitward runs platform engineering with agents, Agentcraft Studio designs agent workflows for free, Dryva rehearses them against failures, and five more are in development.',
  },
  '/platform': {
    title: 'How the CAID stack works: agents on systems of record, with proof | CAID',
    description: 'See one request travel through the CAID stack: designed in Agentcraft Studio, rehearsed in Dryva, run through Bridgehead as the signed-in person, approved in Underwrit and recorded in a signed receipt.',
  },
  '/about': {
    title: 'About CAID, a systems integration and software firm in Atlanta',
    description: 'CAID LLC is a consulting and product development firm for organizations whose systems need to work together, with AI at the center of the work.',
  },
  '/careers': {
    title: 'Careers at CAID: engineering and consulting jobs in Atlanta',
    description: 'Work on real client systems, learn from senior engineers and get trained to build with AI through the CAID AI Academy. See open roles.',
  },
  '/contact': {
    title: 'Contact CAID: book a free 30-minute call',
    description: 'Tell us what you are working on. A senior consultant, not a salesperson, replies within one business day.',
  },
  '/privacy': {
    title: 'Privacy policy | CAID',
    description: 'What CAID collects through this website, why, how long we keep it and how to ask us to delete it.',
  },
  '/terms': {
    title: 'Website terms of use | CAID',
    description: 'The terms that apply when you use the CAID website.',
  },
};

export const NOT_FOUND_META = {
  title: 'Page not found | CAID',
  description: 'The page you were looking for is not here. Go to the CAID home page.',
  noindex: true,
};

export const PUBLIC_ROUTES = Object.keys(ROUTE_META);

export function metaFor(path) {
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path;
  return ROUTE_META[clean] ? { ...ROUTE_META[clean], path: clean } : { ...NOT_FOUND_META, path: clean };
}

export function organizationJsonLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    image: `${SITE.url}${DEFAULT_IMAGE}`,
    email: SITE.email,
    description: ROUTE_META['/'].description,
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.regionCode, addressCountry: SITE.country },
    areaServed: 'US',
    knowsAbout: ['Systems integration', 'Custom software development', 'AI adoption', 'ERP integration', 'CRM integration', 'Cloud and DevOps'],
  };
  if (SITE.phone) org.telephone = SITE.phone;
  const sameAs = Object.values(SITE.social).filter(Boolean);
  if (sameAs.length) org.sameAs = sameAs;
  return org;
}

export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// The <head> tags for one page, as an HTML string, for the prerender script.
export function headTags(path, extraJsonLd = []) {
  const m = metaFor(path);
  const url = `${SITE.url}${m.path === '/' ? '/' : m.path}`;
  const image = `${SITE.url}${DEFAULT_IMAGE}`;
  const tags = [
    `<title>${escapeAttr(m.title)}</title>`,
    `<meta name="description" content="${escapeAttr(m.description)}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${escapeAttr(m.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttr(m.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  const ld = m.path === '/' ? [organizationJsonLd(), ...extraJsonLd] : extraJsonLd;
  ld.forEach((obj) => tags.push(`<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`));
  return tags.join('\n    ');
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const [, key, name] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) || [];
    if (key) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Keeps the title, description, canonical URL and share tags in step with client-side navigation.
export function usePageMeta(path) {
  useEffect(() => {
    const m = metaFor(path);
    const url = `${SITE.url}${m.path === '/' ? '/' : m.path}`;
    document.title = m.title;
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', m.title);
    setMeta('meta[name="twitter:description"]', 'content', m.description);
    if (!m.noindex) setMeta('link[rel="canonical"]', 'href', url);
  }, [path]);
}

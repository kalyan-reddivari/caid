// Evidence for the public site: case studies, client quotes, client names and the leadership team.
//
// Every entry marked `placeholder: true` is an empty slot, not real content. Placeholders show with a
// "Placeholder" label while you run the site locally (npm run dev) so you can see where real content goes,
// and are left out of production builds. Replace the text, remove `placeholder: true`, and the entry goes live.
// Never publish a client name, logo, quote or number without the client's written permission.

export const SHOW_PLACEHOLDERS = import.meta.env.DEV;

export const live = (items) => items.filter((i) => !i.placeholder || SHOW_PLACEHOLDERS);

export const CASE_STUDIES = [
  {
    placeholder: true,
    client: 'Client or anonymized description, e.g. "A regional distributor, 600 staff"',
    industry: 'Industry',
    title: 'One line on what changed for the client',
    systems: ['System A', 'System B', 'System C'],
    result: 'Headline number',
    resultLabel: 'What the number measures, e.g. "less time to close the books"',
    summary: 'Two sentences: the problem they had, and what CAID built or connected to fix it.',
  },
  {
    placeholder: true,
    client: 'Client or anonymized description',
    industry: 'Industry',
    title: 'One line on what changed for the client',
    systems: ['System A', 'System B'],
    result: 'Headline number',
    resultLabel: 'What the number measures',
    summary: 'Two sentences: the problem they had, and what CAID built or connected to fix it.',
  },
  {
    placeholder: true,
    client: 'Client or anonymized description',
    industry: 'Industry',
    title: 'One line on what changed for the client',
    systems: ['System A', 'AI assistant'],
    result: 'Headline number',
    resultLabel: 'What the number measures',
    summary: 'Two sentences: the problem they had, and what CAID built or connected to fix it.',
  },
];

export const TESTIMONIALS = [
  {
    placeholder: true,
    quote: 'A short, specific quote from a client about working with CAID, approved by them in writing.',
    name: 'Full name',
    role: 'Job title, Company',
  },
];

// Client or partner names shown in a single "Trusted by" line under the home page hero.
export const CLIENTS = [
  { placeholder: true, name: 'Client one' },
  { placeholder: true, name: 'Client two' },
  { placeholder: true, name: 'Client three' },
  { placeholder: true, name: 'Client four' },
  { placeholder: true, name: 'Client five' },
];

export const TEAM = [
  { placeholder: true, name: 'Full name', role: 'Founder and CEO', bio: 'One sentence on background and what they lead at CAID.', initials: 'FN' },
  { placeholder: true, name: 'Full name', role: 'Head of engineering', bio: 'One sentence on background and what they lead at CAID.', initials: 'FN' },
  { placeholder: true, name: 'Full name', role: 'Head of AI adoption', bio: 'One sentence on background and what they lead at CAID.', initials: 'FN' },
];

// Short company facts for the About page. Leave a value empty to hide that fact.
export const COMPANY_FACTS = [
  { label: 'Legal entity', value: 'CAID LLC' },
  { label: 'Headquarters', value: 'Atlanta, Georgia' },
  { label: 'Founded', value: '', placeholder: true },
  { label: 'Team size', value: '', placeholder: true },
];

// Company details used across the public site. Change them here, not in the pages.
// Anything left empty ('') is hidden on the site instead of showing a placeholder.
// See CONTENT-TODO.md for the values that still need confirming before launch.

const SITE = {
  name: 'CAID',
  legalName: 'CAID LLC',
  // Used for canonical URLs, the sitemap and share previews. Override with VITE_SITE_URL at build time.
  url: (import.meta.env.VITE_SITE_URL || 'https://caid.com').replace(/\/$/, ''),
  email: 'hello@caid.com',
  careersEmail: 'careers@caid.com',
  // E.164 for the tel: link, and how it should read on the page. Leave both empty to hide the phone number.
  phone: '',
  phoneDisplay: '',
  city: 'Atlanta',
  region: 'Georgia',
  regionCode: 'GA',
  country: 'US',
  hours: 'Monday to Friday, 9 am to 6 pm ET',
  // A scheduling page (Cal.com, Calendly, Microsoft Bookings…). When set, every "Book a call" button opens it.
  // When empty, the buttons open the contact page with "Discovery call" selected and we reply with times.
  bookingUrl: '',
  social: {
    linkedin: '',
    github: '',
  },
};

export default SITE;

export const hasBooking = () => !!SITE.bookingUrl;

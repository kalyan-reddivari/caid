// Conversion events. Sends to whichever analytics tool the page has loaded (Plausible, Google Analytics 4
// or Google Tag Manager) and does nothing when none is installed. See CONTENT-TODO.md to add one.
//
// Events used on the site:
//   cta_click     a "Book a call", "Send a project brief" or similar button   { cta, from }
//   form_start    the first time someone types in a lead form                 { form }
//   form_submit   a lead form was sent successfully                           { form }
//   stack_map     someone sent their stack map to the project brief            { systems }

export function track(event, props = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.plausible === 'function') window.plausible(event, { props });
    if (typeof window.gtag === 'function') window.gtag('event', event, props);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...props });
  } catch {
    // Analytics must never break the page.
  }
}

// Any link or button with data-track="cta-name" reports a cta_click with the page it was on.
export function installClickTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.('[data-track]');
    if (el) track('cta_click', { cta: el.dataset.track, from: window.location.pathname });
  });
}

// Returns an onFocus handler that reports form_start once per form.
export function trackStart(form) {
  let sent = false;
  return () => {
    if (sent) return;
    sent = true;
    track('form_start', { form });
  };
}

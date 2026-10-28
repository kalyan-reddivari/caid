# Content to add before launch

The site's code is ready, but some trust content can only come from you. Every item below is an empty
slot, not made-up content. Placeholders show with an orange **Placeholder** label when you run
`npm run dev`, and they are left out of `npm run build`, so nothing fake reaches the live site.

## Proof (most important)

All in `src/content/proof.js`. Remove `placeholder: true` from an entry once it holds real content.

- [ ] **Case studies (3).** Industry, a one-line outcome, one headline number and what it measures,
      two sentences on the problem and the fix, and the systems involved. Anonymized clients
      ("a regional distributor, 600 staff") are fine. Shown on Home and Services.
- [ ] **Testimonial (1 or more).** A short, specific quote with the person's name, title and company,
      approved by them in writing. Shown on Home.
- [ ] **Client names (4 to 6).** For the "Trusted by teams at" line under the home page hero. Get permission first.
- [ ] **Leadership team (2 to 4 people).** Name, role, one-line bio. Shown on About.
- [ ] **Company facts.** Year founded and team size (`COMPANY_FACTS`). Shown on About.

## Company details

All in `src/site.config.js`.

- [ ] **Booking link.** Set `bookingUrl` to a Cal.com, Calendly or Microsoft Bookings page with 30-minute
      slots. Until then, every "Book a call" button opens the contact form with "Discovery call" selected.
- [ ] **Phone number.** The old `+1 (404) 555-0100` was a fictional number and has been removed.
      Add the real one to `phone` (e.g. `+14045551234`) and `phoneDisplay`, or leave both empty.
- [ ] **Email addresses.** Confirm `hello@caid.com` and `careers@caid.com` are real inboxes.
- [ ] **Website address.** Confirm `url` (`https://caid.com`), or build with `VITE_SITE_URL=https://your-domain`.
      It is used for canonical links, the sitemap and share previews.
- [ ] **Social links.** LinkedIn and GitHub in `social`, if you want them in search results.

## Legal

- [ ] Have counsel review `src/pages/site/Legal.jsx` (privacy policy and terms of use). They are written
      in plain language from what the site's forms actually collect, but they are not legal advice.

## Analytics

- [ ] Add one analytics script to `index.html` (Plausible is the simplest and needs no cookie banner;
      Google Analytics 4 also works). The site already sends these events to whichever is installed:
      `cta_click`, `form_start`, `form_submit` and `stack_map`. See `src/utils/track.js`.

## Media (optional)

- [ ] A short team or delivery video makes the Home and How we build pages much stronger.
      See "Videos and GIFs" in the README.

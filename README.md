# CAID Frontend

React 18 + Vite front end for CAID (Custom Application and Integration Development):
the public company website and the employee portal.

It talks to the separate **caid-backend** project (Spring Boot API) over `/api`.

## Pages

* **Public site:** Home (with the interactive stack map), Services, Process, How we build, AI adoption, AI Academy,
  Products, About, Careers (live jobs + apply), Contact, Privacy policy, Terms of use.
* **Portal:** Login, Dashboard, My profile, Documents, Payroll and payslips, Projects, Clients,
  Inquiries, Employees, Skills, Job postings and applications. Menu items and buttons show according to the permissions of the user's role (eleven roles; see the backend README). The server enforces the same rules, so hiding something here is only a convenience.

## Run locally

Prerequisites: Node.js 18 or newer.

1. Start **caid-backend** first, so the API runs on http://localhost:8080.
2. In this folder:

```bash
npm install
npm run dev
```

3. Open http://localhost:5173 and sign in with `admin@caid.com` / `Admin@123`.
   The other demo accounts are listed in the backend README.

The dev server forwards every `/api` request to `http://localhost:8080`. If your backend runs
somewhere else, copy `.env.example` to `.env` and change `DEV_API_PROXY`.

## Production build

```bash
npm run build
```

This creates a `dist/` folder of static files you can host on any web server. The build also
prerenders every public page (`dist/services/index.html` and so on, through `scripts/prerender.mjs`),
so search engines and link previews get real HTML with each page's own title, description and share
tags, and writes `sitemap.xml` and `robots.txt`. Set `VITE_SITE_URL` if the site is not at https://caid.com. There are two ways
to connect it to the backend:

* **Same domain (simplest).** Configure your web server (IIS, Apache, nginx…) to serve `dist/`
  and forward `/api/` to the backend on port 8080. No other settings are needed.
* **Separate API domain.** Build with the API address, then add the site's URL to the backend's
  `CORS_ORIGINS` setting:

  ```bash
  # macOS / Linux
  VITE_API_URL=https://api.caid.com/api npm run build
  # Windows (PowerShell)
  $env:VITE_API_URL="https://api.caid.com/api"; npm run build
  ```

Either way, serve a path's own `index.html` when it exists, and send every other path (like
`/portal/projects`) to `app.html`, the plain single-page shell. For nginx:

```nginx
location / { try_files $uri $uri/index.html /app.html; }
```

To preview the production build on your machine: `npm run preview`.

## Customizing

| What | Where |
|---|---|
| Company details, booking link, phone | `src/site.config.js` |
| Case studies, testimonials, clients, team | `src/content/proof.js` (see `CONTENT-TODO.md`) |
| Page titles, descriptions, share text | `src/seo.js` |
| Analytics events | `src/utils/track.js` |
| Colors, fonts, spacing | `src/styles.css` (tokens at the top) |
| Currency and date format | `src/utils/format.js` |
| Menu and footer | `src/components/SiteLayout.jsx` |
| Site copy | `src/pages/site/*.jsx` |
| Portal menu and page access (by permission) | `src/components/PortalLayout.jsx`, `src/App.jsx` |
| Demo-account links on login | `src/pages/portal/Login.jsx` (remove before going live) |

## Videos and GIFs

Real recordings go in `public/media/` and are switched on in `src/media.js`. Each page slot shows an
animated illustration until you give it a file:

| Slot | Where it shows | Without a file |
|---|---|---|
| `deliveryDemo` | How we build → "Watch a feature go from spec to staging" | Animated session clip |
| `academyLab` | AI Academy → "Inside a lab" | Animated lab clip |
| `teamIntro` | Home → under "One in-house team, every stack" | Section hidden |

1. Copy the file, e.g. `public/media/delivery-demo.mp4` (and optionally a poster image `delivery-demo.jpg`).
2. In `src/media.js` set `src: '/media/delivery-demo.mp4'` and `poster: '/media/delivery-demo.jpg'`.
   Use `gif:` instead of `src:` for an animated GIF. Set `ratio` if the recording is not 16:9.

Videos play muted and looped while on screen (like a GIF), pause when scrolled away, and have a
play/pause button. They do not autoplay for visitors who ask for reduced motion. If a file is missing,
the animated illustration shows instead. Prefer MP4 (H.264) under ~5 MB over GIFs: a short screen
recording is usually ten times smaller as MP4. To reuse the player elsewhere:
`<MediaClip src="/media/x.mp4" caption="…" fallback={<SomethingElse />} />` from `src/components/MediaClip.jsx`.

## Structure

```
src/
├── api/client.js          axios instance, auth header, error messages
├── context/AuthContext    login state, role and permissions (`can('PAYROLL_WRITE')`)
├── components/            layouts, CrudPage (generic list/form), Modal, FormField…
├── pages/site/            public website
├── pages/portal/          employee portal
└── utils/format.js        money, dates, labels
```

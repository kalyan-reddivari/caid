// Build-time renderer for the public pages. scripts/prerender.mjs calls render() once per route
// and writes the result into dist/<route>/index.html, so search engines and link previews get real HTML.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { FAQ } from './pages/site/Process.jsx';
import { faqJsonLd, headTags, PUBLIC_ROUTES } from './seo.js';
import SITE from './site.config.js';

export { PUBLIC_ROUTES, SITE };

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StaticRouter>
  );
}

export function head(url) {
  return headTags(url, url === '/process' ? [faqJsonLd(FAQ)] : []);
}

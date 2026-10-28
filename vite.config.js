import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Public pages load as separate chunks in the browser, but are bundled in directly for the
  // build-time prerender (see scripts/prerender.mjs), which has to render them synchronously.
  const sitePages = isSsrBuild ? './src/sitePages.server.js' : './src/sitePages.client.js';
  return {
    plugins: [react()],
    resolve: {
      alias: { '@site-pages': fileURLToPath(new URL(sitePages, import.meta.url)) },
    },
    server: {
      port: 5173,
      proxy: {
        // Dev only: forwards /api calls to the backend project.
        '/api': { target: env.DEV_API_PROXY || 'http://localhost:8080', changeOrigin: true },
      },
    },
  };
});

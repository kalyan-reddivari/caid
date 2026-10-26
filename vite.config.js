import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Dev only: forwards /api calls to the backend project.
        '/api': { target: env.DEV_API_PROXY || 'http://localhost:8080', changeOrigin: true },
      },
    },
  };
});

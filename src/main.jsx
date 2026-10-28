import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { preloadAll } from '@site-pages';
import { installClickTracking } from './utils/track.js';
import './styles.css';

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Public pages are prerendered at build time (scripts/prerender.mjs). When the HTML in #root was
// rendered for this exact path, React takes it over; anything else (the portal, dev mode) renders fresh.
const root = document.getElementById('root');
const path = window.location.pathname.replace(/\/$/, '') || '/';
if (root.dataset.prerendered === path) {
  ReactDOM.hydrateRoot(root, tree);
} else {
  root.textContent = '';
  ReactDOM.createRoot(root).render(tree);
}

installClickTracking();
preloadAll();

import { Link } from 'react-router-dom';
import DotTerrain from '../components/fx/DotTerrain.jsx';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ borderBottom: 0, minHeight: '50vh' }}>
        <DotTerrain />
      <div className="wrap">
        <h1>Page not found</h1>
        <p>The address may be mistyped, or the page has moved. These are the pages most people look for:</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/">Home page</Link>
          <Link className="btn btn-ghost" to="/services">Services</Link>
          <Link className="btn btn-ghost" to="/process">How a project works</Link>
          <Link className="btn btn-ghost" to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}

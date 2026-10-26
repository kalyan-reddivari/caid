import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ borderBottom: 0, minHeight: '50vh' }}>
      <div className="wrap">
        <h1>Page not found</h1>
        <p>The address may be mistyped, or the page has moved.</p>
        <Link className="btn btn-primary" to="/">Go to the home page</Link>
      </div>
    </section>
  );
}

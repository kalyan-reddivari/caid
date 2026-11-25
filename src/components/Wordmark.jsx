import { Link } from 'react-router-dom';

// c{Ai}d: the braces frame "Ai", which is highlighted as the heart of the name.
export default function Wordmark({ to = '/', onDark = false }) {
  return (
    <Link to={to} className={`wordmark${onDark ? ' on-dark' : ''}`}>
      {/* Screen readers hear "CAID home" as the link's own text, so its name matches what it is. */}
      <span aria-hidden="true">
        c<span className="brace">{'{'}</span><span className="ai">Ai</span><span className="brace">{'}'}</span>d
      </span>
      <span className="sr-only">CAID home</span>
    </Link>
  );
}

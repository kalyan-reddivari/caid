import { Link } from 'react-router-dom';

// c{Ai}d: the braces frame "Ai", which is highlighted as the heart of the name.
export default function Wordmark({ to = '/', onDark = false }) {
  return (
    <Link to={to} className={`wordmark${onDark ? ' on-dark' : ''}`} aria-label="CAID home">
      c<span className="brace" aria-hidden="true">{'{'}</span><span className="ai">Ai</span><span className="brace" aria-hidden="true">{'}'}</span>d
    </Link>
  );
}

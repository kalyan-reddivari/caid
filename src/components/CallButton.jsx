import { Link } from 'react-router-dom';
import SITE from '../site.config.js';

// "Book a call" everywhere on the site. Opens the scheduling page when SITE.bookingUrl is set;
// otherwise goes to the contact page with "Discovery call" selected.
export const CALL_PATH = '/contact?interest=Discovery%20call#book';

export default function CallButton({ className = 'btn btn-primary', from = 'page', children = 'Book a 30-min call' }) {
  if (SITE.bookingUrl) {
    return (
      <a className={className} href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" data-track={`book-call:${from}`}>
        {children}<span className="sr-only"> (opens the booking page in a new tab)</span>
      </a>
    );
  }
  return <Link className={className} to={CALL_PATH} data-track={`book-call:${from}`}>{children}</Link>;
}

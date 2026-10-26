import { label } from '../utils/format.js';

const TONE = {
  ACTIVE: 'good', OPEN: 'good', PAID: 'good', COMPLETED: 'good', HIRED: 'good', OFFERED: 'good',
  IN_PROGRESS: 'info', PROCESSED: 'info', INTERVIEW: 'info', SCREENING: 'info',
  PLANNED: 'warn', DRAFT: 'warn', NEW: 'warn', PROSPECT: 'warn', ON_LEAVE: 'warn', ON_HOLD: 'warn',
  INACTIVE: 'bad', CLOSED: 'bad', REJECTED: 'bad',
};

export default function StatusPill({ value }) {
  if (!value) return <span className="muted">—</span>;
  return <span className={`pill ${TONE[value] || ''}`}>{label(value)}</span>;
}

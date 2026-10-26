// Change CURRENCY / LOCALE here to match your business.
export const CURRENCY = 'USD';
export const LOCALE = 'en-US';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

export function money(value, decimals = 2) {
  if (value === null || value === undefined || value === '') return '—';
  return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

export function date(value) {
  if (!value) return '—';
  const d = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  return d.toLocaleDateString(LOCALE, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function label(value) {
  if (!value) return '—';
  return value.toString().toLowerCase().replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\bai\b/gi, 'AI').replace(/\bhr\b/gi, 'HR');
}

export function bytes(n) {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function initials(person) {
  if (!person) return '?';
  return `${person.firstName?.[0] || ''}${person.lastName?.[0] || ''}`.toUpperCase();
}

export const enumOptions = (values) => values.map((v) => ({ value: v, label: label(v) }));

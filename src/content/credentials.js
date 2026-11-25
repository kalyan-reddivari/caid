// Credentials are issued by the backend as signed Open Badges 3.0 credentials and checked on
// /ai-academy/verify. See docs/credentials-api.md for the API the verification page calls.
import SITE from '../site.config.js';
import { CERTS, certById } from './academy.js';

export const VERIFY_PATH = '/ai-academy/verify';
export const ISSUER = 'CAID';

// Sample IDs shown on the credential preview. They resolve on the verify page without the backend,
// clearly marked as samples, so visitors can see what a check looks like.
export const sampleId = (cert) => `CAID-${cert.id.toUpperCase()}-SAMPLE`;

export function sampleCredential(id) {
  const cert = CERTS.find((c) => sampleId(c) === id.trim().toUpperCase());
  if (!cert) return null;
  return {
    id: sampleId(cert),
    certId: cert.id,
    holderName: 'Your Name',
    issuedAt: '2026-11-03',
    expiresAt: '2028-11-03',
    status: 'active',
    sample: true,
  };
}

export const verifyUrl = (id) => `${SITE.url}${VERIFY_PATH}?id=${encodeURIComponent(id)}`;

// LinkedIn's "Add to profile" link: pre-fills the Licenses & certifications form. No API key needed.
export function linkedInUrl(cred) {
  const cert = certById(cred.certId);
  const [iy, im] = cred.issuedAt.split('-');
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: cert ? cert.name : cred.certName,
    organizationName: ISSUER,
    issueYear: iy,
    issueMonth: String(Number(im)),
    certUrl: verifyUrl(cred.id),
    certId: cred.id,
  });
  if (cred.expiresAt) {
    const [ey, em] = cred.expiresAt.split('-');
    params.set('expirationYear', ey);
    params.set('expirationMonth', String(Number(em)));
  }
  return `https://www.linkedin.com/profile/add?${params}`;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

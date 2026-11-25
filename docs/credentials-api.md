# CAID Academy credentials: backend contract

The site's verification page (`/ai-academy/verify`) and the "Add to LinkedIn" button are built.
Issuing and signing credentials belongs in the backend. This is what the site expects.

## Approach

CAID issues its own credentials as **Open Badges 3.0** (W3C Verifiable Credentials), signed with a
CAID key. No third-party badge platform and no per-credential fee. Because OB 3.0 is the open
standard, a later move to Credly or another platform keeps every credential valid.

## Data

One record per credential:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Public credential ID, `CAID-XXXX-XXXX-XXXX` (random, not sequential) |
| `certId` | string | Catalog ID from `src/content/academy.js`, for example `genai-associate` |
| `certName` | string | Certification name at the time of issue |
| `holderName` | string | As the learner wants it shown |
| `holderEmail` | string | Never returned by the public API |
| `issuedAt` | date | `YYYY-MM-DD` |
| `expiresAt` | date or null | Two years after `issuedAt` for every current certification |
| `status` | enum | `active`, `expired` or `revoked` (expired is derived from `expiresAt`) |
| `credentialUrl` | string or null | URL of the signed OB 3.0 JSON, see below |

## Public API

`GET /api/public/credentials/{id}` (no auth, rate limited)

- `200` with `{ id, certId, certName, holderName, issuedAt, expiresAt, status, credentialUrl }`
- `404` when no credential has that ID

The site already handles 200, 404 and "service unreachable". IDs ending in `-SAMPLE` are answered
by the site itself and never reach the API.

`GET /api/public/credentials/{id}.json` returns the signed OB 3.0 credential
(`application/vc+ld+json`): an `OpenBadgeCredential` whose `issuer` is CAID's profile, whose
`credentialSubject.achievement` describes the certification (name, criteria, the exam's domains)
and whose `proof` is an `eddsa-rdfc-2022` Data Integrity proof (or a JWT, VC-JOSE).

The issuer profile and public key are published at a stable URL (for example as `did:web` at
`/.well-known/did.json`), so outside verifiers can check signatures without asking CAID.

## Issuing

1. The exam system records a pass.
2. The backend creates the record, signs the OB 3.0 credential and stores it.
3. The learner gets an email with the verification link
   (`https://<site>/ai-academy/verify?id=<id>`), the certificate PDF and the signed JSON.
4. From the verification page they add it to LinkedIn. The button is a plain
   `linkedin.com/profile/add` link (see `linkedInUrl()` in `src/content/credentials.js`), so no
   LinkedIn app or API key is needed.

Revocation sets `status` to `revoked`; the verification page then shows it as revoked.

## Before launch

- Generate the signing key and keep it in the backend's secret store, never in this repo.
- Publish the issuer profile and the privacy wording for what the verification page shows
  (holder name, certification, dates only).
- Set `SITE.url` (`VITE_SITE_URL`) to the live domain so verification links and LinkedIn
  "credential URL" fields point to it.

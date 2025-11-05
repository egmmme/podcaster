# Security

Essentials for keeping the app safe, with a focus on XSS prevention when rendering external content.

## HTML Sanitization

- All external HTML is sanitized with DOMPurify.
- Always render via the `SafeHTMLRenderer` component; do not use `dangerouslySetInnerHTML` directly.
- External links are hardened with `target="_blank"` and `rel="noopener noreferrer"`.

Quick example:

```tsx
<SafeHTMLRenderer html={episode.description} />
```

## Data & API

- Read-only iTunes API over HTTPS; no authentication; no PII stored.
- localStorage is used only for caching public data (24h TTL).
- CORS proxy for feed parsing: https://corsproxy.io/? (see `API_CONSTANTS.CORS_PROXY`).

## Dependencies

- Run `npm audit` regularly; fix or upgrade as needed.
- Review new dependencies for security posture; pin majors.

## Reporting

- Report vulnerabilities privately to the maintainer with repro steps.

## Future Hardening

Consider enabling headers like:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

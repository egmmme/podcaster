# Security

## Overview

The application implements multiple security layers to protect against common web vulnerabilities, with a focus on Cross-Site Scripting (XSS) prevention when rendering external content.

## HTML Sanitization

### DOMPurify Integration

All external HTML content is sanitized before rendering using [DOMPurify](https://github.com/cure53/DOMPurify):

```typescript
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(rawHTML, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
});
```

### SafeHTMLRenderer Component

Centralized component for secure HTML rendering:

```typescript
<SafeHTMLRenderer html={episode.description} className="episode-description" />
```

**Features:**

- Whitelisted HTML tags only (no `<script>`, `<iframe>`, etc.)
- Whitelisted attributes only (no `onclick`, `onerror`, etc.)
- Automatic link hardening with `rel="noopener noreferrer"`
- Prevents JavaScript execution in any form

### Allowed HTML Elements

| Tag        | Purpose         | Allowed Attributes |
| ---------- | --------------- | ------------------ |
| `<p>`      | Paragraphs      | -                  |
| `<br>`     | Line breaks     | -                  |
| `<strong>` | Bold text       | -                  |
| `<em>`     | Italic text     | -                  |
| `<a>`      | Links           | href, target, rel  |
| `<ul>`     | Unordered lists | -                  |
| `<ol>`     | Ordered lists   | -                  |
| `<li>`     | List items      | -                  |

## Link Security

### External Link Hardening

All external links automatically receive security attributes:

```typescript
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});
```

**Protection:**

- `target="_blank"`: Opens in new tab (prevents same-origin navigation)
- `rel="noopener"`: Prevents access to `window.opener`
- `rel="noreferrer"`: Removes referrer information

### Internal Navigation

React Router handles internal navigation without page reloads:

- No `href` manipulations required
- Type-safe route parameters
- Client-side validation before navigation

## Content Security

### Data Validation

All external API data is validated before use:

```typescript
interface Podcast {
  id: string;
  name: string;
  artist: string;
  image: string;
  summary?: string;
}
```

**Validation Rules:**

- Required fields checked at runtime
- Type safety enforced by TypeScript
- Invalid data results in error states (no rendering)

### API Integration

**iTunes API:**

- Read-only access (no user data sent)
- HTTPS only
- No authentication required

**CORS Proxy:**

- Used only for episode feed parsing
- Whitelisted proxy: `allorigins.win`
- No sensitive data transmitted

## XSS Prevention

### Multiple Layers of Defense

1. **Input Sanitization**: DOMPurify removes malicious content
2. **Content Security Policy**: Future enhancement for production
3. **React's Built-in Protection**: JSX escapes values by default
4. **TypeScript**: Type safety prevents many injection vectors

### Vulnerable Patterns (Avoided)

❌ **NEVER DO:**

```typescript
// Direct innerHTML without sanitization
element.innerHTML = externalContent;

// dangerouslySetInnerHTML without DOMPurify
<div dangerouslySetInnerHTML={{ __html: rawHTML }} />;

// eval() or Function() constructor
eval(externalCode);
```

✅ **ALWAYS DO:**

```typescript
// Use SafeHTMLRenderer component
<SafeHTMLRenderer html={externalContent} />;

// Or sanitize manually with DOMPurify
const clean = DOMPurify.sanitize(rawHTML, CONFIG);
```

## Authentication & Authorization

### Current Implementation

- **No Authentication**: Public content only (iTunes API is public)
- **No User Data**: Application stores no personal information
- **No Cookies**: localStorage used only for caching public data

### Future Considerations

If authentication is added:

- [ ] Use secure HTTP-only cookies for session tokens
- [ ] Implement CSRF protection
- [ ] Use OAuth 2.0 for third-party authentication
- [ ] Store tokens in memory (not localStorage)

## Dependencies

### Security Audits

Run security audits regularly:

```bash
npm audit                # Check for known vulnerabilities
npm audit fix            # Auto-fix vulnerabilities
npm audit fix --force    # Force update (breaking changes)
```

### Trusted Dependencies

All dependencies are from verified publishers:

- `react`, `react-dom` - Facebook/Meta
- `react-router-dom` - Remix team
- `dompurify` - Cure53 (security research firm)
- `@types/*` - DefinitelyTyped community

### Dependency Updates

- Review `npm audit` output weekly
- Update dependencies monthly
- Test thoroughly after updates
- Pin major versions in `package.json`

## Best Practices

### Development Guidelines

1. **Never Trust External Content**: Always sanitize before rendering
2. **Use SafeHTMLRenderer**: Centralized sanitization component
3. **Validate Props**: TypeScript interfaces for all components
4. **Escape User Input**: Let React handle string rendering
5. **Review Dependencies**: Check security advisories before adding

### Code Review Checklist

- [ ] External HTML content uses `SafeHTMLRenderer`
- [ ] No direct use of `dangerouslySetInnerHTML`
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No `eval()` or `Function()` constructors
- [ ] TypeScript types are strict (no `any` without justification)
- [ ] User input is validated before use

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email the maintainer directly
3. Include detailed reproduction steps
4. Allow reasonable time for fix before disclosure

## Security Headers (Future)

For production deployment, configure these HTTP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

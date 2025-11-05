import React from 'react';
import DOMPurify from 'dompurify';

/**
 * Props for SafeHTMLRenderer component.
 */
interface SafeHTMLRendererProps {
  /** Raw HTML string to sanitize and render */
  html: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Renders sanitized HTML content using DOMPurify to prevent XSS attacks.
 * Allows only safe tags (p, strong, em, ul, ol, li, a) and secure URLs (https, http, mailto).
 * Automatically adds target="_blank" and rel="noopener noreferrer" to all links.
 */
export const SafeHTMLRenderer: React.FC<SafeHTMLRendererProps> = ({
  html,
  className = '',
}) => {
  const sanitizeHTML = (dirtyHTML: string): string => {
    // Configure DOMPurify with security hooks
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      // Set all links to open in new tab with security attributes
      if (node.tagName === 'A') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    });

    const cleaned = DOMPurify.sanitize(dirtyHTML, {
      // Tags permitidos (solo formato básico)
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'i',
        'b',
        'ul',
        'ol',
        'li',
        'a',
      ],
      // Atributos permitidos
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      // URLs permitidas
      ALLOWED_URI_REGEXP: /^(https?|mailto):/i,
    });

    // Remove the hook after sanitization to avoid conflicts
    DOMPurify.removeAllHooks();

    return cleaned;
  };

  const cleanHTML = sanitizeHTML(html || '');

  if (!cleanHTML) {
    return null;
  }

  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default SafeHTMLRenderer;

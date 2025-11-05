import React from 'react';
import DOMPurify from 'dompurify';
import './SafeHTMLRenderer.css';

interface SafeHTMLRendererProps {
  html: string;
  className?: string;
}

export const SafeHTMLRenderer: React.FC<SafeHTMLRendererProps> = ({
  html,
  className = '',
}) => {
  const sanitizeHTML = (dirtyHTML: string): string => {
    return DOMPurify.sanitize(dirtyHTML, {
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
      // Forzar atributos de seguridad en links
      FORCE_ATTR: {
        a: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      },
    });
  };

  const cleanHTML = sanitizeHTML(html || '');

  if (!cleanHTML) {
    return null;
  }

  return (
    <div
      className={`safe-html-renderer ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default SafeHTMLRenderer;

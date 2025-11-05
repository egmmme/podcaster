import React from 'react';
import { render, screen } from '@testing-library/react';
import SafeHTMLRenderer from '../SafeHTMLRenderer';

describe('SafeHTMLRenderer', () => {
  test('sanitizes malicious HTML and preserves allowed tags', () => {
    const dirty = `
      <p>Hello <strong>world</strong></p>
      <img src=x onerror=alert(1) />
      <script>alert('xss')</script>
      <a href="https://example.com">go</a>
    `;

    render(<SafeHTMLRenderer html={dirty} />);

    // Allowed content is rendered
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    expect(screen.getByText(/world/i)).toBeInTheDocument();

    // Disallowed elements removed
    expect(screen.queryByText(/xss/i)).not.toBeInTheDocument();
    // No img element should remain because it's not in allowed list
    expect(document.querySelector('img')).toBeNull();

    // Links are hardened
    const link = screen.getByRole('link', { name: 'go' }) as HTMLAnchorElement;
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringMatching(/noopener/));
  });

  test('returns null for empty/fully stripped HTML', () => {
    const { container, rerender } = render(<SafeHTMLRenderer html="" />);
    expect(container.firstChild).toBeNull();

    rerender(<SafeHTMLRenderer html={'<script>1</script>'} />);
    expect(container.firstChild).toBeNull();
  });
});

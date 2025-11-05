import { render, screen } from '@testing-library/react';
import { ContentSection } from '../ContentSection';

describe('ContentSection', () => {
  it('should render children content', () => {
    render(
      <ContentSection>
        <h1>Test Title</h1>
        <p>Test content</p>
      </ContentSection>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ContentSection className="custom-class">
        <div>Test content</div>
      </ContentSection>
    );

    expect(container.firstChild).toHaveClass('content-section', 'custom-class');
  });

  it('should render with empty children', () => {
    const { container } = render(<ContentSection>{null}</ContentSection>);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

const mockPodcast = {
  id: '1',
  name: 'Test Podcast',
  artist: 'Test Artist',
  image: 'test-image.jpg',
  summary: 'Test podcast summary for testing purposes',
};

const renderWithRouter = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Sidebar', () => {
  it('should render podcast information correctly', () => {
    renderWithRouter(<Sidebar podcast={mockPodcast} />);

    expect(screen.getByAltText('Test Podcast')).toHaveAttribute(
      'src',
      'test-image.jpg'
    );
    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText('by Test Artist')).toBeInTheDocument();
    expect(
      screen.getByText('Test podcast summary for testing purposes')
    ).toBeInTheDocument();
  });

  it('should render default description when summary is not provided', () => {
    const podcastWithoutSummary = { ...mockPodcast, summary: undefined };

    renderWithRouter(<Sidebar podcast={podcastWithoutSummary} />);

    expect(screen.getByText('No description available.')).toBeInTheDocument();
  });

  it('should have correct links to podcast detail page', () => {
    renderWithRouter(<Sidebar podcast={mockPodcast} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3); // Image, title, and author links

    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/podcast/1');
    });
  });
});

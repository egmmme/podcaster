import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EpisodeList from '../EpisodeList';

const mockEpisodes = [
  {
    id: '101',
    title: 'Test Episode 1',
    date: '2024-01-01',
    duration: '30:00',
    description: 'Test description 1',
    audioUrl: 'test-audio-1.mp3',
  },
  {
    id: '102',
    title: 'Test Episode 2',
    date: '2024-01-02',
    duration: '45:30',
    description: 'Test description 2',
    audioUrl: 'test-audio-2.mp3',
  },
];

const renderWithRouter = (
  component: React.ReactElement
): ReturnType<typeof render> => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('EpisodeList', () => {
  it('should render episodes count and table', () => {
    renderWithRouter(<EpisodeList episodes={mockEpisodes} podcastId="1" />);

    expect(screen.getByText('Episodes: 2')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3); // Header + 2 episodes
  });

  it('should render empty state when no episodes', () => {
    renderWithRouter(<EpisodeList episodes={[]} podcastId="1" />);

    expect(screen.getByText('No episodes available.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render episode information correctly', () => {
    renderWithRouter(<EpisodeList episodes={mockEpisodes} podcastId="1" />);

    expect(screen.getByText('Test Episode 1')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('30:00')).toBeInTheDocument();

    expect(screen.getByText('Test Episode 2')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02')).toBeInTheDocument();
    expect(screen.getByText('45:30')).toBeInTheDocument();
  });

  it('should have correct links to episode details', () => {
    renderWithRouter(
      <EpisodeList episodes={[mockEpisodes[0]]} podcastId="123" />
    );

    const episodeLink = screen.getByRole('link', { name: 'Test Episode 1' });
    expect(episodeLink).toHaveAttribute('href', '/podcast/123/episode/101');
  });
});

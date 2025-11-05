import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PodcastDetailPage } from '../PodcastDetailPage';
import { usePodcastDetail } from '../../../../app/hooks/usePodcasts';

// Mock the hook
jest.mock('../../../../app/hooks/usePodcasts');

const mockUsePodcastDetail = usePodcastDetail as jest.MockedFunction<
  typeof usePodcastDetail
>;

// Mock child components with explicit return types
jest.mock('../../../layouts/Sidebar/Sidebar', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="sidebar">Sidebar Mock</div>,
}));

jest.mock('../../../components/ui/EpisodeList/EpisodeList', () => ({
  __esModule: true,
  default: (): JSX.Element => (
    <div data-testid="episode-list">EpisodeList Mock</div>
  ),
}));

jest.mock('../../../components/ui/LoadingSpinner/LoadingSpinner', () => ({
  __esModule: true,
  default: (): JSX.Element => (
    <div data-testid="loading-spinner">Loading...</div>
  ),
}));

const mockPodcast = {
  id: '1',
  name: 'Test Podcast',
  artist: 'Test Artist',
  image: 'test-image.jpg',
  summary: 'Test summary',
  episodeCount: 1,
};

const mockEpisodes = [
  {
    id: '101',
    title: 'Test Episode 1',
    date: '2024-01-01',
    duration: '30:00',
    description: 'Test description 1',
    audioUrl: 'test-audio-1.mp3',
  },
];

const renderWithRouter = (podcastId = '1'): void => {
  render(
    <MemoryRouter initialEntries={[`/podcast/${podcastId}`]}>
      <Routes>
        <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('PodcastDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: null,
      episodes: [],
      loadingState: 'loading',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    expect(screen.getByText('Loading podcast details...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should show error state when there is an error', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: null,
      episodes: [],
      loadingState: 'failed',
      error: 'Failed to fetch podcast',
      refetch: jest.fn(),
    });

    renderWithRouter();

    expect(screen.getByText('Error loading podcast')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch podcast')).toBeInTheDocument();
    expect(screen.getByText('Return to homepage')).toBeInTheDocument();
  });

  it('should show podcast not found when podcast is null', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: null,
      episodes: [],
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    expect(screen.getByText('Error loading podcast')).toBeInTheDocument();
    expect(screen.getByText('Podcast not found')).toBeInTheDocument();
  });

  it('should render podcast details when data is loaded', async () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('episode-list')).toBeInTheDocument();
    });

    expect(screen.getByText('Episodes: 1')).toBeInTheDocument();
  });

  it('should show error when podcastId is not provided', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: null,
      episodes: [],
      loadingState: 'idle',
      error: null,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/podcast']}>
        <Routes>
          <Route path="/podcast" element={<PodcastDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Podcast ID not provided')).toBeInTheDocument();
  });
});

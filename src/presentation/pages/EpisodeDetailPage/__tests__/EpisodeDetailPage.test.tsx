import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EpisodeDetailPage } from '../EpisodeDetailPage';
import { usePodcastDetail } from '../../../../app/hooks/usePodcasts';

// Mock the hook
jest.mock('../../../../app/hooks/usePodcasts');

const mockUsePodcastDetail = usePodcastDetail as jest.MockedFunction<
  typeof usePodcastDetail
>;

// Mock child components
jest.mock('../../../layouts/Sidebar/Sidebar', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="sidebar">Sidebar Mock</div>,
}));

jest.mock('../../../components/ui/AudioPlayer/AudioPlayer', () => ({
  AudioPlayer: (): JSX.Element => (
    <div data-testid="audio-player">AudioPlayer Mock</div>
  ),
}));

const mockPodcast = {
  id: '1',
  name: 'Test Podcast',
  artist: 'Test Artist',
  image: 'test-image.jpg',
  summary: 'Test summary',
  description: 'Test description',
  episodeCount: 2,
};

const mockEpisodes = [
  {
    id: '101',
    title: 'Test Episode 1',
    date: '2024-01-01',
    duration: '30:00',
    description: '<p>Test <strong>HTML</strong> description</p>',
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
  podcastId = '1',
  episodeId = '101'
): ReturnType<typeof render> => {
  return render(
    <MemoryRouter
      initialEntries={[`/podcast/${podcastId}/episode/${episodeId}`]}
    >
      <Routes>
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetailPage />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('EpisodeDetailPage', () => {
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

    expect(screen.getByText('Loading episode...')).toBeInTheDocument();
  });

  it('should show error state when podcast not found', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: null,
      episodes: [],
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    expect(screen.getByText('Error loading episode')).toBeInTheDocument();
    expect(screen.getByText('Episode not found')).toBeInTheDocument();
  });

  it('should show error state when episode not found', () => {
    mockUsePodcastDetail.mockReturnValue({
      podcast: mockPodcast,
      episodes: [mockEpisodes[1]], // Only episode 2, not episode 1
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter('1', '101'); // Looking for episode 101

    expect(screen.getByText('Error loading episode')).toBeInTheDocument();
    expect(screen.getByText('Episode not found')).toBeInTheDocument();
  });

  it('should render episode details when data is loaded', async () => {
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
      expect(screen.getByTestId('audio-player')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Episode 1')).toBeInTheDocument();
    // Check that HTML description is rendered (it contains bold HTML text)
    const descriptionDiv = document.querySelector(
      '.episode-detail-page__description'
    );
    expect(descriptionDiv).toBeInTheDocument();
    expect(descriptionDiv?.innerHTML).toContain('<strong>HTML</strong>');
  });

  it('should render without description when not provided', async () => {
    const episodeWithoutDescription = {
      ...mockEpisodes[0],
      description: undefined,
    };

    mockUsePodcastDetail.mockReturnValue({
      podcast: mockPodcast,
      episodes: [episodeWithoutDescription],
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Test Episode 1')).toBeInTheDocument();
    });

    // Should not crash when description is undefined
    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
  });
});

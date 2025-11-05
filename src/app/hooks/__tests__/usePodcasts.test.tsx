import { renderHook, waitFor } from '@testing-library/react';
import { usePodcastDetail } from '../usePodcasts';
import { PodcastApiService } from '@services/api/podcastApi';
import { CacheService } from '@services/cache/cacheService';

// Mock the external dependencies
jest.mock('@services/api/podcastApi');
jest.mock('@services/cache/cacheService');

const mockGetPodcastDetail =
  PodcastApiService.getPodcastDetail as jest.MockedFunction<
    typeof PodcastApiService.getPodcastDetail
  >;
const mockGetEpisodes = CacheService.getEpisodes as jest.MockedFunction<
  typeof CacheService.getEpisodes
>;
const mockSetEpisodes = CacheService.setEpisodes as jest.MockedFunction<
  typeof CacheService.setEpisodes
>;
const mockShouldFetchEpisodes =
  CacheService.shouldFetchEpisodes as jest.MockedFunction<
    typeof CacheService.shouldFetchEpisodes
  >;

const mockPodcastData = {
  podcast: {
    id: '1',
    name: 'Test Podcast',
    artist: 'Test Artist',
    image: 'test.jpg',
    description: 'Test description',
    episodeCount: 2,
  },
  episodes: [
    {
      id: '101',
      title: 'Test Episode',
      date: '2024-01-01',
      duration: '30:00',
      description: 'Test episode description',
      audioUrl: 'test.mp3',
    },
  ],
};

describe('usePodcastDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch podcast detail when not in cache', async () => {
    mockShouldFetchEpisodes.mockReturnValue(true);
    mockGetEpisodes.mockReturnValue(null);
    mockGetPodcastDetail.mockResolvedValue(mockPodcastData);

    const { result } = renderHook(() => usePodcastDetail('1'));

    expect(result.current.loadingState).toBe('loading');

    await waitFor(() => {
      expect(result.current.loadingState).toBe('succeeded');
    });

    expect(result.current.podcast).toEqual(mockPodcastData.podcast);
    expect(result.current.episodes).toEqual(mockPodcastData.episodes);
    expect(mockSetEpisodes).toHaveBeenCalledWith('1', mockPodcastData);
  });

  it('should use cached data when available', async () => {
    mockShouldFetchEpisodes.mockReturnValue(false);
    mockGetEpisodes.mockReturnValue({
      data: mockPodcastData,
      lastUpdated: Date.now(),
    });

    const { result } = renderHook(() => usePodcastDetail('1'));

    await waitFor(() => {
      expect(result.current.loadingState).toBe('succeeded');
    });

    expect(result.current.podcast).toEqual(mockPodcastData.podcast);
    expect(result.current.episodes).toEqual(mockPodcastData.episodes);
    expect(mockGetPodcastDetail).not.toHaveBeenCalled();
  });
});

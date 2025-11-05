import { PodcastApiService } from '../podcastApi';
import { HttpClient } from '../httpClient';

jest.mock('../httpClient', () => ({
  HttpClient: {
    getWithCors: jest.fn(),
  },
}));

describe('PodcastApiService', () => {
  beforeEach(() => {
    (HttpClient.getWithCors as jest.Mock).mockReset();
  });

  test('getTopPodcasts maps iTunes response to domain Podcast[]', async () => {
    (HttpClient.getWithCors as jest.Mock).mockResolvedValue({
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '1' } },
            'im:name': { label: 'Show 1' },
            'im:artist': { label: 'Artist 1' },
            'im:image': [
              { label: 'img-s' },
              { label: 'img-m' },
              { label: 'img-l' },
            ],
            summary: { label: 'desc' },
          },
        ],
      },
    });

    const res = await PodcastApiService.getTopPodcasts();
    expect(res).toEqual([
      {
        id: '1',
        name: 'Show 1',
        artist: 'Artist 1',
        image: 'img-l',
        summary: 'desc',
      },
    ]);
  });

  test('getPodcastDetail maps podcast and episodes; formats duration', async () => {
    (HttpClient.getWithCors as jest.Mock).mockResolvedValue({
      results: [
        {
          kind: 'podcast',
          trackId: 1,
          trackName: 'Show 1',
          artistName: 'Artist 1',
          artworkUrl600: 'img',
          description: 'html',
        },
        {
          kind: 'podcast-episode',
          trackId: 101,
          trackName: 'Ep 1',
          releaseDate: '2024-01-01T00:00:00Z',
          trackTimeMillis: 90000,
          description: 'd',
          episodeUrl: 'audio1',
        },
        {
          kind: 'podcast-episode',
          trackId: 102,
          trackName: 'Ep 2',
          releaseDate: '2024-01-02T00:00:00Z',
          trackTimeMillis: 0,
          description: 'e',
          episodeUrl: 'audio2',
        },
      ],
    });

    const { podcast, episodes } = await PodcastApiService.getPodcastDetail('1');
    expect(podcast).toMatchObject({
      id: '1',
      name: 'Show 1',
      artist: 'Artist 1',
      image: 'img',
      description: 'html',
      episodeCount: 2,
    });
    expect(episodes[0]).toMatchObject({
      id: '101',
      title: 'Ep 1',
      duration: '1:30',
      audioUrl: 'audio1',
    });
    expect(episodes[1]).toMatchObject({
      id: '102',
      title: 'Ep 2',
      duration: '--:--',
      audioUrl: 'audio2',
    });
  });

  test('getPodcastDetail throws when podcast not found', async () => {
    (HttpClient.getWithCors as jest.Mock).mockResolvedValue({ results: [] });
    await expect(PodcastApiService.getPodcastDetail('1')).rejects.toThrow(
      /not found/i
    );
  });
});

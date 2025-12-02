import { HttpClient } from './httpClient';
import {
  iTunesPodcastResponse,
  iTunesPodcastLookupResponse,
} from '@domain/types/api';
import { Podcast, PodcastDetail, Episode } from '@domain/entities';
import { API_CONSTANTS, buildApiUrl } from '@shared/constants/api';
import { getConfig } from '@shared/config/runtime';

/**
 * Service for fetching podcast data from iTunes API or backend API.
 */
export class PodcastApiService {
  /**
   * Fetches the top 100 podcasts from iTunes or backend API.
   * @returns Promise with array of podcasts
   */
  static async getTopPodcasts(): Promise<Podcast[]> {
    const config = getConfig();

    if (config.apiMode === 'backend') {
      // Use backend API
      const url = buildApiUrl('/api/podcasts');
      const data = await HttpClient.get<Podcast[]>(url);
      return data;
    }

    // Use iTunes API via CORS proxy
    const data = await HttpClient.getWithCors<iTunesPodcastResponse>(
      API_CONSTANTS.TOP_PODCASTS_URL
    );

    return data.feed.entry.map((entry) => ({
      id: entry.id.attributes['im:id'],
      name: entry['im:name'].label,
      artist: entry['im:artist'].label,
      image: entry['im:image'][entry['im:image'].length - 1].label,
      summary: entry.summary?.label,
    }));
  }

  /**
   * Fetches podcast details and up to 20 most recent episodes.
   * @param podcastId - The iTunes podcast identifier
   * @returns Promise with podcast details and episodes array
   */
  static async getPodcastDetail(
    podcastId: string
  ): Promise<{ podcast: PodcastDetail; episodes: Episode[] }> {
    const config = getConfig();

    if (config.apiMode === 'backend') {
      // Use backend API
      const url = buildApiUrl(`/api/podcasts/${podcastId}`);
      const data = await HttpClient.get<{
        podcast: PodcastDetail;
        episodes: Episode[];
      }>(url);
      return data;
    }

    // Use iTunes API via CORS proxy
    const url = `${API_CONSTANTS.PODCAST_LOOKUP_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

    const data = await HttpClient.getWithCors<iTunesPodcastLookupResponse>(url);

    const podcastResult = data.results.find(
      (result) => result.kind === 'podcast'
    );
    const episodeResults = data.results.filter(
      (result) => result.kind === 'podcast-episode'
    );

    if (!podcastResult || !('artworkUrl600' in podcastResult)) {
      throw new Error('Podcast not found');
    }

    const podcast: PodcastDetail = {
      id: podcastId,
      name: podcastResult.trackName,
      artist: podcastResult.artistName,
      image: podcastResult.artworkUrl600,
      description: podcastResult.description,
      episodeCount: episodeResults.length,
    };

    const episodes: Episode[] = episodeResults.map((episode) => {
      if (!('releaseDate' in episode)) {
        throw new Error('Invalid episode data');
      }

      return {
        id: episode.trackId.toString(),
        title: episode.trackName,
        date: new Date(episode.releaseDate).toLocaleDateString(),
        duration: this.formatDuration(episode.trackTimeMillis),
        description: episode.description,
        audioUrl: episode.episodeUrl,
      };
    });

    return { podcast, episodes };
  }

  /**
   * Converts milliseconds to MM:SS format.
   * @param milliseconds - Duration in milliseconds
   * @returns Formatted duration string or "--:--" if invalid
   */
  private static formatDuration(milliseconds: number): string {
    if (!milliseconds) return '--:--';

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

import { HttpClient } from './httpClient';
import { 
  iTunesPodcastResponse, 
  iTunesPodcastLookupResponse 
} from '../../domain/types/api';
import { Podcast, PodcastDetail, Episode } from '../../domain/entities';
import { API_CONSTANTS } from '../../shared/constants/api';

export class PodcastApiService {
  static async getTopPodcasts(): Promise<Podcast[]> {
    // CORREGIDO: Usar la URL directa sin duplicar el proxy
    const data = await HttpClient.getWithCors<iTunesPodcastResponse>(
      API_CONSTANTS.TOP_PODCASTS_URL
    );

    return data.feed.entry.map(entry => ({
      id: entry.id.attributes['im:id'],
      name: entry['im:name'].label,
      artist: entry['im:artist'].label,
      image: entry['im:image'][entry['im:image'].length - 1].label,
      summary: entry.summary?.label,
    }));
  }

  static async getPodcastDetail(podcastId: string): Promise<{ podcast: PodcastDetail; episodes: Episode[] }> {
    const url = `${API_CONSTANTS.PODCAST_LOOKUP_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    
    // CORREGIDO: Usar la URL directa sin duplicar el proxy
    const data = await HttpClient.getWithCors<iTunesPodcastLookupResponse>(url);

    const podcastResult = data.results.find(result => result.kind === 'podcast');
    const episodeResults = data.results.filter(result => result.kind === 'podcast-episode');

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

    const episodes: Episode[] = episodeResults.map(episode => {
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

  private static formatDuration(milliseconds: number): string {
    if (!milliseconds) return '--:--';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
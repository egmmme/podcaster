import { StorageService } from './storage';
import { API_CONSTANTS, STORAGE_KEYS } from '../../shared/constants/api';

export class CacheService {
  static getPodcasts(): { data: unknown; lastUpdated: number } | null {
    return StorageService.get(STORAGE_KEYS.PODCASTS);
  }

  static setPodcasts(podcasts: unknown): void {
    StorageService.set(STORAGE_KEYS.PODCASTS, podcasts);
  }

  static getEpisodes(
    podcastId: string
  ): { data: unknown; lastUpdated: number } | null {
    const allEpisodes =
      StorageService.get<
        Record<string, { episodes: unknown; lastUpdated: number }>
      >(STORAGE_KEYS.EPISODES) || null;

    const entry = allEpisodes?.data[podcastId] as
      | { episodes: unknown; lastUpdated: number }
      | undefined;

    if (!entry) return null;

    // Normalize per-podcast cache entry to a Cacheable-like shape
    return {
      data: entry.episodes,
      lastUpdated: entry.lastUpdated,
    };
  }

  static setEpisodes(podcastId: string, episodes: unknown): void {
    const allEpisodes =
      StorageService.get<Record<string, unknown>>(STORAGE_KEYS.EPISODES)
        ?.data || {};
    allEpisodes[podcastId] = {
      episodes,
      lastUpdated: Date.now(),
    };
    StorageService.set(STORAGE_KEYS.EPISODES, allEpisodes);
  }

  static shouldFetchPodcasts(): boolean {
    const cached = this.getPodcasts();
    return StorageService.isExpired(cached, API_CONSTANTS.CACHE_DURATION);
  }

  static shouldFetchEpisodes(podcastId: string): boolean {
    const cached = this.getEpisodes(podcastId);
    return StorageService.isExpired(cached, API_CONSTANTS.CACHE_DURATION);
  }
}

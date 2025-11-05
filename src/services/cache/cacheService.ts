import { StorageService } from './storage';
import { API_CONSTANTS, STORAGE_KEYS } from '@shared/constants/api';

/**
 * Manages podcast and episode caching in localStorage with 24-hour expiration.
 */
export class CacheService {
  /**
   * Retrieves cached podcast list.
   * @returns Cached data with timestamp, or null if not found
   */
  static getPodcasts(): { data: unknown; lastUpdated: number } | null {
    return StorageService.get(STORAGE_KEYS.PODCASTS);
  }

  /**
   * Stores podcast list in cache with current timestamp.
   * @param podcasts - The podcast array to cache
   */
  static setPodcasts(podcasts: unknown): void {
    StorageService.set(STORAGE_KEYS.PODCASTS, podcasts);
  }

  /**
   * Retrieves cached episodes for a specific podcast.
   * @param podcastId - The iTunes podcast identifier
   * @returns Cached episode data with timestamp, or null if not found
   */
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

  /**
   * Stores episodes for a specific podcast with current timestamp.
   * @param podcastId - The iTunes podcast identifier
   * @param episodes - The episode array to cache
   */
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

  /**
   * Checks if podcast cache is expired (>24 hours) or missing.
   * @returns true if fresh data should be fetched
   */
  static shouldFetchPodcasts(): boolean {
    const cached = this.getPodcasts();
    return StorageService.isExpired(cached, API_CONSTANTS.CACHE_DURATION);
  }

  /**
   * Checks if episode cache for a podcast is expired (>24 hours) or missing.
   * @param podcastId - The iTunes podcast identifier
   * @returns true if fresh data should be fetched
   */
  static shouldFetchEpisodes(podcastId: string): boolean {
    const cached = this.getEpisodes(podcastId);
    return StorageService.isExpired(cached, API_CONSTANTS.CACHE_DURATION);
  }
}

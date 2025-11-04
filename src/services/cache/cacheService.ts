import { StorageService } from './storage';
import { API_CONSTANTS, STORAGE_KEYS } from '../../shared/constants/api';

export class CacheService {
  static getPodcasts(): { data: unknown; lastUpdated: number } | null {
    return StorageService.get(STORAGE_KEYS.PODCASTS);
  }

  static setPodcasts(podcasts: unknown): void {
    StorageService.set(STORAGE_KEYS.PODCASTS, podcasts);
  }

  static getEpisodes(podcastId: string): unknown {
    const allEpisodes = StorageService.get<Record<string, unknown>>(
      STORAGE_KEYS.EPISODES
    );
    return allEpisodes?.data[podcastId] || null;
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
    return StorageService.isExpired(
      cached as { lastUpdated: number; data: unknown } | null,
      API_CONSTANTS.CACHE_DURATION
    );
  }
}

import { Cacheable } from '@domain/types/common';

export class StorageService {
  static get<T>(key: string): Cacheable<T> | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  }

  static set<T>(key: string, data: T): void {
    try {
      const cacheable: Cacheable<T> = {
        data,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheable));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }

  static isExpired(
    cacheItem: Cacheable<unknown> | null,
    cacheDuration: number
  ): boolean {
    if (!cacheItem) return true;
    return Date.now() - cacheItem.lastUpdated > cacheDuration;
  }
}

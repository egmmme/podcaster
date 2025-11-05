import { Cacheable } from '@domain/types/common';

/**
 * localStorage wrapper with JSON serialization and Cacheable timestamp structure.
 */
export class StorageService {
  /**
   * Retrieves and parses data from localStorage.
   * @param key - The localStorage key
   * @returns Cacheable object with data and timestamp, or null if not found
   */
  static get<T>(key: string): Cacheable<T> | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  }

  /**
   * Stores data in localStorage with current timestamp.
   * @param key - The localStorage key
   * @param data - The data to store
   */
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

  /**
   * Checks if cached item is expired or missing.
   * @param cacheItem - The cached item to check
   * @param cacheDuration - Maximum age in milliseconds
   * @returns true if expired or missing
   */
  static isExpired(
    cacheItem: Cacheable<unknown> | null,
    cacheDuration: number
  ): boolean {
    if (!cacheItem) return true;
    return Date.now() - cacheItem.lastUpdated > cacheDuration;
  }
}

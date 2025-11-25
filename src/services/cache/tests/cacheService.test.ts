import { CacheService } from '../cacheService';
import { StorageService } from '../storage';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CacheService', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    StorageService.clearMemory();
  });

  describe('getPodcasts', () => {
    it('should return cached podcasts', () => {
      const mockPodcasts = {
        data: [{ id: '1', name: 'Test Podcast' }],
        lastUpdated: Date.now(),
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockPodcasts));

      const result = CacheService.getPodcasts();
      expect(result).toEqual(mockPodcasts);
    });
  });

  describe('shouldFetchPodcasts', () => {
    it('should return true when cache is expired', () => {
      const expiredCache = {
        data: [],
        lastUpdated: Date.now() - 25 * 60 * 60 * 1000,
      }; // 25 hours old
      localStorageMock.getItem.mockReturnValue(JSON.stringify(expiredCache));

      expect(CacheService.shouldFetchPodcasts()).toBe(true);
    });
  });
});

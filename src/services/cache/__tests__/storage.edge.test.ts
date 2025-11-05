import { StorageService } from '../storage';

describe('StorageService edge cases', () => {
  const originalLocalStorage = global.localStorage;

  beforeEach(() => {
    const store = new Map<string, string>();
    const mockStorage: Storage = {
      getItem: jest.fn((k: string) =>
        store.has(k) ? store.get(k) ?? null : null
      ),
      setItem: jest.fn((k: string, v: string) => {
        store.set(k, v);
      }),
      removeItem: jest.fn((k: string) => {
        store.delete(k);
      }),
      clear: jest.fn(() => store.clear()),
      key: jest.fn((i: number) => Array.from(store.keys())[i] ?? null),
      get length() {
        return store.size;
      },
    };
    Object.defineProperty(global, 'localStorage', {
      value: mockStorage,
      configurable: true,
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
      writable: true,
    });
  });

  test('set/get roundtrip stores Cacheable shape with timestamp', () => {
    StorageService.set('k', { a: 1 });
    const got = StorageService.get<{ a: number }>('k');
    expect(got).not.toBeNull();
    if (!got) throw new Error('expected value');
    expect(got.data).toEqual({ a: 1 });
    expect(typeof got.lastUpdated).toBe('number');
  });

  test('get returns null on JSON parse error', () => {
    // Force a bad cached value
    (global.localStorage.getItem as jest.Mock).mockReturnValue('{bad');
    expect(StorageService.get('k')).toBeNull();
  });

  test('isExpired works for null and timeouts', () => {
    expect(StorageService.isExpired(null, 1000)).toBe(true);
    // Fresh
    const now = Date.now();
    const item = { data: 1, lastUpdated: now };
    expect(StorageService.isExpired(item, 1000)).toBe(false);
    // Expired
    const old = { data: 1, lastUpdated: now - 2000 };
    expect(StorageService.isExpired(old, 1000)).toBe(true);
  });
});

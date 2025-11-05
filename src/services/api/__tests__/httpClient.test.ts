import { HttpClient } from '../httpClient';
import { API_CONSTANTS } from '@shared/constants/api';

describe('HttpClient', () => {
  const originalFetch = global.fetch as unknown as jest.Mock;

  beforeEach(() => {
    (global.fetch as unknown as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (global.fetch as unknown as jest.Mock).mockReset();
  });

  afterAll(() => {
    (global.fetch as unknown as jest.Mock) = originalFetch;
  });

  test('get resolves JSON on ok response, otherwise throws', async () => {
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: 1 }),
    });

    await expect(
      HttpClient.get<unknown>('https://example.com')
    ).resolves.toEqual({ ok: 1 });

    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(
      HttpClient.get<unknown>('https://example.com/err')
    ).rejects.toThrow(/500/);
  });

  test('getWithCors prefixes proxy', async () => {
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: 1 }),
    });

    const target = 'https://api.service/path?q=1';
    await HttpClient.getWithCors<unknown>(target);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toBe(
      `${API_CONSTANTS.CORS_PROXY}${encodeURIComponent(target)}`
    );
  });
});

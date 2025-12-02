import { getConfig } from '@shared/config/runtime';

/**
 * Constructs an API URL by combining the configured base URL with the path.
 * Handles proper slash concatenation to avoid double-slash issues.
 *
 * @param path - API path (with or without leading slash)
 * @returns Complete API URL
 */
export const buildApiUrl = (path: string): string => {
  const { apiBaseUrl } = getConfig();

  // Normalize path to start with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // If no base URL, return the path as-is
  if (!apiBaseUrl) {
    return normalizedPath;
  }

  // Combine base URL and path (base URL should not have trailing slash)
  return `${apiBaseUrl}${normalizedPath}`;
};

export const API_CONSTANTS = {
  // CORS_PROXY: 'https://api.allorigins.win/raw?url=',
  CORS_PROXY: 'https://corsproxy.io/?',
  TOP_PODCASTS_URL:
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
  PODCAST_LOOKUP_URL: 'https://itunes.apple.com/lookup',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
} as const;

export const STORAGE_KEYS = {
  PODCASTS: 'podcast_app_podcasts',
  EPISODES: 'podcast_app_episodes',
} as const;

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

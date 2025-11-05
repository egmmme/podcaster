/**
 * Individual podcast episode information.
 */
export interface Episode {
  /** iTunes track identifier */
  id: string;
  /** Episode title */
  title: string;
  /** Publication date (localized string) */
  date: string;
  /** Duration in MM:SS format */
  duration: string;
  /** HTML description (optional, sanitized before render) */
  description?: string;
  /** Direct URL to audio file */
  audioUrl: string;
}

/**
 * Cacheable episode list structure organized by podcast ID.
 */
export interface EpisodeList {
  /** Map of podcast ID to episode data and timestamp */
  [podcastId: string]: {
    episodes: Episode[];
    lastUpdated: number;
  };
}

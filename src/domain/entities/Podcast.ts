/**
 * Basic podcast information displayed in the top podcasts list.
 */
export interface Podcast {
  /** iTunes podcast identifier */
  id: string;
  /** Podcast title */
  name: string;
  /** Podcast author/creator */
  artist: string;
  /** Cover image URL */
  image: string;
  /** Short description (optional) */
  summary?: string;
}

/**
 * Extended podcast information with episode metadata.
 */
export interface PodcastDetail extends Podcast {
  /** Full HTML description (sanitized before render) */
  description?: string;
  /** Total number of episodes available */
  episodeCount: number;
}

/**
 * Cacheable podcast list structure.
 */
export interface PodcastList {
  /** Array of podcasts */
  podcasts: Podcast[];
  /** Timestamp of last cache update */
  lastUpdated: number;
}

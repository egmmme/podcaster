export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  description?: string;
  audioUrl: string;
}

export interface EpisodeList {
  [podcastId: string]: {
    episodes: Episode[];
    lastUpdated: number;
  };
}

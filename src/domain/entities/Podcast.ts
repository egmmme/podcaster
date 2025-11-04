export interface Podcast {
    id: string;
    name: string;
    artist: string;
    image: string;
    summary?: string;
}

export interface PodcastDetail extends Podcast {
    description?: string;
    episodeCount: number;
}

export interface PodcastList {
    podcasts: Podcast[];
    lastUpdated: number;
}
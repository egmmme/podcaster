// iTunes API Response Types
export interface iTunesPodcastResponse {
    feed: {
        entry: iTunesPodcastEntry[];
    };
}

export interface iTunesPodcastEntry {
    'im:name': { label: string };
    'im:image': Array<{ label: string }>;
    'im:artist': { label: string };
    id: { attributes: { 'im:id': string } };
    summary?: { label: string };
}

export interface iTunesPodcastLookupResponse {
    results: Array<{
        trackId: number;
        trackName: string;
        artistName: string;
        artworkUrl600: string;
        description?: string;
        kind: 'podcast';
    } | {
        trackId: number;
        trackName: string;
        releaseDate: string;
        trackTimeMillis: number;
        description?: string;
        episodeUrl: string;
        kind: 'podcast-episode';
    }>;
}
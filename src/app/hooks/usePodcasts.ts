import { useState, useEffect, useCallback } from 'react';
import { Podcast, PodcastDetail, Episode } from '../../domain/entities';
import { PodcastApiService } from '../../services/api/podcastApi';
import { CacheService } from '../../services/cache/cacheService';
import { LoadingState } from '../../domain/types/common';

export const usePodcasts = (): {
  podcasts: Podcast[];
  loadingState: LoadingState;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = useCallback(
    async (forceRefresh = false): Promise<void> => {
      try {
        setLoadingState('loading');
        setError(null);

        if (!forceRefresh && !CacheService.shouldFetchPodcasts()) {
          const cached = CacheService.getPodcasts();
          if (cached) {
            setPodcasts(cached.data as Podcast[]);
            setLoadingState('succeeded');
            return;
          }
        }

        const podcastData = await PodcastApiService.getTopPodcasts();
        setPodcasts(podcastData);
        CacheService.setPodcasts(podcastData);
        setLoadingState('succeeded');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch podcasts';
        setError(message);
        setLoadingState('failed');
      }
    },
    []
  );

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  return {
    podcasts,
    loadingState,
    error,
    refetch: () => fetchPodcasts(true),
  };
};

export const usePodcastDetail = (
  podcastId: string
): {
  podcast: PodcastDetail | null;
  episodes: Episode[];
  loadingState: LoadingState;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchPodcastDetail = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!podcastId) return;

      try {
        setLoadingState('loading');
        setError(null);

        if (!forceRefresh && !CacheService.shouldFetchEpisodes(podcastId)) {
          const cached = CacheService.getEpisodes(podcastId);
          if (cached) {
            const cachedData = cached as {
              podcast: PodcastDetail;
              episodes: Episode[];
            };
            setPodcast(cachedData.podcast);
            setEpisodes(cachedData.episodes);
            setLoadingState('succeeded');
            return;
          }
        }

        const { podcast: podcastData, episodes: episodesData } =
          await PodcastApiService.getPodcastDetail(podcastId);

        setPodcast(podcastData);
        setEpisodes(episodesData);
        CacheService.setEpisodes(podcastId, {
          podcast: podcastData,
          episodes: episodesData,
        });
        setLoadingState('succeeded');
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch podcast details';
        setError(message);
        setLoadingState('failed');
      }
    },
    [podcastId]
  );

  useEffect(() => {
    fetchPodcastDetail();
  }, [fetchPodcastDetail]);

  return {
    podcast,
    episodes,
    loadingState,
    error,
    refetch: () => fetchPodcastDetail(true),
  };
};

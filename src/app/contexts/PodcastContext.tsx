import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from 'react';
import { Podcast, PodcastDetail, Episode } from '@domain/entities';

/**
 * PodcastState
 * Represents the state managed by the Podcast context.
 */
interface PodcastState {
  /** All podcasts returned from the API or cache */
  podcasts: Podcast[];
  /** Currently selected podcast detail (or null) */
  selectedPodcast: PodcastDetail | null;
  /** Episodes for the selected podcast or last-loaded set */
  episodes: Episode[];
  /** Current text filter applied to podcasts */
  filter: string;
}

type PodcastAction =
  | { type: 'SET_PODCASTS'; payload: Podcast[] }
  | { type: 'SET_SELECTED_PODCAST'; payload: PodcastDetail | null }
  | { type: 'SET_EPISODES'; payload: Episode[] }
  | { type: 'SET_FILTER'; payload: string };

/** Public initial state (exported for tests) */
export const initialState: PodcastState = {
  podcasts: [],
  selectedPodcast: null,
  episodes: [],
  filter: '',
};

/**
 * podcastReducer
 * Reducer handling PodcastAction to produce a new PodcastState.
 * Exported for unit testing.
 */
export const podcastReducer = (
  state: PodcastState,
  action: PodcastAction
): PodcastState => {
  switch (action.type) {
    case 'SET_PODCASTS':
      return { ...state, podcasts: action.payload };
    case 'SET_SELECTED_PODCAST':
      return { ...state, selectedPodcast: action.payload };
    case 'SET_EPISODES':
      return { ...state, episodes: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

interface PodcastContextType extends PodcastState {
  setPodcasts: (podcasts: Podcast[]) => void;
  setSelectedPodcast: (podcast: PodcastDetail | null) => void;
  setEpisodes: (episodes: Episode[]) => void;
  setFilter: (filter: string) => void;
  filteredPodcasts: Podcast[];
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

/**
 * PodcastProvider
 * Wrap this around your app (or subtree) to provide podcast-related state.
 *
 * Props:
 * - children: ReactNode - the subtree that will receive the context
 */
export const PodcastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(podcastReducer, initialState);

  const setPodcasts = React.useCallback((podcasts: Podcast[]) => {
    dispatch({ type: 'SET_PODCASTS', payload: podcasts });
  }, []);

  const setSelectedPodcast = React.useCallback(
    (podcast: PodcastDetail | null) => {
      dispatch({ type: 'SET_SELECTED_PODCAST', payload: podcast });
    },
    []
  );

  const setEpisodes = React.useCallback((episodes: Episode[]) => {
    dispatch({ type: 'SET_EPISODES', payload: episodes });
  }, []);

  const setFilter = React.useCallback((filter: string) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const filteredPodcasts = useMemo(() => {
    return state.podcasts.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(state.filter.toLowerCase()) ||
        podcast.artist.toLowerCase().includes(state.filter.toLowerCase())
    );
  }, [state.podcasts, state.filter]);

  const value = useMemo(
    () => ({
      ...state,
      setPodcasts,
      setSelectedPodcast,
      setEpisodes,
      setFilter,
      filteredPodcasts,
    }),
    [
      state,
      setPodcasts,
      setSelectedPodcast,
      setEpisodes,
      setFilter,
      filteredPodcasts,
    ]
  );

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
};

/**
 * usePodcast
 * Custom hook that returns the podcast context value. Throws if used outside a PodcastProvider.
 */
export const usePodcast = (): PodcastContextType => {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};

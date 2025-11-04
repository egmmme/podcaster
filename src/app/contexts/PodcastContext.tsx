import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { Podcast, PodcastDetail, Episode } from '../../domain/entities';

interface PodcastState {
    podcasts: Podcast[];
    selectedPodcast: PodcastDetail | null;
    episodes: Episode[];
    filter: string;
}

type PodcastAction =
    | { type: 'SET_PODCASTS'; payload: Podcast[] }
    | { type: 'SET_SELECTED_PODCAST'; payload: PodcastDetail | null }
    | { type: 'SET_EPISODES'; payload: Episode[] }
    | { type: 'SET_FILTER'; payload: string };

const initialState: PodcastState = {
    podcasts: [],
    selectedPodcast: null,
    episodes: [],
    filter: '',
};

const podcastReducer = (state: PodcastState, action: PodcastAction): PodcastState => {
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

export const PodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(podcastReducer, initialState);

    const setPodcasts = React.useCallback((podcasts: Podcast[]) => {
        dispatch({ type: 'SET_PODCASTS', payload: podcasts });
    }, []);

    const setSelectedPodcast = React.useCallback((podcast: PodcastDetail | null) => {
        dispatch({ type: 'SET_SELECTED_PODCAST', payload: podcast });
    }, []);

    const setEpisodes = React.useCallback((episodes: Episode[]) => {
        dispatch({ type: 'SET_EPISODES', payload: episodes });
    }, []);

    const setFilter = React.useCallback((filter: string) => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    }, []);
    
    const filteredPodcasts = useMemo(() => {
        return state.podcasts.filter(podcast =>
            podcast.name.toLowerCase().includes(state.filter.toLowerCase()) ||
            podcast.artist.toLowerCase().includes(state.filter.toLowerCase())
        );
    }, [state.podcasts, state.filter]);

    const value = useMemo(() => ({
        ...state,
        setPodcasts,
        setSelectedPodcast,
        setEpisodes,
        setFilter,
        filteredPodcasts,
    }), [state, setPodcasts, setSelectedPodcast, setEpisodes, setFilter, filteredPodcasts]);

    return (
        <PodcastContext.Provider value={value}>
            {children}
        </PodcastContext.Provider>
    );
};

export const usePodcast = (): PodcastContextType => {
    const context = useContext(PodcastContext);
    if (context === undefined) {
        throw new Error('usePodcast must be used within a PodcastProvider');
    }
    return context;
};
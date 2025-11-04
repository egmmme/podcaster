import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePodcasts } from '../../../app/hooks/usePodcasts';
import { usePodcast } from '../../../app/contexts/PodcastContext';
import { PodcastCard } from '../../components/ui/PodcastCard/PodcastCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner/LoadingSpinner';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { podcasts, loadingState, error } = usePodcasts();
    const { filteredPodcasts, setPodcasts } = usePodcast();

    useEffect(() => {
        if (podcasts.length > 0) {
            setPodcasts(podcasts);
        }
    }, [podcasts, setPodcasts]);

    const handlePodcastClick = (podcastId: string) => {
        navigate(`/podcast/${podcastId}`);
    };

    if (loadingState === 'loading' && podcasts.length === 0) {
        return (
            <div className="home-page__loading">
                <LoadingSpinner size="large" />
                <p>Loading podcasts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-page__error">
                <h2>Error loading podcasts</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="home-page__count">
                {filteredPodcasts.length} podcasts
            </div>

            <div className="home-page__grid">
                {filteredPodcasts.map(podcast => (
                    <PodcastCard
                        key={podcast.id}
                        podcast={podcast}
                        onClick={handlePodcastClick}
                    />
                ))}
            </div>

            {filteredPodcasts.length === 0 && (
                <div className="home-page__empty">
                    <p>No podcasts found matching your search.</p>
                </div>
            )}
        </div>
    );
};
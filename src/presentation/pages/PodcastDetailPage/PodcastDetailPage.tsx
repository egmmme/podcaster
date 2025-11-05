import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePodcastDetail } from '@app/hooks/usePodcasts';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import EpisodeList from '../../components/ui/EpisodeList/EpisodeList';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import './PodcastDetailPage.css';

/**
 * Page showing a podcast's sidebar and its list of episodes.
 * Reads the podcastId from route params.
 */
export const PodcastDetailPage: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { podcast, episodes, loadingState, error } = usePodcastDetail(
    podcastId || ''
  );

  if (!podcastId) {
    return (
      <div className="podcast-detail-page__error">
        <h2>Podcast ID not provided</h2>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }

  if (loadingState === 'loading') {
    return (
      <div className="podcast-detail-page__loading">
        <LoadingSpinner size="large" />
        <p>Loading podcast details...</p>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="podcast-detail-page__error">
        <h2>Error loading podcast</h2>
        <p>{error || 'Podcast not found'}</p>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }

  return (
    <div className="podcast-detail-page">
      <div className="podcast-detail-page__layout">
        <div className="podcast-detail-page__sidebar">
          <Sidebar podcast={podcast} />
        </div>

        <div className="podcast-detail-page__content">
          <div className="podcast-detail-page__episodes-count">
            Episodes: {episodes.length}
          </div>
          <EpisodeList episodes={episodes} podcastId={podcastId} />
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailPage;

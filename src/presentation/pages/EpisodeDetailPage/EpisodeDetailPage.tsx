import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePodcastDetail } from '@app/hooks/usePodcasts';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import { AudioPlayer } from '../../components/ui/AudioPlayer/AudioPlayer';
import { ContentSection } from '../../components/ui/ContentSection/ContentSection';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import './EpisodeDetailPage.css';

export const EpisodeDetailPage: React.FC = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { podcast, episodes, loadingState, error } = usePodcastDetail(
    podcastId ?? ''
  );

  if (!podcastId) {
    return (
      <div className="episode-detail-page__error">
        <h2>Invalid podcast ID</h2>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }

  const episode = episodes.find((ep) => ep.id === episodeId);

  if (loadingState === 'loading') {
    return (
      <div className="episode-detail-page__loading">
        <LoadingSpinner size="large" />
        <p>Loading episode...</p>
      </div>
    );
  }

  if (error || !podcast || !episode) {
    return (
      <div className="episode-detail-page__error">
        <h2>Error loading episode</h2>
        <p>{error || 'Episode not found'}</p>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }

  return (
    <div className="episode-detail-page">
      <div className="episode-detail-page__layout">
        <div className="episode-detail-page__sidebar">
          <Sidebar podcast={podcast} />
        </div>

        <div className="episode-detail-page__content">
          <ContentSection>
            <h2 className="episode-detail-page__episode-title">
              {episode.title}
            </h2>

            {episode.description && (
              <div
                className="episode-detail-page__description"
                dangerouslySetInnerHTML={{ __html: episode.description }}
              />
            )}

            <AudioPlayer
              audioUrl={episode.audioUrl}
              title={episode.title}
              className="episode-detail-page__player"
            />
          </ContentSection>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;

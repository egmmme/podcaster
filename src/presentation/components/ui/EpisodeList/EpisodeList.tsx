import React from 'react';
import { Link } from 'react-router-dom';
import { Episode } from '@domain/entities';
import './EpisodeList.css';

/**
 * Props for the EpisodeList component.
 */
interface EpisodeListProps {
  /** Episodes to display */
  episodes: Episode[];
  /** Parent podcast ID for building episode links */
  podcastId: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Table listing of podcast episodes with links to episode detail routes.
 */
const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  podcastId,
  className = '',
}) => {
  if (episodes.length === 0) {
    return (
      <div className={`episode-list ${className}`}>
        <p className="episode-list__empty">No episodes available.</p>
      </div>
    );
  }

  return (
    <div className={`episode-list ${className}`}>
      <div className="episode-list__header">
        <h2 className="episode-list__title">Episodes: {episodes.length}</h2>
      </div>

      <div className="episode-list__table-container">
        <table className="episode-list__table">
          <thead className="episode-list__thead">
            <tr>
              <th className="episode-list__th">Title</th>
              <th className="episode-list__th">Date</th>
              <th className="episode-list__th">Duration</th>
            </tr>
          </thead>
          <tbody className="episode-list__tbody">
            {episodes.map((episode) => (
              <tr key={episode.id} className="episode-list__row">
                <td className="episode-list__td episode-list__td--title">
                  <Link
                    to={`/podcast/${podcastId}/episode/${episode.id}`}
                    className="episode-list__link"
                  >
                    {episode.title}
                  </Link>
                </td>
                <td className="episode-list__td episode-list__td--date">
                  {episode.date}
                </td>
                <td className="episode-list__td episode-list__td--duration">
                  {episode.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodeList;

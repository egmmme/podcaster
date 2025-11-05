import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '@domain/entities';
import './Sidebar.css';

/**
 * Props for the Sidebar component.
 */
interface SidebarProps {
  /** Podcast to display in the sidebar */
  podcast: Podcast;
  /** Optional extra class names */
  className?: string;
}

/**
 * Sidebar displaying podcast artwork, title, author, and summary with links to the podcast page.
 */
const Sidebar: React.FC<SidebarProps> = ({ podcast, className = '' }) => {
  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__content">
        <Link to={`/podcast/${podcast.id}`} className="sidebar__link">
          <img
            src={podcast.image}
            alt={podcast.name}
            className="sidebar__image"
          />
        </Link>

        <hr className="sidebar__divider" />

        <div className="sidebar__info">
          <Link to={`/podcast/${podcast.id}`} className="sidebar__link">
            <h2 className="sidebar__title">{podcast.name}</h2>
          </Link>
          <Link to={`/podcast/${podcast.id}`} className="sidebar__link">
            <p className="sidebar__author">by {podcast.artist}</p>
          </Link>
        </div>

        <hr className="sidebar__divider" />

        <div className="sidebar__description">
          <h3 className="sidebar__description-title">Description:</h3>
          <p className="sidebar__description-text">
            {podcast.summary || 'No description available.'}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

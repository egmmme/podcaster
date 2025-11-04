import React from 'react';
import { Podcast } from '../../../../domain/entities';
import './PodcastCard.css';

interface PodcastCardProps {
    podcast: Podcast;
    onClick: (podcastId: string) => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, onClick }) => {
    const handleClick = () => {
        onClick(podcast.id);
    };

    return (
        <article className="podcast-card" onClick={handleClick}>
            <div className="podcast-card__image-container">
                <img
                    src={podcast.image}
                    alt={podcast.name}
                    className="podcast-card__image"
                    loading="lazy"
                />
            </div>

            <div className="podcast-card__content">
                <h3 className="podcast-card__title">{podcast.name}</h3>
                <p className="podcast-card__author">Author: {podcast.artist}</p>
            </div>
        </article>
    );
};
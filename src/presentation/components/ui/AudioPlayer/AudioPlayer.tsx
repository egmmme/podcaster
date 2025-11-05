import React from 'react';
import './AudioPlayer.css';

/**
 * Props for the AudioPlayer component.
 */
interface AudioPlayerProps {
  /** Source URL for the audio file */
  audioUrl: string;
  /** Display title for the audio track */
  title: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Accessible HTML5 audio player with a title and controls.
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  className = '',
}) => {
  return (
    <div className={`audio-player ${className}`}>
      <h3 className="audio-player__title">{title}</h3>
      <audio controls src={audioUrl} className="audio-player__element">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;

import React from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  className?: string;
}

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

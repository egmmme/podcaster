import { render, screen } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

describe('AudioPlayer', () => {
  it('should render audio player with correct attributes', () => {
    const { container } = render(
      <AudioPlayer
        audioUrl="https://example.com/episode.mp3"
        title="Test Episode"
      />
    );

    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute(
      'src',
      'https://example.com/episode.mp3'
    );
    expect(audioElement).toHaveAttribute('controls');
  });

  it('should render episode title', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/episode.mp3"
        title="Test Episode Title"
      />
    );

    expect(screen.getByText('Test Episode Title')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AudioPlayer
        audioUrl="https://example.com/episode.mp3"
        title="Test Episode"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('audio-player', 'custom-class');
  });

  it('should have fallback message for unsupported browsers', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/episode.mp3"
        title="Test Episode"
      />
    );

    expect(
      screen.getByText('Your browser does not support the audio element.')
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  PodcastProvider,
  usePodcast,
  podcastReducer,
  initialState,
} from '../PodcastContext';
import { Podcast, PodcastDetail, Episode } from '../../../domain/entities';

describe('PodcastContext', () => {
  test('usePodcast thrown render is caught by an ErrorBoundary (no noisy console output)', () => {
    class TestBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
      }

      componentDidCatch(): void {
        // Intentionally empty - swallow error for test
      }

      render(): React.ReactNode {
        if (this.state.hasError) return <div>error-caught</div>;
        return this.props.children;
      }
    }

    const Bad: React.FC = () => {
      usePodcast();
      return null;
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <TestBoundary>
        <Bad />
      </TestBoundary>
    );

    expect(screen.getByText('error-caught')).toBeTruthy();
    spy.mockRestore();
  });

  test('PodcastProvider provides state and actions', () => {
    const samplePodcasts: Podcast[] = [
      { id: '1', name: 'FooCast', artist: 'Alice', image: 'img1' },
      { id: '2', name: 'BarTalk', artist: 'Bob', image: 'img2' },
    ];

    const sampleEpisode: Episode = {
      id: 'e1',
      title: 'Ep1',
      date: '2025-01-01',
      duration: '10:00',
      audioUrl: 'http://a',
    };

    const TestComp: React.FC = () => {
      const {
        podcasts,
        filteredPodcasts,
        filter,
        setPodcasts,
        setFilter,
        setEpisodes,
        episodes,
        setSelectedPodcast,
        selectedPodcast,
      } = usePodcast();
      return (
        <div>
          <span data-testid="count">{podcasts.length}</span>
          <span data-testid="filtered">{filteredPodcasts.length}</span>
          <span data-testid="filter">{filter}</span>
          <span data-testid="episodes">{episodes.length}</span>
          <span data-testid="selected">
            {selectedPodcast ? selectedPodcast.id : 'null'}
          </span>

          <button onClick={(): void => setPodcasts(samplePodcasts)}>set</button>
          <button onClick={(): void => setFilter('Alice')}>filter</button>
          <button onClick={(): void => setEpisodes([sampleEpisode])}>
            setEpisodes
          </button>
          <button
            onClick={(): void =>
              setSelectedPodcast({
                ...samplePodcasts[0],
                episodeCount: 1,
              } as PodcastDetail)
            }
          >
            select
          </button>
        </div>
      );
    };

    render(
      <PodcastProvider>
        <TestComp />
      </PodcastProvider>
    );

    expect(screen.getByTestId('count').textContent).toBe('0');
    fireEvent.click(screen.getByText('set'));
    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('filtered').textContent).toBe('2');

    fireEvent.click(screen.getByText('filter'));
    expect(screen.getByTestId('filter').textContent).toBe('Alice');
    // filtered should reflect the filter
    expect(screen.getByTestId('filtered').textContent).toBe('1');

    fireEvent.click(screen.getByText('setEpisodes'));
    expect(screen.getByTestId('episodes').textContent).toBe('1');

    fireEvent.click(screen.getByText('select'));
    expect(screen.getByTestId('selected').textContent).toBe('1');
  });

  test('podcastReducer handles actions correctly', () => {
    const s1 = podcastReducer(initialState, {
      type: 'SET_PODCASTS',
      payload: [{ id: '1', name: 'X', artist: 'A', image: 'i' }],
    });
    expect(s1.podcasts.length).toBe(1);

    const s2 = podcastReducer(s1, { type: 'SET_FILTER', payload: 'x' });
    expect(s2.filter).toBe('x');

    const ep: Episode = {
      id: 'e1',
      title: 't',
      date: 'd',
      duration: '1',
      audioUrl: 'u',
    };
    const s3 = podcastReducer(s2, { type: 'SET_EPISODES', payload: [ep] });
    expect(s3.episodes.length).toBe(1);

    const detail = {
      id: '1',
      name: 'X',
      artist: 'A',
      image: 'i',
      episodeCount: 1,
    } as PodcastDetail;
    const s4 = podcastReducer(s3, {
      type: 'SET_SELECTED_PODCAST',
      payload: detail,
    });
    expect(s4.selectedPodcast?.id).toBe('1');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../AppContext';
import { useUI } from '../UIContext';
import { usePodcast } from '../PodcastContext';

// Integration test: ensure AppProvider composes UIProvider and PodcastProvider correctly
describe('AppProvider integration', () => {
  test('provides UI and Podcast contexts to children', () => {
    const TestComp: React.FC = () => {
      const { isLoading, setLoading } = useUI();
      const { podcasts, setPodcasts } = usePodcast();

      return (
        <div>
          <span data-testid="loading">{isLoading ? 'true' : 'false'}</span>
          <span data-testid="count">{podcasts.length}</span>
          <button onClick={(): void => setLoading(true)}>load</button>
          <button
            onClick={(): void =>
              setPodcasts([{ id: '1', name: 'A', artist: 'X', image: 'i' }])
            }
          >
            set
          </button>
        </div>
      );
    };

    render(
      <AppProvider>
        <TestComp />
      </AppProvider>
    );

    // initial state
    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('count').textContent).toBe('0');

    // interact with both contexts
    fireEvent.click(screen.getByText('load'));
    expect(screen.getByTestId('loading').textContent).toBe('true');

    fireEvent.click(screen.getByText('set'));
    expect(screen.getByTestId('count').textContent).toBe('1');
  });
});

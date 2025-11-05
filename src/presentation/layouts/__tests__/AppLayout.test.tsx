import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@app/contexts/AppContext';
import { usePodcast } from '@app/contexts/PodcastContext';
import { AppLayout } from '../AppLayout';

const FilterProbe: React.FC = () => {
  const { filter } = usePodcast();
  return <div data-testid="filter">{filter}</div>;
};

describe('AppLayout', () => {
  test('wires Header search to PodcastContext filter', () => {
    render(
      <AppProvider>
        <AppLayout>
          <FilterProbe />
        </AppLayout>
      </AppProvider>
    );

    const input = screen.getByPlaceholderText(/filter podcasts/i);
    fireEvent.change(input, { target: { value: 'javascript' } });
    expect(screen.getByTestId('filter').textContent).toBe('javascript');
  });
});

import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@app/contexts/AppContext';

jest.mock('@app/hooks/usePodcasts', () => ({
  usePodcasts: jest.fn(),
}));

import { usePodcasts } from '@app/hooks/usePodcasts';
import HomePage from '../HomePage';

const renderWithRouter = (): void => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/podcast/:podcastId"
            element={<div data-testid="detail" />}
          />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

describe('HomePage', () => {
  test('shows loading state', () => {
    (usePodcasts as jest.Mock).mockReturnValue({
      podcasts: [],
      loadingState: 'loading',
      error: null,
      refetch: jest.fn(),
    });
    renderWithRouter();
    expect(screen.getByText(/loading podcasts/i)).toBeInTheDocument();
  });

  test('shows error state', () => {
    (usePodcasts as jest.Mock).mockReturnValue({
      podcasts: [],
      loadingState: 'failed',
      error: 'Network',
      refetch: jest.fn(),
    });
    renderWithRouter();
    expect(screen.getByText(/error loading podcasts/i)).toBeInTheDocument();
    expect(screen.getByText(/network/i)).toBeInTheDocument();
  });

  test('renders grid and navigates on card click', async () => {
    (usePodcasts as jest.Mock).mockReturnValue({
      podcasts: [
        { id: '1', name: 'Pod 1', artist: 'A', image: 'x', summary: 's' },
        { id: '2', name: 'Pod 2', artist: 'B', image: 'y', summary: 't' },
      ],
      loadingState: 'succeeded',
      error: null,
      refetch: jest.fn(),
    });

    renderWithRouter();

    // Will render 2 cards
    expect(screen.getByText(/2 podcasts/i)).toBeInTheDocument();

    // Click the first card by title text
    fireEvent.click(screen.getByText(/pod 1/i));

    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });
});

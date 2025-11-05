import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UIProvider, useUI } from '@app/contexts/UIContext';
import { useLoading } from '../useLoading';

const Probe: React.FC = () => {
  const { isLoading } = useUI();
  const { startLoading, stopLoading, withLoading } = useLoading();
  return (
    <div>
      <div data-testid="isLoading">{String(isLoading)}</div>
      <button onClick={startLoading}>start</button>
      <button onClick={stopLoading}>stop</button>
      <button
        onClick={async (): Promise<void> => {
          await withLoading(Promise.resolve('ok'));
        }}
      >
        with
      </button>
    </div>
  );
};

describe('useLoading', () => {
  test('increments/decrements loading state and withLoading wraps promises', async () => {
    render(
      <UIProvider>
        <Probe />
      </UIProvider>
    );

    expect(screen.getByTestId('isLoading').textContent).toBe('false');

    await act(async () => {
      screen.getByText('start').click();
    });
    expect(screen.getByTestId('isLoading').textContent).toBe('true');

    await act(async () => {
      screen.getByText('stop').click();
    });
    expect(screen.getByTestId('isLoading').textContent).toBe('false');

    await act(async () => {
      screen.getByText('with').click();
    });
    expect(screen.getByTestId('isLoading').textContent).toBe('false');
  });
});

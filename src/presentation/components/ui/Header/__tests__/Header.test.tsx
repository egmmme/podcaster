import React, { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UIProvider, useUI } from '@app/contexts/UIContext';
import { Header } from '../Header';

const WithUI: React.FC<{
  loading?: boolean;
  onSearch: (v: string) => void;
  value: string;
}> = ({ loading = false, onSearch, value }) => {
  const { setLoading, isLoading } = useUI();
  useEffect(() => {
    if (loading !== isLoading) setLoading(loading);
  }, [loading, isLoading, setLoading]);
  return <Header onSearchChange={onSearch} searchValue={value} />;
};

describe('Header', () => {
  test('renders title and triggers onSearchChange', () => {
    const onSearch = jest.fn();
    render(
      <UIProvider>
        <WithUI onSearch={onSearch} value="" />
      </UIProvider>
    );

    expect(
      screen.getByRole('heading', { name: /podcaster/i })
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      /filter podcasts/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'react' } });
    expect(onSearch).toHaveBeenCalledWith('react');
  });

  test('shows loading spinner when isLoading = true', () => {
    const onSearch = jest.fn();
    render(
      <UIProvider>
        <WithUI onSearch={onSearch} value="" loading />
      </UIProvider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

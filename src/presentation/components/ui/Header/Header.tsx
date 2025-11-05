import React from 'react';
import { useUI } from '@app/contexts/UIContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Header.css';

interface HeaderProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchValue,
}) => {
  const { isLoading } = useUI();

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onSearchChange(event.target.value);
  };

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <a href="/" className="header__link">
            Podcaster
          </a>
        </h1>

        <div className="header__controls">
          <input
            type="text"
            placeholder="Filter podcasts..."
            value={searchValue}
            onChange={handleSearchChange}
            className="header__search"
          />

          {isLoading && (
            <div className="header__loading">
              <LoadingSpinner size="small" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

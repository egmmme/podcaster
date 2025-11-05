import React from 'react';
import { useUI } from '@app/contexts/UIContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Header.css';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /** Callback when the search input value changes */
  onSearchChange: (value: string) => void;
  /** Current search input value */
  searchValue: string;
}

/**
 * App header with title, search input, and a loading indicator from UI context.
 */
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

import React from 'react';
import { Header } from '../components/ui/Header/Header';
import { usePodcast } from '@app/contexts/PodcastContext';
import './AppLayout.css';

/**
 * Props for the AppLayout component.
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Top-level layout that renders the app header and wraps page content.
 * It wires the global search filter from PodcastContext into the Header.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { filter, setFilter } = usePodcast();

  return (
    <div className="app-layout">
      <Header searchValue={filter} onSearchChange={setFilter} />

      <main className="app-layout__main">
        <div className="app-layout__content">{children}</div>
      </main>
    </div>
  );
};

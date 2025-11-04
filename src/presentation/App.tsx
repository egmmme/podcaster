import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../app/contexts/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner/LoadingSpinner';
import '../shared/styles/variables.css';

// Route-based code splitting
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const PodcastDetailPage = React.lazy(() => import('./pages/PodcastDetailPage/PodcastDetailPage'));
const EpisodeDetailPage = React.lazy(() => import('./pages/EpisodeDetailPage/EpisodeDetailPage'));

// Componente de fallback para Suspense
const PageLoader: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  }}>
    <LoadingSpinner size="large" />
  </div>
);

/**
 * App
 * The root component of the podcast application.
 * 
 * - Wraps the app in AppProvider to supply global context (UI, Podcast).
 * - Sets up routing for main pages:
 *   - "/" renders HomePage (podcast list & search)
 *   - "/podcast/:podcastId" renders PodcastDetailPage (podcast details & episodes)
 *   - "/podcast/:podcastId/episode/:episodeId" renders EpisodeDetailPage (episode details)
 * 
 * @returns {JSX.Element} The application root.
 */
const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
              <Route
                path="/podcast/:podcastId/episode/:episodeId"
                element={<EpisodeDetailPage />}
              />
            </Routes>
          </Suspense>
        </AppLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
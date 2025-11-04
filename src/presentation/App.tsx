import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../app/contexts/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage/HomePage';
import '../shared/styles/variables.css';

// Temporary components for routing demonstration
const PodcastDetailPage = () => <div>Podcast Detail Page - Coming Soon</div>;
const EpisodeDetailPage = () => <div>Episode Detail Page - Coming Soon</div>;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              element={<EpisodeDetailPage />}
            />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
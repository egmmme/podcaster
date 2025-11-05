# Features

## Core Features

### Podcast Browsing

- **Top 100 Podcasts**: Displays the top 100 podcasts from Apple iTunes API
- **Real-time Search/Filter**: Filter podcasts by title and author as you type
- **Performance**: 24-hour client-side caching for instant loading
- **Responsive Grid**: Adaptive layout for all screen sizes

### Podcast Details

- **Episode Listings**: Complete list of available episodes with metadata
- **Publication Dates**: Shows when each episode was released
- **Secure HTML Rendering**: Safe display of podcast descriptions with DOMPurify
- **Sidebar Navigation**: Persistent podcast information with quick links

### Episode Player

- **Native HTML5 Audio**: Built-in browser audio player controls
- **Safe Content Rendering**: All episode descriptions sanitized with DOMPurify
- **Responsive Controls**: Touch-friendly on mobile devices
- **Metadata Display**: Episode title and description alongside player

## UI/UX Features

### Responsive Design

The application implements a desktop-first responsive approach:

- **Desktop (1024px+)**: Full sidebar + content layout with optimal spacing
- **Tablet (768px-1023px)**: Compact sidebar, optimized content width
- **Mobile (<768px)**: Single column layout, touch-friendly interface, stacked components

All components adapt seamlessly using CSS Grid, Flexbox, and strategic breakpoints.

For detailed responsive design guidelines, see [Responsive Design Guide](./responsive-design-guide.md).

### Design System

- **CSS Variables**: Consistent theming through design tokens in `variables.css`
- **Custom Components**: All UI built from scratch (no external UI libraries)
- **Accessible Player**: Native HTML5 audio controls for maximum accessibility
- **Loading States**: Spinners and feedback during data fetching
- **Error Handling**: User-friendly error messages throughout the application

### User Experience

- **Instant Feedback**: Loading indicators for all async operations
- **Smart Caching**: Data persisted locally to minimize API calls
- **Smooth Navigation**: Client-side routing with React Router for instant page transitions
- **Empty States**: Helpful messages when no content matches filters
- **Persistent Search**: Filter state maintained across navigation

## Data Flow

### Podcast List Flow

1. User visits homepage
2. `usePodcasts` hook checks cache
3. If cache expired or missing, fetch from iTunes API
4. Store in localStorage with timestamp
5. Display podcasts with real-time filtering

### Podcast Detail Flow

1. User clicks podcast card
2. Navigate to `/podcast/:podcastId`
3. `usePodcastDetail` hook fetches episodes via CORS proxy
4. Cache episodes with 24-hour expiration
5. Display sidebar + episode list

### Episode Playback Flow

1. User clicks episode row
2. Navigate to `/podcast/:podcastId/episode/:episodeId`
3. Load cached podcast and episode data
4. Render sanitized description with DOMPurify
5. Initialize HTML5 audio player with episode URL

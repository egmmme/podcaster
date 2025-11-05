# Features

## Core

- Top 100 iTunes podcasts with real-time search/filter
- Responsive grid and accessible UI
- 24h client-side caching for instant loads
- Episode lists with dates and metadata
- Secure HTML rendering (DOMPurify) for descriptions
- Native HTML5 audio player
- Persistent sidebar with quick links

## Data flow (at a glance)

- List: `usePodcasts` → cache check → fetch if stale → render filtered list
- Detail: `usePodcastDetail(id)` → fetch episodes via CORS proxy → cache → render
- Playback: navigate to episode → sanitize description → play via audio element

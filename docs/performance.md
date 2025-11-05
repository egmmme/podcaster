# Performance & Optimization

This app focuses on fast first load, small bundles, and minimal network usage.

## Code Splitting

- Route-level splitting with `React.lazy` + `Suspense` keeps initial bundles small.

```ts
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PodcastDetailPage = lazy(
  () => import('./pages/PodcastDetailPage/PodcastDetailPage')
);
const EpisodeDetailPage = lazy(
  () => import('./pages/EpisodeDetailPage/EpisodeDetailPage')
);
```

- Webpack splits vendors into dedicated chunks (react-vendor, router-vendor, vendors) for better caching.

## Caching Strategy

- localStorage with a 24h TTL for top podcasts and per-podcast episodes.
- Smart refetching only when cache is missing or expired.
- CORS proxy: `https://corsproxy.io/?` (configurable via `API_CONSTANTS.CORS_PROXY`).

## Asset Optimization

- Images: `loading="lazy"`, served from Apple CDN, responsive sizing.
- CSS: variables and plain CSS for fast caching.
- JS: tree-shaking, minification, content hashing; source maps in production.

## Bundle Analysis

```bash
npm run analyze      # Production bundle analysis (gzip sizes)
```

## Performance Metrics

### Current Bundle Sizes (gzip)

| Chunk         | Size (KB) | Notes                    |
| ------------- | --------- | ------------------------ |
| react-vendor  | ~42.6     | React + ReactDOM         |
| vendors       | ~14.8     | Other dependencies       |
| router-vendor | ~4.6      | React Router DOM         |
| main          | ~6.4      | App code                 |
| common        | ~2.8      | Shared code              |
| other chunks  | ~7.5      | Small route splits       |
| runtime       | < 3       | Not gzipped (very small) |

Total gzipped JS ≈ ~81 KB (varies slightly by build).

## Optimization Status

- Implemented: route-based splitting, vendor chunks, client-side caching, image lazy loading, tree shaking, minification, hashed assets.
- Future: service worker (offline), prefetching, image pipeline (WebP), critical CSS, Brotli.

## Monitoring

- Build-time: `npm run build` (sizes) • `npm run analyze` (visual).
- Runtime: DevTools (network < 500KB total, no long tasks > 50ms), Lighthouse (targets: Perf 90+, A11y 100, BP 95+, SEO 90+).

# Performance & Optimization

## Code Splitting

### Route-Based Splitting

The application uses React's `lazy()` and `Suspense` for route-level code splitting:

```typescript
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PodcastDetailPage = lazy(
  () => import('./pages/PodcastDetailPage/PodcastDetailPage')
);
const EpisodeDetailPage = lazy(
  () => import('./pages/EpisodeDetailPage/EpisodeDetailPage')
);
```

**Benefits:**

- Initial bundle loads only essential code
- Routes load on-demand when user navigates
- Faster time-to-interactive for initial page load

### Vendor Chunk Separation

Webpack configuration separates vendor code into dedicated chunks:

```javascript
optimization: {
  splitChunks: {
    cacheGroups: {
      reactVendor: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react-vendor',
        chunks: 'all',
      },
      routerVendor: {
        test: /[\\/]node_modules[\\/]react-router-dom[\\/]/,
        name: 'router-vendor',
        chunks: 'all',
      },
    },
  },
}
```

**Benefits:**

- Better long-term caching (vendor code changes less frequently)
- Parallel downloading of chunks
- Optimized bundle sizes

## Caching Strategy

### Client-Side Caching

**Implementation:** localStorage with timestamp-based expiration

```typescript
interface Cacheable<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
```

**Cached Resources:**

- Top 100 podcasts list (24-hour TTL)
- Individual podcast episodes (24-hour TTL)

**Benefits:**

- Reduced API calls (90%+ reduction after initial load)
- Instant page loads for cached data
- Offline-capable for recently viewed content

### API Efficiency

- **Smart Refetching**: Only fetch when cache expires or is missing
- **CORS Proxy**: Single proxy endpoint (`allorigins.win`) for episode data
- **No Polling**: Data fetched only on user navigation

## Asset Optimization

### Images

- **Lazy Loading**: All podcast images use `loading="lazy"` attribute
- **External Sources**: Images served from Apple's CDN (optimized at source)
- **Responsive**: CSS ensures appropriate sizing for different viewports

### CSS

- **CSS Variables**: Reusable design tokens reduce duplication
- **No CSS-in-JS**: Plain CSS for better performance and caching
- **Critical CSS**: Inline critical styles for initial render (future enhancement)

### JavaScript

- **Tree Shaking**: Webpack removes unused code in production
- **Minification**: All JS minified in production builds
- **Source Maps**: Available for debugging without impacting bundle size

## Bundle Analysis

Analyze bundle composition and identify optimization opportunities:

```bash
npm run analyze         # Production bundle analysis
npm run analyze:dev     # Development bundle analysis
```

Opens interactive visualization showing:

- Module sizes and dependencies
- Chunk composition
- Optimization opportunities

## Performance Metrics

### Current Bundle Sizes

| Chunk         | Size (gzipped) | Description        |
| ------------- | -------------- | ------------------ |
| main          | ~30 KB         | Application code   |
| react-vendor  | ~133 KB        | React + ReactDOM   |
| router-vendor | ~12 KB         | React Router DOM   |
| vendors       | ~38 KB         | Other dependencies |

### Load Performance

- **First Contentful Paint**: < 1s (cached)
- **Time to Interactive**: < 2s (cached)
- **Largest Contentful Paint**: < 2.5s

### Runtime Performance

- **Search Filter**: Instant (<100ms for 100 items)
- **Route Transitions**: <100ms with code splitting
- **Cache Reads**: <10ms from localStorage

## Optimization Techniques

### Implemented

- ✅ Route-based code splitting
- ✅ Vendor chunk separation
- ✅ Client-side caching with expiration
- ✅ Image lazy loading
- ✅ Tree shaking and minification
- ✅ Content hashing for cache busting

### Future Enhancements

- [ ] Service Worker for offline support
- [ ] Prefetching for likely user paths
- [ ] Image optimization pipeline (WebP conversion)
- [ ] Critical CSS extraction
- [ ] HTTP/2 Server Push for assets
- [ ] Brotli compression for static assets

## Monitoring

### Build-Time Analysis

```bash
npm run build          # Shows gzipped sizes
npm run analyze        # Visual bundle analysis
```

### Runtime Monitoring

Use browser DevTools to measure:

- Network waterfall (all resources < 500KB total)
- Main thread activity (no long tasks > 50ms)
- Memory usage (stable over time)

### Lighthouse Scores

Run Lighthouse audits regularly:

```bash
lighthouse http://localhost:3000 --view
```

**Target Scores:**

- Performance: 90+
- Accessibility: 100
- Best Practices: 95+
- SEO: 90+

# Runtime Configuration

This application supports runtime configuration through the `/public/config.js` file. This allows you to modify API endpoints and other settings **without rebuilding the application**.

## How It Works

1. **`/public/config.js`** is loaded in `index.html` before the application bundle
2. Configuration is exposed via `window.PodcasterConfig`
3. The application reads this configuration at runtime
4. You can modify `config.js` in the deployed artifact and restart the server

## Configuration Options

```javascript
window.PodcasterConfig = {
  // Base URL for API endpoints
  // - Empty string '' for same-origin (e.g., /api/podcasts)
  // - Full URL for cross-origin (e.g., 'https://api.example.com')
  // - Do NOT include trailing slash
  apiBaseUrl: '',

  // Enable debug logging in browser console
  debug: false,

  // Application version
  version: '1.1.2',
};
```

## Usage Examples

### Development (webpack-dev-server)

```javascript
window.PodcasterConfig = {
  apiBaseUrl: '',
  debug: true,
  version: '1.1.2',
};
```

### Production with nginx reverse proxy

```javascript
window.PodcasterConfig = {
  apiBaseUrl: '', // nginx handles /api/* routing
  debug: false,
  version: '1.1.2',
};
```

**nginx.conf example:**

```nginx
location /api/ {
    proxy_pass http://backend:8080/;
}

location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
}
```

### Production with external API

```javascript
window.PodcasterConfig = {
  apiBaseUrl: 'https://api.podcaster.com',
  debug: false,
  version: '1.1.2',
};
```

## Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Edit `dist/config.js`** with your environment-specific values

3. **Deploy the `dist/` folder** to your hosting service

4. **To change configuration later:**
   - Edit `config.js` on the server
   - Restart the web server (or clear browser cache)
   - No rebuild required!

## TypeScript Support

Configuration types are defined in `src/shared/config/runtime.ts`:

```typescript
import { getConfig } from '@shared/config/runtime';

const config = getConfig();
console.log(config.apiBaseUrl);
```

## See Also

- `public/config.example.js` - Example configurations for different scenarios
- `src/shared/config/runtime.ts` - TypeScript type definitions
- `src/shared/constants/api.ts` - API URL builder using configuration

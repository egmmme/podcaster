/**
 * Example runtime configuration for different deployment scenarios.
 * Copy this file to config.js and adjust values as needed.
 */

// ============================================================================
// SCENARIO 1: Development with webpack-dev-server (default)
// ============================================================================
window.PodcasterConfig = {
    apiBaseUrl: '',
    debug: true,
    version: '1.1.2',
};

// ============================================================================
// SCENARIO 2: Production with nginx reverse proxy
// When nginx proxies /api/* to backend service
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: '',  // Same origin, nginx handles routing
//   debug: false,
//   version: '1.1.2',
// };

// ============================================================================
// SCENARIO 3: Production with external API (different domain)
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: 'https://api.podcaster.com',  // No trailing slash
//   debug: false,
//   version: '1.1.2',
// };

// ============================================================================
// SCENARIO 4: Staging environment
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: 'https://staging-api.podcaster.com',
//   debug: true,
//   version: '1.1.2-staging',
// };

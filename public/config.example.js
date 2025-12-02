/**
 * Example runtime configuration for different deployment scenarios.
 * Copy this file to config.js and adjust values as needed.
 */

// ============================================================================
// SCENARIO 1: Development with webpack-dev-server (iTunes API)
// ============================================================================
window.PodcasterConfig = {
    apiBaseUrl: '',
    apiMode: 'itunes',  // Use iTunes API directly via CORS proxy
    debug: true,
    version: '1.2.0',
};

// ============================================================================
// SCENARIO 2: Production with backend API and nginx reverse proxy
// When nginx proxies /api/* to backend service
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: '',  // Same origin, nginx handles routing
//   apiMode: 'backend',  // Use backend API endpoints
//   debug: false,
//   version: '1.2.0',
// };

// ============================================================================
// SCENARIO 3: Production with external backend API (different domain)
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: 'https://api.podcaster.com',  // No trailing slash
//   apiMode: 'backend',  // Use backend API endpoints
//   debug: false,
//   version: '1.2.0',
// };

// ============================================================================
// SCENARIO 4: Staging environment with backend API
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: 'https://staging-api.podcaster.com',
//   apiMode: 'backend',
//   debug: true,
//   version: '1.2.0-staging',
// };

// ============================================================================
// SCENARIO 5: Production using iTunes API (no backend)
// ============================================================================
// window.PodcasterConfig = {
//   apiBaseUrl: '',
//   apiMode: 'itunes',  // Direct iTunes API access
//   debug: false,
//   version: '1.2.0',
// };
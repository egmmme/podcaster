/**
 * Runtime configuration for Podcaster application.
 * This file is loaded before the main application bundle and provides
 * environment-specific settings that can be modified without rebuilding.
 * 
 * Usage: Access via window.PodcasterConfig in the application code.
 */
window.PodcasterConfig = {
    /**
     * Base URL for API endpoints. 
     * - Leave empty string '' for same-origin API (e.g., /api/podcasts)
     * - Set to full URL for cross-origin API (e.g., 'https://api.example.com')
     * - Do NOT include trailing slash
     * 
     * Examples:
     * - Development (Vite/webpack-dev-server with proxy): ''
     * - Production (nginx proxy): ''
     * - External API: 'https://api.podcaster.com'
     */
    apiBaseUrl: '',

    /**
     * API mode: 'backend' or 'itunes'
     * - 'backend': Use backend API endpoints (/api/podcasts, /api/podcasts/:id)
     * - 'itunes': Use iTunes API directly via CORS proxy (default)
     */
    apiMode: 'itunes',

    /**
     * Enable debug logging in the browser console.
     */
    debug: false,

    /**
     * Application version (injected during build if needed)
     */
    version: '1.2.0',
};
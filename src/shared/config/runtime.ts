/**
 * API mode type
 */
export type ApiMode = 'backend' | 'itunes';

/**
 * Runtime configuration interface for Podcaster application.
 * Configuration is loaded from /config.js and available at window.PodcasterConfig
 */
export interface PodcasterConfig {
  /**
   * Base URL for API endpoints.
   * - Empty string '' for same-origin API
   * - Full URL for cross-origin API (without trailing slash)
   */
  apiBaseUrl: string;

  /**
   * API mode: 'backend' or 'itunes'
   * - 'backend': Use backend API endpoints
   * - 'itunes': Use iTunes API directly via CORS proxy
   */
  apiMode: ApiMode;

  /**
   * Enable debug logging in the browser console
   */
  debug: boolean;

  /**
   * Application version
   */
  version: string;
}

/**
 * Extends the Window interface to include PodcasterConfig
 */
declare global {
  interface Window {
    PodcasterConfig?: PodcasterConfig;
  }
}

/**
 * Default configuration fallback when config.js is not loaded
 */
export const DEFAULT_CONFIG: PodcasterConfig = {
  apiBaseUrl: '',
  apiMode: 'itunes',
  debug: false,
  version: '1.2.1',
};

/**
 * Get runtime configuration with fallback to defaults
 */
export const getConfig = (): PodcasterConfig => {
  return window.PodcasterConfig || DEFAULT_CONFIG;
};

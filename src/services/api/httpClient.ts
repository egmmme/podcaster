import { API_CONSTANTS } from '@shared/constants/api';

/**
 * HTTP client wrapper for making API requests with optional CORS proxy support.
 */
export class HttpClient {
  /**
   * Performs a GET request to the specified URL.
   * @param url - The target URL to fetch from
   * @returns Promise resolving to the parsed JSON response
   * @throws {Error} If the HTTP response status is not OK (200-299)
   */
  static async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Performs a GET request through a CORS proxy to bypass restrictions.
   * @param url - The target URL to fetch from (will be proxied)
   * @returns Promise resolving to the parsed JSON response
   */
  static async getWithCors<T>(url: string): Promise<T> {
    const corsUrl = `${API_CONSTANTS.CORS_PROXY}${encodeURIComponent(url)}`;
    return this.get<T>(corsUrl);
  }
}

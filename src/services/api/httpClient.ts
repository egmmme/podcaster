/**
 * HTTP client wrapper for making API requests.
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

}

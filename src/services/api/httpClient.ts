import { API_CONSTANTS } from '@shared/constants/api';

export class HttpClient {
  static async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getWithCors<T>(url: string): Promise<T> {
    const corsUrl = `${API_CONSTANTS.CORS_PROXY}${encodeURIComponent(url)}`;
    return this.get<T>(corsUrl);
  }
}

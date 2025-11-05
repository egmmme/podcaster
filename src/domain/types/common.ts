/**
 * Base interface for timestamped data.
 */
export interface Timestamped {
  /** Unix timestamp in milliseconds */
  lastUpdated: number;
}

/**
 * Generic wrapper for cached data with timestamp.
 */
export interface Cacheable<T> extends Timestamped {
  /** The cached data of type T */
  data: T;
}

/**
 * Represents the state of an async operation.
 * - idle: Not started
 * - loading: In progress
 * - succeeded: Completed successfully
 * - failed: Completed with error
 */
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

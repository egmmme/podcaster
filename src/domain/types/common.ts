export interface Timestamped {
  lastUpdated: number;
}

export interface Cacheable<T> extends Timestamped {
  data: T;
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

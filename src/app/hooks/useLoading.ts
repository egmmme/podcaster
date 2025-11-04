import { useState, useCallback } from 'react';
import { useUI } from '../contexts/UIContext';

export const useLoading = (): {
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
  isLoading: boolean;
} => {
  const { setLoading } = useUI();
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount((prev) => {
      const newCount = prev + 1;
      setLoading(newCount > 0);
      return newCount;
    });
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoadingCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      setLoading(newCount > 0);
      return newCount;
    });
  }, [setLoading]);

  const withLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      startLoading();
      try {
        const result = await promise;
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    startLoading,
    stopLoading,
    withLoading,
    isLoading: loadingCount > 0,
  };
};

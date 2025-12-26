import { useState, useCallback } from 'react';

import { requestCache } from '../utils/requestCache';

import { useCancellableRequest } from './useCancellableRequest';

interface UseApiRequestOptions<T> {
  cacheKey?: string;
  cacheTTL?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export const useApiRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { createAbortController, cancel } = useCancellableRequest();

  const execute = useCallback(
    async (apiCall: () => Promise<T>, options: UseApiRequestOptions<T> = {}): Promise<T | null> => {
      const { cacheKey, cacheTTL, onSuccess, onError } = options;

      // Check cache first
      if (cacheKey) {
        const cached = requestCache.get<T>(cacheKey);
        if (cached) {
          setData(cached);
          onSuccess?.(cached);
          return cached;
        }
      }

      setLoading(true);
      setError(null);

      try {
        const controller = createAbortController();
        const result = await apiCall();

        // Check if request was aborted
        if (controller.signal.aborted) {
          return null;
        }

        // Cache result if cache key provided
        if (cacheKey) {
          requestCache.set(cacheKey, result, cacheTTL);
        }

        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [createAbortController]
  );

  return {
    execute,
    loading,
    error,
    data,
    cancel,
  };
};


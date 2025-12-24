import { useEffect, useRef, useCallback } from 'react';

export const useCancellableRequest = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const createAbortController = useCallback(() => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current;
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      cancel();
    };
  }, [cancel]);

  return {
    createAbortController,
    cancel,
    signal: abortControllerRef.current?.signal,
  };
};


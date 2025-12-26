import { useState, useCallback } from 'react';

import { rateLimiter } from '../utils/rateLimiter';

interface RateLimitState {
  isAllowed: boolean;
  remainingRequests: number;
  timeUntilReset: number;
}

export const useRateLimit = (key: string = 'default') => {
  const [state, setState] = useState<RateLimitState>(() => ({
    isAllowed: rateLimiter.isAllowed(key),
    remainingRequests: rateLimiter.getRemainingRequests(key),
    timeUntilReset: rateLimiter.getTimeUntilReset(key),
  }));

  const checkRateLimit = useCallback((): boolean => {
    const isAllowed = rateLimiter.isAllowed(key);
    const remainingRequests = rateLimiter.getRemainingRequests(key);
    const timeUntilReset = rateLimiter.getTimeUntilReset(key);

    setState({
      isAllowed,
      remainingRequests,
      timeUntilReset,
    });

    return isAllowed;
  }, [key]);

  const reset = useCallback(() => {
    rateLimiter.reset(key);
    setState({
      isAllowed: true,
      remainingRequests: rateLimiter.getRemainingRequests(key),
      timeUntilReset: 0,
    });
  }, [key]);

  return {
    ...state,
    checkRateLimit,
    reset,
  };
};


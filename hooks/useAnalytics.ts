import { useEffect } from 'react';

import { trackPageView, trackEvent } from '../utils/analytics';

export const usePageTracking = (path: string): void => {
  useEffect(() => {
    trackPageView(path);
  }, [path]);
};

export const useAnalytics = () => {
  return {
    trackEvent,
    trackPageView,
  };
};


import { useEffect } from 'react';

import { measureWebVitals, WebVitals } from '../utils/performance';

export const useWebVitals = (onReport?: (metric: WebVitals) => void) => {
  useEffect(() => {
    if (onReport) {
      measureWebVitals(onReport);
    }
  }, [onReport]);
};


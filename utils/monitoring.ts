/**
 * Performance monitoring utilities
 */

import { measureWebVitals, WebVitals } from './performance';
import { captureMessage } from './sentry';

/**
 * Initializes performance monitoring
 */
export const initMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Monitor Web Vitals
  measureWebVitals((metric: WebVitals) => {
    // Log poor performance metrics
    if (metric.rating === 'poor') {
      captureMessage(`Poor ${metric.name}: ${metric.value}`, 'warning');
    }

    // Send to analytics
    // trackEvent('web_vital', {
    //   name: metric.name,
    //   value: metric.value,
    //   rating: metric.rating,
    // });
  });

  // Monitor API performance
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const start = performance.now();
    try {
      const response = await originalFetch(...args);
      const duration = performance.now() - start;

      if (duration > 3000) {
        captureMessage(`Slow API call: ${args[0]} took ${duration.toFixed(2)}ms`, 'warning');
      }

      return response;
    } catch (error) {
      captureMessage(`API error: ${args[0]}`, 'error');
      throw error;
    }
  };
};


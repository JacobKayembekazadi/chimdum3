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
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'unknown';
    
    try {
      const response = await originalFetch(...args);
      const duration = performance.now() - start;

      if (duration > 3000) {
        captureMessage(`Slow API call: ${url} took ${duration.toFixed(2)}ms`, 'warning');
      }

      // Check if response is an error status
      if (!response.ok && url.includes('/api/')) {
        const errorText = await response.clone().text().catch(() => 'Unable to read error response');
        console.error(`[ERROR] API error: ${url} - Status: ${response.status}`, errorText);
        captureMessage(`API error: ${url} - Status: ${response.status}`, 'error');
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      captureMessage(`API error: ${url} - ${errorMessage}`, 'error');
      console.error(`[ERROR] API error: ${url}`, error);
      throw error;
    }
  };
};


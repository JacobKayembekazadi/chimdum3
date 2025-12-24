/**
 * Performance monitoring utilities
 */

export interface WebVitals {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Measures and reports Web Vitals
 */
export const measureWebVitals = (onPerfEntry?: (metric: WebVitals) => void): void => {
  if (!onPerfEntry || typeof window === 'undefined') {
    return;
  }

  // Measure Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };

        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime || 0;
          onPerfEntry({
            name: 'LCP',
            value,
            delta: value,
            id: lastEntry.name,
            rating: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor',
          });
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Performance Observer not supported
    }
  }

  // Measure First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'first-input' && 'processingStart' in entry) {
            const fidEntry = entry as PerformanceEventTiming;
            const value = fidEntry.processingStart - fidEntry.startTime;
            onPerfEntry({
              name: 'FID',
              value,
              delta: value,
              id: entry.name,
              rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
            });
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Performance Observer not supported
    }
  }

  // Measure Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries() as PerformanceEntry[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        onPerfEntry({
          name: 'CLS',
          value: clsValue,
          delta: clsValue,
          id: 'cls',
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Performance Observer not supported
    }
  }
};

/**
 * Measures page load time
 */
export const measurePageLoad = (): number => {
  if (typeof window === 'undefined' || !window.performance) {
    return 0;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    return navigation.loadEventEnd - navigation.fetchStart;
  }

  return 0;
};

/**
 * Measures API call duration
 */
export const measureApiCall = async <T>(
  apiCall: () => Promise<T>,
  endpoint: string
): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await apiCall();
  const duration = performance.now() - start;

  // Log slow API calls
  if (duration > 3000) {
    console.warn(`Slow API call detected: ${endpoint} took ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
};

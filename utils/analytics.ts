/**
 * Analytics utilities
 * Placeholder for analytics integration (Google Analytics, Plausible, etc.)
 */

export const trackEvent = (eventName: string, properties?: Record<string, unknown>): void => {
  // Analytics tracking would go here
  // Example for Google Analytics:
  // gtag('event', eventName, properties);

  if (import.meta.env.DEV) {
    console.log('Analytics event:', eventName, properties);
  }
};

export const trackPageView = (path: string): void => {
  // Analytics page view tracking
  // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });

  if (import.meta.env.DEV) {
    console.log('Page view:', path);
  }
};

export const trackConversion = (conversionName: string, value?: number): void => {
  trackEvent('conversion', {
    name: conversionName,
    value,
  });
};


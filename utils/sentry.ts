/**
 * Sentry error tracking configuration
 * Note: This is a placeholder. Configure with your actual Sentry DSN in production.
 */

export const initSentry = (): void => {
  // Sentry initialization would go here
  // Example:
  // import * as Sentry from "@sentry/react";
  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   environment: process.env.NODE_ENV,
  //   tracesSampleRate: 1.0,
  // });

  if (import.meta.env.DEV) {
    console.log('Sentry would be initialized in production');
  }
};

export const captureException = (error: Error, context?: Record<string, unknown>): void => {
  // Sentry.captureException(error, { extra: context });
  console.error('Error captured:', error, context);
};

export const captureMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
): void => {
  // Sentry.captureMessage(message, level);
  console.log(`[${level.toUpperCase()}]`, message);
};


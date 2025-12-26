/**
 * Error logging utilities
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  error?: Error;
  context?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Logs an error with context information
 */
export const logError = (error: Error, context?: Record<string, unknown>): void => {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    error,
    context,
    timestamp: new Date(),
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('Error logged:', errorInfo);
  }

  // In production, you would send this to an error tracking service
  // Example: Sentry.captureException(error, { extra: context });
};

/**
 * Logs a React error boundary error
 */
export const logReactError = (error: Error, errorInfo: { componentStack?: string }): void => {
  logError(error, {
    componentStack: errorInfo.componentStack,
    type: 'react-error-boundary',
  });
};

/**
 * Creates a user-friendly error message
 */
export const getUserFriendlyErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();

  // Check for specific API configuration errors first
  if (message.includes('api key not configured') || message.includes('api configuration error')) {
    return 'API configuration error. Please ensure the API key is properly set in environment variables.';
  }

  if (message.includes('api') || message.includes('network') || message.includes('fetch')) {
    // Check if it's a development environment issue
    if (message.includes('vercel') || message.includes('endpoint may not be available')) {
      return error.message; // Return the more specific message
    }
    return 'Unable to connect to the wellness guide. Please check your internet connection and try again.';
  }

  if (message.includes('timeout')) {
    return 'The request took too long. Please try again.';
  }

  if (message.includes('permission') || message.includes('microphone')) {
    return 'Microphone access is required for voice assessment. Please enable microphone permissions and try again.';
  }

  if (message.includes('api key') || message.includes('authentication')) {
    return 'Configuration error. Please contact support if this issue persists.';
  }

  return 'Something went wrong. Please try again or contact support if the problem continues.';
};


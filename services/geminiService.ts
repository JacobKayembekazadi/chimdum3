import { UserAnswers } from '../types';
import { formatApiError } from '../utils/apiHelpers';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorLogger';
import { rateLimiter } from '../utils/rateLimiter';

export class GeminiServiceError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

/**
 * Generates a wellness recommendation using Vercel Edge Function (secure API key handling)
 */
export const generateWellnessRecommendation = async (answers: UserAnswers): Promise<string> => {
  // Check rate limit
  if (!rateLimiter.isAllowed('api-request')) {
    const timeUntilReset = rateLimiter.getTimeUntilReset('api-request');
    const seconds = Math.ceil(timeUntilReset / 1000);
    throw new GeminiServiceError(
      `Rate limit exceeded. Please wait ${seconds} second(s) before trying again.`
    );
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('/api/wellness', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || `API request failed with status ${response.status}`;
      
      // Provide more specific error messages
      if (response.status === 500 && errorData.error === 'API key not configured') {
        throw new GeminiServiceError(
          'API configuration error. Please ensure GEMINI_API_KEY or DEEPSEEK_API_KEY is set in environment variables.'
        );
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.recommendation || data.recommendation.trim() === '') {
      throw new GeminiServiceError('Empty response from API');
    }

    return data.recommendation;
  } catch (error) {
    // Handle AbortError (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new GeminiServiceError('Request timed out. Please check your internet connection and try again.');
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new GeminiServiceError(
        'Unable to connect to the wellness guide. The API endpoint may not be available. Please ensure you are running the development server with Vercel CLI (vercel dev) or the API is properly deployed.'
      );
    }
    logError(error instanceof Error ? error : new Error(formatApiError(error)), {
      context: 'generateWellnessRecommendation',
      answers,
    });

    // Re-throw as GeminiServiceError for better error handling
    if (error instanceof GeminiServiceError) {
      throw error;
    }

    const friendlyMessage =
      error instanceof Error
        ? getUserFriendlyErrorMessage(error)
        : 'Unable to generate recommendation. Please try again.';

    throw new GeminiServiceError(friendlyMessage, error);
  }
};

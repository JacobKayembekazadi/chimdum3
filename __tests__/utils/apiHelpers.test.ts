import { describe, it, expect, vi, beforeEach } from 'vitest';

import { retryWithBackoff, formatApiError, createAbortController } from '../../utils/apiHelpers';

describe('apiHelpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('retryWithBackoff', () => {
    it('should succeed on first attempt', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retryWithBackoff(fn);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce('success');

      const result = await retryWithBackoff(fn, { maxAttempts: 2, initialDelay: 10 });
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should throw after max attempts', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(retryWithBackoff(fn, { maxAttempts: 2, initialDelay: 10 })).rejects.toThrow(
        'Network error'
      );
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('formatApiError', () => {
    it('should format Error objects', () => {
      const error = new Error('Test error');
      expect(formatApiError(error)).toBe('Test error');
    });

    it('should format string errors', () => {
      expect(formatApiError('String error')).toBe('String error');
    });

    it('should handle unknown error types', () => {
      expect(formatApiError({ unknown: 'error' })).toBe('An unexpected error occurred');
    });
  });

  describe('createAbortController', () => {
    it('should create an AbortController', () => {
      const controller = createAbortController(1000);
      expect(controller).toBeInstanceOf(AbortController);
      expect(controller.signal).toBeDefined();
    });
  });
});


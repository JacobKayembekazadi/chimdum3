import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { validateEnvironment, isEnvironmentValid, getApiKey } from '../../utils/envValidation';

describe('envValidation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateEnvironment', () => {
    it('should throw error when API key is missing', () => {
      delete process.env.GEMINI_API_KEY;
      delete process.env.API_KEY;

      expect(() => validateEnvironment()).toThrow('GEMINI_API_KEY is not set');
    });

    it('should throw error when API key is placeholder', () => {
      process.env.GEMINI_API_KEY = 'your_api_key_here';

      expect(() => validateEnvironment()).toThrow('GEMINI_API_KEY is not set');
    });

    it('should return config when API key is valid', () => {
      process.env.GEMINI_API_KEY = 'valid_api_key_12345';

      const config = validateEnvironment();
      expect(config.GEMINI_API_KEY).toBe('valid_api_key_12345');
      expect(config.API_TIMEOUT).toBe(30000);
    });
  });

  describe('isEnvironmentValid', () => {
    it('should return false when API key is missing', () => {
      delete process.env.GEMINI_API_KEY;
      delete process.env.API_KEY;

      expect(isEnvironmentValid()).toBe(false);
    });

    it('should return true when API key is valid', () => {
      process.env.GEMINI_API_KEY = 'valid_api_key_12345';

      expect(isEnvironmentValid()).toBe(true);
    });
  });

  describe('getApiKey', () => {
    it('should return API key from GEMINI_API_KEY', () => {
      process.env.GEMINI_API_KEY = 'test_key';
      expect(getApiKey()).toBe('test_key');
    });

    it('should return API key from API_KEY if GEMINI_API_KEY not set', () => {
      delete process.env.GEMINI_API_KEY;
      process.env.API_KEY = 'fallback_key';
      expect(getApiKey()).toBe('fallback_key');
    });

    it('should return empty string when no key is set', () => {
      delete process.env.GEMINI_API_KEY;
      delete process.env.API_KEY;
      expect(getApiKey()).toBe('');
    });
  });
});


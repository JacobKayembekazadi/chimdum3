/**
 * Rate limiting utilities
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60000, // 1 minute
};

class RateLimiter {
  private requests: Map<string, RequestRecord> = new Map();
  private config: RateLimitConfig;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Checks if a request is allowed
   * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
   * @returns true if request is allowed, false if rate limited
   */
  isAllowed(key: string = 'default'): boolean {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return true;
    }

    // Reset if window has passed
    if (now >= record.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return true;
    }

    // Check if limit exceeded
    if (record.count >= this.config.maxRequests) {
      return false;
    }

    // Increment count
    record.count++;
    return true;
  }

  /**
   * Gets time until rate limit resets (in milliseconds)
   */
  getTimeUntilReset(key: string = 'default'): number {
    const record = this.requests.get(key);
    if (!record) {
      return 0;
    }

    const now = Date.now();
    return Math.max(0, record.resetTime - now);
  }

  /**
   * Gets remaining requests in current window
   */
  getRemainingRequests(key: string = 'default'): number {
    const record = this.requests.get(key);
    if (!record) {
      return this.config.maxRequests;
    }

    const now = Date.now();
    if (now >= record.resetTime) {
      return this.config.maxRequests;
    }

    return Math.max(0, this.config.maxRequests - record.count);
  }

  /**
   * Resets rate limit for a specific key
   */
  reset(key: string = 'default'): void {
    this.requests.delete(key);
  }

  /**
   * Clears all rate limit records
   */
  clear(): void {
    this.requests.clear();
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Creates a new rate limiter instance with custom configuration
 */
export const createRateLimiter = (config: Partial<RateLimitConfig>): RateLimiter => {
  return new RateLimiter(config);
};


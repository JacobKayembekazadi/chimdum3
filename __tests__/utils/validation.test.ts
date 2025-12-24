import { describe, it, expect } from 'vitest';

import { UserAnswers } from '../../types';
import {
  validateAnswers,
  isValidAnswer,
  sanitizeInput,
  validateAnswersStructure,
} from '../../utils/validation';

describe('validation utilities', () => {
  describe('validateAnswers', () => {
    it('should return isValid true when all questions are answered', () => {
      const answers: UserAnswers = {
        1: 'low',
        2: 'often',
        3: 'poor',
        4: 'poor',
        5: 'high',
        6: 'energy',
        7: 'no',
      };

      const result = validateAnswers(answers);
      expect(result.isValid).toBe(true);
      expect(result.missingQuestions).toHaveLength(0);
    });

    it('should return isValid false when questions are missing', () => {
      const answers: UserAnswers = {
        1: 'low',
        2: 'often',
      };

      const result = validateAnswers(answers);
      expect(result.isValid).toBe(false);
      expect(result.missingQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('isValidAnswer', () => {
    it('should return true for valid answer', () => {
      expect(isValidAnswer(1, 'low')).toBe(true);
      expect(isValidAnswer(1, 'steady')).toBe(true);
    });

    it('should return false for invalid answer', () => {
      expect(isValidAnswer(1, 'invalid')).toBe(false);
      expect(isValidAnswer(999, 'low')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize XSS attempts', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });
  });

  describe('validateAnswersStructure', () => {
    it('should return true for valid structure', () => {
      const answers: UserAnswers = {
        1: 'low',
        2: 'often',
      };
      expect(validateAnswersStructure(answers)).toBe(true);
    });

    it('should return false for invalid structure', () => {
      expect(validateAnswersStructure(null as unknown as UserAnswers)).toBe(false);
      expect(validateAnswersStructure({} as UserAnswers)).toBe(true);
    });
  });
});


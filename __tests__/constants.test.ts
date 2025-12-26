import { describe, it, expect } from 'vitest';

import { QUESTIONS, SYSTEM_PROMPT } from '../constants';

describe('constants', () => {
  describe('QUESTIONS', () => {
    it('should have 7 questions', () => {
      expect(QUESTIONS).toHaveLength(7);
    });

    it('should have unique IDs', () => {
      const ids = QUESTIONS.map(q => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(QUESTIONS.length);
    });

    it('should have questions with options', () => {
      QUESTIONS.forEach(question => {
        expect(question.text).toBeTruthy();
        expect(question.options).toBeInstanceOf(Array);
        expect(question.options.length).toBeGreaterThan(0);

        question.options.forEach(option => {
          expect(option.label).toBeTruthy();
          expect(option.value).toBeTruthy();
        });
      });
    });
  });

  describe('SYSTEM_PROMPT', () => {
    it('should be a non-empty string', () => {
      expect(SYSTEM_PROMPT).toBeTruthy();
      expect(typeof SYSTEM_PROMPT).toBe('string');
      expect(SYSTEM_PROMPT.length).toBeGreaterThan(0);
    });

    it('should contain key sections', () => {
      expect(SYSTEM_PROMPT).toContain('Chimdum Wellness Guide');
      expect(SYSTEM_PROMPT).toContain('DISCLAIMER');
    });
  });
});


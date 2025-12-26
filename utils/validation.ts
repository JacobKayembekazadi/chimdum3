/**
 * Input validation utilities
 */

import { QUESTIONS } from '../constants';
import { UserAnswers } from '../types';

/**
 * Validates that all required questions have been answered
 */
export const validateAnswers = (
  answers: UserAnswers
): { isValid: boolean; missingQuestions: number[] } => {
  const missingQuestions: number[] = [];

  QUESTIONS.forEach(question => {
    if (!answers[question.id] || answers[question.id].trim() === '') {
      missingQuestions.push(question.id);
    }
  });

  return {
    isValid: missingQuestions.length === 0,
    missingQuestions,
  };
};

/**
 * Validates that an answer value is valid for a given question
 */
export const isValidAnswer = (questionId: number, answerValue: string): boolean => {
  const question = QUESTIONS.find(q => q.id === questionId);

  if (!question) {
    return false;
  }

  return question.options.some(option => option.value === answerValue);
};

/**
 * Sanitizes user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validates that answers object has the correct structure
 */
export const validateAnswersStructure = (answers: UserAnswers): boolean => {
  if (!answers || typeof answers !== 'object') {
    return false;
  }

  // Check that all answers are strings
  return Object.values(answers).every(value => typeof value === 'string' && value.trim() !== '');
};


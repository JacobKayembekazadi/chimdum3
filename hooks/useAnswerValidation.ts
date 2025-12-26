import { useState, useCallback } from 'react';

import { UserAnswers } from '../types';
import { validateAnswers, isValidAnswer } from '../utils/validation';

interface ValidationResult {
  isValid: boolean;
  missingQuestions: number[];
  errors: string[];
}

export const useAnswerValidation = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    missingQuestions: [],
    errors: [],
  });

  const validate = useCallback((answers: UserAnswers): boolean => {
    const result = validateAnswers(answers);
    const errors: string[] = [];

    if (!result.isValid) {
      errors.push(
        `Please answer all questions. Missing: ${result.missingQuestions.length} question(s)`
      );
    }

    // Validate each answer value
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      if (!isValidAnswer(Number(questionId), answerValue)) {
        errors.push(`Invalid answer for question ${questionId}`);
      }
    });

    setValidationResult({
      isValid: result.isValid && errors.length === 0,
      missingQuestions: result.missingQuestions,
      errors,
    });

    return result.isValid && errors.length === 0;
  }, []);

  const reset = useCallback(() => {
    setValidationResult({
      isValid: true,
      missingQuestions: [],
      errors: [],
    });
  }, []);

  return {
    validate,
    reset,
    validationResult,
  };
};


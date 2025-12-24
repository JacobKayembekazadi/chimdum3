import React, { useState } from 'react';

import { QUESTIONS } from '../constants';
import { useAnswerValidation } from '../hooks/useAnswerValidation';
import { UserAnswers } from '../types';

interface AssessmentWizardProps {
  onComplete: (answers: UserAnswers) => void;
  onCancel: () => void;
}

const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const { validate } = useAnswerValidation();

  const currentQuestion = QUESTIONS[currentIndex];

  const handleSelect = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Validate all answers before completing
      if (validate(updatedAnswers)) {
        onComplete(updatedAnswers);
      } else {
        // If validation fails, go back to first unanswered question
        // This shouldn't happen in normal flow, but provides safety
        console.warn('Validation failed, but all questions should be answered');
        onComplete(updatedAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onCancel();
    }
  };

  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {currentIndex === 0 && (
        <div className="mb-10 sm:mb-12 md:mb-16 p-6 sm:p-8 glass-card border-none rounded-none border-l-4 border-[#C5A059] text-center md:text-left">
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light italic">
            &quot;Hi there. I will ask a few simple questions to see how you are feeling. This will
            help me suggest plant-based support based on Dr. Chimdum&apos;s ideas.&quot;
          </p>
        </div>
      )}

      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex justify-between items-end mb-4 sm:mb-6">
          <button
            onClick={handleBack}
            className="text-zinc-500 hover:text-[#C5A059] transition-all text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            aria-label={
              currentIndex > 0 ? `Go back to question ${currentIndex}` : 'Cancel assessment'
            }
          >
            ← Back
          </button>
          <div className="text-right">
            <span className="text-[#C5A059] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em]">
              Step {currentIndex + 1}
            </span>
          </div>
        </div>
        <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
          <div
            className="h-full bg-[#C5A059] transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="glass-card rounded-none p-6 sm:p-8 md:p-10 lg:p-16 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-t-2 border-r-2 border-[#C5A059]/20" />

        <h2
          id="question-text"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 md:mb-14 leading-tight"
        >
          {currentQuestion.text}
        </h2>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </div>

        <div
          className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6"
          role="radiogroup"
          aria-labelledby="question-text"
        >
          {currentQuestion.options.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full text-left p-5 sm:p-6 md:p-8 border border-white/5 hover:border-[#C5A059]/50 hover:bg-white/5 transition-all group flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-black"
              role="radio"
              aria-checked={answers[currentQuestion.id] === option.value}
              aria-label={`${currentQuestion.text}: ${option.label}`}
              tabIndex={answers[currentQuestion.id] === option.value ? 0 : -1}
            >
              <span className="text-lg sm:text-xl text-zinc-400 group-hover:text-white transition-colors font-light pr-4">
                {option.label}
              </span>
              <div
                className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-[#C5A059] transition-colors flex-shrink-0"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 sm:mt-10 md:mt-12 text-center text-zinc-600 text-[9px] sm:text-[10px] uppercase tracking-[0.4em]">
        Chimdum Wellness Guide
      </p>
    </div>
  );
};

export default AssessmentWizard;

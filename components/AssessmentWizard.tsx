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
    <div className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {currentIndex === 0 && (
        <div className="mb-12 sm:mb-16 md:mb-20 p-8 sm:p-10 md:p-12 glass-card border-l-4 border-[#C5A059] text-center md:text-left animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="w-1 h-full bg-gradient-to-b from-[#C5A059] to-[#B38B45] flex-shrink-0" />
            <p className="text-zinc-200 text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic">
              &quot;Hi there. I will ask a few simple questions to see how you are feeling. This will
              help me suggest plant-based support based on Dr. Chimdum&apos;s ideas.&quot;
            </p>
          </div>
        </div>
      )}

      <div className="mb-10 sm:mb-12 md:mb-16">
        <div className="flex justify-between items-end mb-5 sm:mb-6">
          <button
            onClick={handleBack}
            className="text-zinc-400 hover:text-[#C5A059] transition-all text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-black rounded px-3 py-1.5 hover:bg-white/5"
            aria-label={
              currentIndex > 0 ? `Go back to question ${currentIndex}` : 'Cancel assessment'
            }
          >
            ← Back
          </button>
          <div className="text-right">
            <span className="text-[#C5A059] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em]">
              Step {currentIndex + 1} of {QUESTIONS.length}
            </span>
          </div>
        </div>
        <div className="h-[3px] w-full bg-zinc-900 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#B38B45] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(197,160,89,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-8 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden animate-fade-in-up">
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-[#C5A059]/20" />
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-l-2 border-[#C5A059]/10" />

        <h2
          id="question-text"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 sm:mb-12 md:mb-16 leading-tight"
        >
          {currentQuestion.text}
        </h2>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </div>

        <div
          className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-7"
          role="radiogroup"
          aria-labelledby="question-text"
        >
          {currentQuestion.options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left p-6 sm:p-7 md:p-8 border transition-all duration-300 group flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden ${
                answers[currentQuestion.id] === option.value
                  ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                  : 'border-white/[0.08] hover:border-[#C5A059]/50 hover:bg-white/[0.03]'
              }`}
              role="radio"
              aria-checked={answers[currentQuestion.id] === option.value}
              aria-label={`${currentQuestion.text}: ${option.label}`}
              tabIndex={answers[currentQuestion.id] === option.value ? 0 : -1}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className={`text-xl sm:text-2xl relative z-10 transition-colors font-light pr-4 ${
                answers[currentQuestion.id] === option.value
                  ? 'text-white'
                  : 'text-zinc-400 group-hover:text-white'
              }`}>
                {option.label}
              </span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 relative z-10 transition-all duration-300 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-[#C5A059] bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.6)]'
                    : 'border-zinc-600 group-hover:border-[#C5A059]'
                }`}
                aria-hidden="true"
              >
                {answers[currentQuestion.id] === option.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-10 sm:mt-12 md:mt-16 text-center text-zinc-500 text-[10px] sm:text-[11px] uppercase tracking-[0.4em]">
        Chimdum Wellness Guide
      </p>
    </div>
  );
};

export default AssessmentWizard;

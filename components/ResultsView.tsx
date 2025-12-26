import React, { useEffect, useState } from 'react';

import { generateWellnessRecommendation, GeminiServiceError } from '../services/geminiService';
import { UserAnswers } from '../types';

import ErrorDisplay from './ErrorDisplay';

interface ResultsViewProps {
  answers: UserAnswers;
  preGeneratedContent?: string;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ answers, preGeneratedContent, onRestart }) => {
  const [loading, setLoading] = useState(!preGeneratedContent);
  const [content, setContent] = useState<string>(preGeneratedContent || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preGeneratedContent) return;

    const fetchRecommendation = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await generateWellnessRecommendation(answers);
        setContent(result);
      } catch (err) {
        const errorMessage =
          err instanceof GeminiServiceError
            ? err.message
            : err instanceof Error
              ? err.message
              : 'Failed to generate recommendation. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [answers, preGeneratedContent]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 sm:py-32 px-4 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-8 sm:mb-10 relative">
          <div className="absolute inset-0 border-t-2 border-[#C5A059] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-[#C5A059]/30 rounded-full animate-spin-slow"></div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Thinking for You...
        </h2>
        <p className="text-zinc-500 tracking-widest uppercase text-[9px] sm:text-[10px]">
          Looking at old wisdom for your body
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Unable to Generate Recommendation"
        message={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          generateWellnessRecommendation(answers)
            .then(result => {
              setContent(result);
              setLoading(false);
            })
            .catch(err => {
              const errorMessage =
                err instanceof GeminiServiceError
                  ? err.message
                  : 'Failed to generate recommendation. Please try again.';
              setError(errorMessage);
              setLoading(false);
            });
        }}
        onDismiss={onRestart}
        showRetry={true}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="card-elevated bg-[#0a0a0a] border border-white/[0.08] overflow-hidden animate-fade-in-up">
        <div className="gold-bg p-10 sm:p-12 md:p-16 text-black text-center relative overflow-hidden">
          {/* Enhanced pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 relative z-10 italic px-2">
            Your Natural Plan
          </h2>
          <div className="w-20 sm:w-24 h-[1px] bg-black/20 mx-auto mb-3 sm:mb-4" />
          <p className="text-black/70 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-[11px] relative z-10">
            Dr. Chimdum&apos;s Top Choice for You
          </p>
        </div>

        <div className="p-8 sm:p-10 md:p-12 lg:p-20">
          <div className="prose prose-invert prose-lg max-w-none">
            {content.split('\n').map((line: string, i: number) => {
              const upperLine = line.toUpperCase();

              if (upperLine.includes('BODY INSIGHT')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-0 mb-10 text-[12px] uppercase tracking-[0.5em] border-b border-white/[0.08] pb-5 flex items-center gap-4"
                  >
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    01. How You Feel
                  </h3>
                );
              }
              if (upperLine.includes('RECOMMENDED SUPPORT')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-20 mb-10 text-[12px] uppercase tracking-[0.5em] border-b border-white/[0.08] pb-5 flex items-center gap-4"
                  >
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    02. Best Choice for You
                  </h3>
                );
              }
              if (upperLine.includes('SIMPLE DAILY ROUTINE')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-20 mb-10 text-[12px] uppercase tracking-[0.5em] border-b border-white/[0.08] pb-5 flex items-center gap-4"
                  >
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    03. Your Easy Routine
                  </h3>
                );
              }
              if (upperLine.includes('WHY THIS MAY HELP')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-20 mb-10 text-[12px] uppercase tracking-[0.5em] border-b border-white/[0.08] pb-5 flex items-center gap-4"
                  >
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    04. Why This Works
                  </h3>
                );
              }
              if (upperLine.includes('NEXT STEP CTA') || upperLine.includes('NEXT STEPS')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-20 mb-8 text-[12px] uppercase tracking-[0.5em] border-b border-white/[0.08] pb-5 flex items-center gap-4"
                  >
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    05. What to do Next
                  </h3>
                );
              }
              if (upperLine.includes('DISCLAIMER')) {
                return (
                  <div
                    key={i}
                    className="mt-24 pt-12 border-t border-white/[0.08] text-[10px] text-zinc-500 uppercase tracking-[0.4em] text-center leading-relaxed"
                  >
                    {line}
                  </div>
                );
              }

              if (!line.trim()) return <div key={i} className="h-5" />;

              const cleanLine = line
                .replace(/^\d+\.\s*/, '')
                .replace(/^\d+\)\s*/, '')
                .replace(/^- /, '• ');

              return (
                <p
                  key={i}
                  className="text-zinc-300 leading-[1.9] sm:leading-[2.1] mb-5 sm:mb-7 text-base sm:text-lg font-light tracking-wide"
                >
                  {cleanLine}
                </p>
              );
            })}
          </div>

          <div className="mt-16 sm:mt-20 md:mt-24 flex flex-col sm:flex-row gap-5 sm:gap-6">
            <a
              href="https://chimduumherbs.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary px-8 sm:px-10 md:px-12 py-5 sm:py-6 tracking-[0.2em] uppercase text-sm sm:text-base text-center"
            >
              Shop Now
            </a>
            <button
              onClick={onRestart}
              className="flex-1 bg-transparent text-zinc-400 px-8 sm:px-10 md:px-12 py-5 sm:py-6 font-bold border border-white/[0.12] uppercase tracking-[0.2em] hover:text-white hover:border-white hover:bg-white/[0.05] transition-all duration-300 text-sm sm:text-base"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 text-center">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto mb-4" />
        <p className="text-zinc-600 text-[10px] sm:text-[11px] uppercase tracking-[0.6em] sm:tracking-[0.8em]">
          End of Session
        </p>
      </div>
    </div>
  );
};

export default ResultsView;

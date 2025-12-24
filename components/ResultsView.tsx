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
      <div className="max-w-3xl mx-auto py-32 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-10 relative">
          <div className="absolute inset-0 border-t-2 border-[#C5A059] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-[#C5A059]/30 rounded-full animate-spin-slow"></div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-6">Thinking for You...</h2>
        <p className="text-zinc-500 tracking-widest uppercase text-[10px]">
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
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        <div className="gold-bg p-12 text-black text-center relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-3 relative z-10 italic">
            Your Natural Plan
          </h2>
          <p className="text-black/60 font-bold uppercase tracking-[0.3em] text-[10px] relative z-10">
            Dr. Chimdum&apos;s Top Choice for You
          </p>
        </div>

        <div className="p-10 md:p-20">
          <div className="prose prose-invert prose-lg max-w-none">
            {content.split('\n').map((line: string, i: number) => {
              const upperLine = line.toUpperCase();

              if (upperLine.includes('BODY INSIGHT')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-0 mb-8 text-[11px] uppercase tracking-[0.5em] border-b border-white/5 pb-4"
                  >
                    01. How You Feel
                  </h3>
                );
              }
              if (upperLine.includes('RECOMMENDED SUPPORT')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-16 mb-8 text-[11px] uppercase tracking-[0.5em] border-b border-white/5 pb-4"
                  >
                    02. Best Choice for You
                  </h3>
                );
              }
              if (upperLine.includes('SIMPLE DAILY ROUTINE')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-16 mb-8 text-[11px] uppercase tracking-[0.5em] border-b border-white/5 pb-4"
                  >
                    03. Your Easy Routine
                  </h3>
                );
              }
              if (upperLine.includes('WHY THIS MAY HELP')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-16 mb-8 text-[11px] uppercase tracking-[0.5em] border-b border-white/5 pb-4"
                  >
                    04. Why This Works
                  </h3>
                );
              }
              if (upperLine.includes('NEXT STEP CTA') || upperLine.includes('NEXT STEPS')) {
                return (
                  <h3
                    key={i}
                    className="text-[#C5A059] font-bold mt-16 mb-6 text-[11px] uppercase tracking-[0.5em] border-b border-white/5 pb-4"
                  >
                    05. What to do Next
                  </h3>
                );
              }
              if (upperLine.includes('DISCLAIMER')) {
                return (
                  <div
                    key={i}
                    className="mt-20 pt-10 border-t border-white/5 text-[9px] text-zinc-600 uppercase tracking-[0.4em] text-center leading-loose"
                  >
                    {line}
                  </div>
                );
              }

              if (!line.trim()) return <div key={i} className="h-4" />;

              const cleanLine = line
                .replace(/^\d+\.\s*/, '')
                .replace(/^\d+\)\s*/, '')
                .replace(/^- /, '• ');

              return (
                <p
                  key={i}
                  className="text-zinc-400 leading-[2] mb-6 text-lg font-light tracking-wide"
                >
                  {cleanLine}
                </p>
              );
            })}
          </div>

          <div className="mt-20 flex flex-col md:flex-row gap-6">
            <button className="flex-1 bg-white text-black px-10 py-6 font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-all shadow-xl active:scale-95 text-sm">
              Get Started
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-transparent text-zinc-500 px-10 py-6 font-bold border border-white/10 uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all active:scale-95 text-sm"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-zinc-700 text-[10px] uppercase tracking-[0.8em]">End of Session</p>
      </div>
    </div>
  );
};

export default ResultsView;

import React from 'react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  showRetry?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Something Went Wrong',
  message,
  onRetry,
  onDismiss,
  showRetry = true,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="glass-card rounded-none p-12 text-center border-none border-t-2 border-red-500/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-500/20" />

        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="px-8 py-4 gold-bg text-black font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
              aria-label="Retry operation"
            >
              Try Again
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="px-8 py-4 bg-transparent text-zinc-500 font-bold border border-white/10 uppercase tracking-widest hover:text-white hover:border-white transition-all active:scale-95"
              aria-label="Dismiss error"
            >
              {showRetry && onRetry ? 'Go Back' : 'Dismiss'}
            </button>
          )}
        </div>
      </div>

      <p className="mt-12 text-center text-zinc-700 text-[10px] uppercase tracking-[0.8em]">
        If this problem persists, please contact support
      </p>
    </div>
  );
};

export default ErrorDisplay;


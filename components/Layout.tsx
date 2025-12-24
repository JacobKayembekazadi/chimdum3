import React from 'react';

import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C5A059] focus:text-black focus:font-bold focus:rounded"
      >
        Skip to main content
      </a>
      <header
        className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50"
        role="banner"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => onViewChange(View.HERO)}
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Go to home page"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 gold-bg rounded-sm flex items-center justify-center text-black font-bold text-xl sm:text-2xl shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              C
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white">
              Chimdum
            </h1>
          </button>
          <nav
            className="hidden md:flex gap-8 lg:gap-10 text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase"
            role="navigation"
            aria-label="Main navigation"
          >
            <button
              onClick={() => onViewChange(View.PHILOSOPHY)}
              className={`${currentView === View.PHILOSOPHY ? 'text-[#C5A059] border-b border-[#C5A059] pb-1' : 'text-zinc-500 hover:text-[#C5A059]'} transition-all`}
              aria-current={currentView === View.PHILOSOPHY ? 'page' : undefined}
            >
              Philosophy
            </button>
            <button
              onClick={() => onViewChange(View.ESSENTIALS)}
              className={`${currentView === View.ESSENTIALS ? 'text-[#C5A059] border-b border-[#C5A059] pb-1' : 'text-zinc-500 hover:text-[#C5A059]'} transition-all`}
              aria-current={currentView === View.ESSENTIALS ? 'page' : undefined}
            >
              Essentials
            </button>
            <button
              onClick={() => onViewChange(View.ASSESSMENT)}
              className={`${currentView === View.ASSESSMENT ? 'text-[#C5A059] border-b border-[#C5A059] pb-1' : 'text-zinc-500 hover:text-[#C5A059]'} transition-all`}
              aria-current={currentView === View.ASSESSMENT ? 'page' : undefined}
            >
              Assessment
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>

      <footer
        className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 border-t border-white/5"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-wider">
              CHIMDUM WELLNESS
            </h2>
            <p className="text-zinc-500 max-w-sm text-xs sm:text-sm leading-relaxed">
              Rooted in ancestral African herbal wisdom, refined for the modern soul. Your journey
              to balance starts within.
            </p>
          </div>
          <div className="md:text-right text-center md:text-right">
            <p className="text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-widest leading-loose">
              Disclaimer: Guidance is educational and not medical advice.
              <br />
              Products are not intended to diagnose, treat, or prevent disease.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect, useRef } from 'react';

import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (view: View) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C5A059] focus:text-black focus:font-bold focus:rounded"
      >
        Skip to main content
      </a>
      <header
        ref={menuRef}
        className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 border-b border-white/[0.08] bg-black/60 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300"
        role="banner"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => handleNavClick(View.HERO)}
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Go to home page"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 gold-bg rounded-sm flex items-center justify-center text-black font-bold text-xl sm:text-2xl shadow-[0_0_24px_rgba(197,160,89,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(197,160,89,0.6)]"
              aria-hidden="true"
            >
              C
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white group-hover:text-[#C5A059] transition-colors">
              Chimdum
            </h1>
          </button>
          
          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex gap-8 lg:gap-12 text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase"
            role="navigation"
            aria-label="Main navigation"
          >
            <button
              onClick={() => handleNavClick(View.PHILOSOPHY)}
              className={`relative ${currentView === View.PHILOSOPHY ? 'text-[#C5A059]' : 'text-zinc-400 hover:text-[#C5A059]'} transition-all duration-300 pb-1`}
              aria-current={currentView === View.PHILOSOPHY ? 'page' : undefined}
            >
              Philosophy
              {currentView === View.PHILOSOPHY && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C5A059] to-transparent" />
              )}
            </button>
            <button
              onClick={() => handleNavClick(View.ESSENTIALS)}
              className={`relative ${currentView === View.ESSENTIALS ? 'text-[#C5A059]' : 'text-zinc-400 hover:text-[#C5A059]'} transition-all duration-300 pb-1`}
              aria-current={currentView === View.ESSENTIALS ? 'page' : undefined}
            >
              Essentials
              {currentView === View.ESSENTIALS && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C5A059] to-transparent" />
              )}
            </button>
            <button
              onClick={() => handleNavClick(View.ASSESSMENT)}
              className={`relative ${currentView === View.ASSESSMENT ? 'text-[#C5A059]' : 'text-zinc-400 hover:text-[#C5A059]'} transition-all duration-300 pb-1`}
              aria-current={currentView === View.ASSESSMENT ? 'page' : undefined}
            >
              Assessment
              {currentView === View.ASSESSMENT && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C5A059] to-transparent" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-black rounded active:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span
              className={`w-6 h-0.5 bg-[#C5A059] transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#C5A059] transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#C5A059] transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
          aria-hidden={!mobileMenuOpen}
        >
          <div className="px-4 py-6 space-y-2">
            <button
              onClick={() => handleNavClick(View.PHILOSOPHY)}
              className={`w-full text-left px-4 py-4 min-h-[44px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                currentView === View.PHILOSOPHY
                  ? 'text-[#C5A059] border-l-4 border-[#C5A059] bg-white/5'
                  : 'text-zinc-400 active:text-[#C5A059] active:bg-white/5'
              }`}
              aria-current={currentView === View.PHILOSOPHY ? 'page' : undefined}
            >
              Philosophy
            </button>
            <button
              onClick={() => handleNavClick(View.ESSENTIALS)}
              className={`w-full text-left px-4 py-4 min-h-[44px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                currentView === View.ESSENTIALS
                  ? 'text-[#C5A059] border-l-4 border-[#C5A059] bg-white/5'
                  : 'text-zinc-400 active:text-[#C5A059] active:bg-white/5'
              }`}
              aria-current={currentView === View.ESSENTIALS ? 'page' : undefined}
            >
              Essentials
            </button>
            <button
              onClick={() => handleNavClick(View.ASSESSMENT)}
              className={`w-full text-left px-4 py-4 min-h-[44px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                currentView === View.ASSESSMENT
                  ? 'text-[#C5A059] border-l-4 border-[#C5A059] bg-white/5'
                  : 'text-zinc-400 active:text-[#C5A059] active:bg-white/5'
              }`}
              aria-current={currentView === View.ASSESSMENT ? 'page' : undefined}
            >
              Assessment
            </button>
          </div>
        </nav>
      </header>

      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>

      <footer
        className="bg-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 border-t border-white/[0.08] relative overflow-hidden"
        role="contentinfo"
      >
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(197, 160, 89, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197, 160, 89, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center relative z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 tracking-wider text-white">
              CHIMDUM WELLNESS
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#C5A059] to-transparent mb-4 sm:mb-5" />
            <p className="text-zinc-400 max-w-sm text-sm sm:text-base leading-relaxed">
              Rooted in ancestral African herbal wisdom, refined for the modern soul. Your journey
              to balance starts within.
            </p>
          </div>
          <div className="md:text-right text-center md:text-right">
            <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed">
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

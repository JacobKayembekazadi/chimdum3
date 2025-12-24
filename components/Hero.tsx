import React from 'react';

interface HeroProps {
  onStartText: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartText }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A059] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B38B45] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <div className="mb-8 md:mb-12 inline-flex items-center gap-2 md:gap-4">
          <div className="h-[1px] w-4 md:w-8 bg-[#C5A059]" />
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.5em] text-[#C5A059] uppercase">
            African Plant Wisdom
          </span>
          <div className="h-[1px] w-4 md:w-8 bg-[#C5A059]" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight px-2">
          Learn What Your <br className="hidden sm:block" />
          <span className="italic gold-gradient">Body Needs.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-4">
          Take our quick quiz to discover what your body needs based on ancient African herbal
          wisdom.
        </p>

        <div className="flex items-center justify-center px-4">
          <button
            onClick={onStartText}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 overflow-hidden font-bold text-black transition-all bg-[#C5A059] rounded-none hover:bg-white active:scale-95 shadow-[0_0_30px_rgba(197,160,89,0.2)]"
            aria-label="Start wellness assessment quiz"
          >
            <span className="relative tracking-[0.2em] uppercase text-xs sm:text-sm">
              Take the Quiz
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-12 left-0 w-full px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-center md:justify-between gap-6 sm:gap-8 md:gap-12 border-t border-white/5 pt-8 md:pt-12">
          {[
            { label: '01', title: 'Old Wisdom', desc: 'Real recipes used for many years.' },
            { label: '02', title: 'Natural Power', desc: 'Help yourself feel strong and ready.' },
            { label: '03', title: 'Whole Body Help', desc: 'Balance for your whole self.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 md:gap-4 items-start max-w-[240px] mx-auto sm:mx-0">
              <span className="text-[#C5A059] text-xs font-bold tracking-tighter flex-shrink-0">
                {item.label}
              </span>
              <div>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-1">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

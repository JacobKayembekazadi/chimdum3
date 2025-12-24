import React from 'react';

interface HeroProps {
  onStartText: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartText }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#C5A059] rounded-full blur-[120px] sm:blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#B38B45] rounded-full blur-[120px] sm:blur-[160px]" />
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <div className="mb-6 sm:mb-8 md:mb-12 inline-flex items-center gap-2 md:gap-4">
            <div className="h-[1px] w-4 md:w-8 bg-[#C5A059]" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] text-[#C5A059] uppercase">
              African Plant Wisdom
            </span>
            <div className="h-[1px] w-4 md:w-8 bg-[#C5A059]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-tight">
            Learn What Your <br className="sm:hidden" />
            <span className="italic gold-gradient block sm:inline">Body Needs.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 mb-8 sm:mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-2">
            Take our quick quiz to discover what your body needs based on ancient African herbal
            wisdom.
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={onStartText}
              className="w-full max-w-xs sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 overflow-hidden font-bold text-black transition-all bg-[#C5A059] rounded-none hover:bg-white active:scale-95 shadow-[0_0_30px_rgba(197,160,89,0.2)]"
              aria-label="Start wellness assessment quiz"
            >
              <span className="relative tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm">
                Take the Quiz
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 pb-6 sm:pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 sm:pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[
              { label: '01', title: 'Old Wisdom', desc: 'Real recipes used for many years.' },
              {
                label: '02',
                title: 'Natural Power',
                desc: 'Help yourself feel strong and ready.',
              },
              { label: '03', title: 'Whole Body Help', desc: 'Balance for your whole self.' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-2 sm:gap-3 md:gap-4 items-start w-full sm:w-auto sm:max-w-[240px]"
              >
                <span className="text-[#C5A059] text-[10px] sm:text-xs font-bold tracking-tighter flex-shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 sm:flex-none">
                  <h3 className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0.5 sm:mb-1">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-[10px] sm:text-[11px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

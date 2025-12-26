import React from 'react';

interface HeroProps {
  onStartText: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartText }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050505]">
      {/* Enhanced Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl opacity-[0.15] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#C5A059] rounded-full blur-[120px] sm:blur-[180px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#B38B45] rounded-full blur-[120px] sm:blur-[180px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#F1D391] rounded-full blur-[100px] sm:blur-[140px] opacity-40 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197, 160, 89, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197, 160, 89, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full animate-fade-in-up">
          <div className="mb-8 sm:mb-10 md:mb-14 inline-flex items-center gap-3 md:gap-5 animate-fade-in">
            <div className="h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] text-[#C5A059] uppercase text-glow">
              African Plant Wisdom
            </span>
            <div className="h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 md:mb-10 leading-[1.05] sm:leading-tight animate-fade-in-up stagger-1">
            Learn What Your <br className="sm:hidden" />
            <span className="italic gold-gradient block sm:inline text-glow">Body Needs.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-2 animate-fade-in-up stagger-2">
            Take our quick quiz to discover what your body needs based on ancient African herbal
            wisdom.
          </p>

          <div className="flex items-center justify-center animate-fade-in-up stagger-3">
            <button
              onClick={onStartText}
              className="btn-primary w-full max-w-sm sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 tracking-[0.2em] sm:tracking-[0.25em] uppercase text-sm sm:text-base"
              aria-label="Start wellness assessment quiz"
            >
              <span className="relative z-10">Take the Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 pb-8 sm:pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto border-t border-white/[0.08] pt-8 sm:pt-10 md:pt-14">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-16">
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
                className="flex gap-3 sm:gap-4 md:gap-5 items-start w-full sm:w-auto sm:max-w-[280px] group animate-fade-in-up"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <span className="text-[#C5A059] text-xs sm:text-sm font-bold tracking-tight flex-shrink-0 group-hover:text-[#F1D391] transition-colors">
                  {item.label}
                </span>
                <div className="flex-1 sm:flex-none">
                  <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-2 group-hover:text-zinc-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed">
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

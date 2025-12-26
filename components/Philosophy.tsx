import React from 'react';

interface PhilosophyProps {
  onStartAssessment: () => void;
}

const Philosophy: React.FC<PhilosophyProps> = ({ onStartAssessment }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center mb-16 sm:mb-20 md:mb-24 animate-fade-in-up" aria-labelledby="philosophy-title">
        <h1 id="philosophy-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-10 italic px-2">
          Our Way of Thinking
        </h1>
        <div className="w-20 sm:w-24 md:w-32 h-1 gold-bg mx-auto mb-8 sm:mb-10 md:mb-12 shadow-[0_0_20px_rgba(197,160,89,0.3)]" />
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4">
          Dr. Chimdum believes that plants have the power to help our bodies stay in balance. We use
          old African secrets to help you feel your best today.
        </p>
      </section>

      {/* Core Principles Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-20 sm:mb-24 md:mb-28" aria-labelledby="principles-title">
        <h2 id="principles-title" className="sr-only">Core Principles</h2>
        <article className="glass-card p-8 sm:p-10 md:p-12 border-l-4 border-[#C5A059] group hover:border-[#F1D391] transition-all duration-300 animate-fade-in-up stagger-1">
          <div className="w-12 h-12 gold-bg rounded-full flex items-center justify-center text-black font-bold text-lg mb-6 shadow-[0_0_20px_rgba(197,160,89,0.3)]" aria-hidden="true">
            01
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5 group-hover:text-[#C5A059] transition-colors">
            Old Secrets, New Help
          </h3>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            For hundreds of years, people in Africa used special plants to stay strong. We take
            those same plants and make them ready for your busy life.
          </p>
        </article>
        <article className="glass-card p-8 sm:p-10 md:p-12 border-l-4 border-[#C5A059] group hover:border-[#F1D391] transition-all duration-300 animate-fade-in-up stagger-2">
          <div className="w-12 h-12 gold-bg rounded-full flex items-center justify-center text-black font-bold text-lg mb-6 shadow-[0_0_20px_rgba(197,160,89,0.3)]" aria-hidden="true">
            02
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5 group-hover:text-[#C5A059] transition-colors">The Whole You</h3>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We don&apos;t just look at one part of you. We look at your energy, your sleep, and your
            belly. When every part is happy, you feel great.
          </p>
        </article>
      </section>

      {/* Call to Action Section */}
      <section className="glass-card p-10 sm:p-12 md:p-16 text-center relative overflow-hidden animate-fade-in-up stagger-3" aria-labelledby="cta-title">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-50" />
        <div className="relative z-10">
          <blockquote>
            <h2 id="cta-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 px-2 italic">
              &quot;Nature is the best teacher.&quot;
            </h2>
            <cite className="text-zinc-400 mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg font-light not-italic block">- Dr. Chimdum</cite>
          </blockquote>
          <button
            onClick={onStartAssessment}
            className="btn-primary px-10 sm:px-12 md:px-14 py-5 sm:py-6 tracking-[0.2em] uppercase text-sm sm:text-base"
            aria-label="Start your wellness assessment"
          >
            Check Your Body Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;

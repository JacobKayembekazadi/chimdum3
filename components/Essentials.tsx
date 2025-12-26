import React from 'react';

interface EssentialsProps {
  onStartAssessment: () => void;
}

const Essentials: React.FC<EssentialsProps> = ({ onStartAssessment }) => {
  const products = [
    { name: 'Chimdum Bitters', desc: 'Helps your belly feel good and cleans your system.' },
    { name: 'Ghanga Tonic', desc: 'Gives you long-lasting energy and helps with stress.' },
    { name: 'Immune Booster', desc: "Helps you stay strong so you don't feel run-down." },
  ];

  const bundles = [
    {
      name: 'Vitality Duo',
      items: 'Ghanga Tonic + Immune Booster',
      desc: 'For energy and strength.',
    },
    {
      name: 'Daily Reset',
      items: 'Bitters + Immune Booster',
      desc: 'For a clean body and high power.',
    },
    { name: 'Total Balance', items: 'All Three', desc: 'The best way to feel brand new.' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up" aria-labelledby="essentials-title">
        <h1 id="essentials-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 italic">
          The Essentials
        </h1>
        <div className="w-16 sm:w-20 h-[1px] gold-bg mx-auto mb-4 sm:mb-6" />
        <p className="text-zinc-400 uppercase tracking-[0.4em] text-[11px] sm:text-xs font-semibold">
          Pure Plant Support
        </p>
      </section>

      {/* Core Products Section */}
      <section className="mb-20 sm:mb-24 md:mb-28" aria-labelledby="products-title">
        <h2 id="products-title" className="sr-only">Core Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {products.map((p, i) => (
            <article
              key={i}
              className="glass-card p-8 sm:p-10 group hover:border-[#C5A059]/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 gold-bg rounded-full mb-6 sm:mb-8 flex items-center justify-center text-black font-black text-xl sm:text-2xl shadow-[0_0_24px_rgba(197,160,89,0.4)] group-hover:shadow-[0_0_32px_rgba(197,160,89,0.6)] transition-all duration-300" aria-hidden="true">
                0{i + 1}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5 group-hover:text-[#C5A059] transition-colors">{p.name}</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {p.desc}
              </p>
              <div className="text-[#C5A059] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                Core Product
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bundles Section */}
      <section className="mb-20 sm:mb-24 md:mb-28" aria-labelledby="bundles-title">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
          <h2 id="bundles-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Official Bundles
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">Better results when used together.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {bundles.map((b, i) => (
            <article
              key={i}
              className="glass-card p-8 sm:p-10 relative overflow-hidden group hover:border-[#C5A059]/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 px-3 py-1.5 bg-gradient-to-br from-[#C5A059] to-[#B38B45] text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-tight shadow-[0_0_12px_rgba(197,160,89,0.4)]" aria-label="Popular bundle">
                Popular
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#C5A059] mb-3 pr-12 group-hover:text-[#F1D391] transition-colors">{b.name}</h3>
              <p className="text-white text-sm font-medium mb-4 sm:mb-5 uppercase tracking-widest">
                {b.items}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">{b.desc}</p>
              <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300" aria-label={`Learn more about ${b.name}`}>
                Learn More
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mt-20 sm:mt-24 md:mt-28 p-10 sm:p-12 md:p-16 glass-card border-[#C5A059]/30 text-center relative overflow-hidden animate-fade-in-up" aria-labelledby="essentials-cta-title">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-50" />
        <div className="relative z-10">
          <h2 id="essentials-cta-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 italic">
            Not sure which one to pick?
          </h2>
          <button
            onClick={onStartAssessment}
            className="btn-primary px-10 sm:px-12 md:px-14 py-5 sm:py-6 tracking-[0.2em] uppercase text-sm sm:text-base"
            aria-label="Start assessment to find the right product for you"
          >
            Let the Guide Help You
          </button>
        </div>
      </section>
    </div>
  );
};

export default Essentials;

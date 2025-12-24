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
    <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 italic">
          The Essentials
        </h2>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] sm:text-xs">
          Pure Plant Support
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
        {products.map((p, i) => (
          <div
            key={i}
            className="glass-card p-6 sm:p-8 group hover:border-[#C5A059]/50 transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 gold-bg rounded-full mb-4 sm:mb-6 flex items-center justify-center text-black font-black text-lg sm:text-xl">
              0{i + 1}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{p.name}</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              {p.desc}
            </p>
            <div className="text-[#C5A059] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              Core Product
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          Official Bundles
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm">Better results when used together.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {bundles.map((b, i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-white/5 p-6 sm:p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-1.5 sm:p-2 bg-[#C5A059] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter">
              Popular
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#C5A059] mb-2 pr-8">{b.name}</h3>
            <p className="text-white text-xs font-medium mb-3 sm:mb-4 uppercase tracking-widest">
              {b.items}
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm mb-6 sm:mb-8">{b.desc}</p>
            <button className="w-full py-3 sm:py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Learn More
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 p-8 sm:p-10 md:p-12 border border-[#C5A059]/30 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 italic">
          Not sure which one to pick?
        </h3>
        <button
          onClick={onStartAssessment}
          className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 gold-bg text-black font-bold uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform text-xs sm:text-sm"
        >
          Let the Guide Help You
        </button>
      </div>
    </div>
  );
};

export default Essentials;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, Clock, Sparkles } from 'lucide-react';

const crewSizes = [
  { label: 'Solo', value: 1, icon: '🙋' },
  { label: 'Duo', value: 2, icon: '👫' },
  { label: 'Small Group', value: 5, icon: '👯' },
  { label: 'Big Squad', value: 10, icon: '🎉' },
];

const durations = [
  { label: '60 min', value: 60, price: '£20', icon: '⚡' },
  { label: '90 min', value: 90, price: '£28', icon: '🎨' },
  { label: '2 hours', value: 120, price: '£38', icon: '🔥' },
  { label: '3 hours', value: 180, price: '£55', icon: '💥' },
];

const addOns = [
  { label: 'UV Glow Kit', desc: 'Extra UV reactive paint set', icon: '🌟', price: '£8' },
  { label: 'Custom Canvas', desc: 'Larger take-home canvas', icon: '🖼️', price: '£12' },
  { label: 'Glitter Pack', desc: 'Biodegradable glitter splash', icon: '✨', price: '£6' },
  { label: 'Pro Photos', desc: 'Studio shots of your artwork', icon: '📸', price: '£15' },
];

export default function BuildYourSession() {
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleAddOn = (label) => {
    setSelectedAddOns(prev =>
      prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]
    );
  };

  const handleBook = () => {
    const params = new URLSearchParams();
    if (selectedCrew) params.set('people', selectedCrew.value);
    if (selectedDuration) params.set('duration', selectedDuration.value);
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isReady = selectedCrew && selectedDuration;

  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-[180px] -translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-uv-purple font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-purple">
            Design It Yourself
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-3">
            Build Your <span className="text-neon-green text-glow-green">Session</span>
          </h2>
          <p className="text-white/40 font-body max-w-md mx-auto">
            Mix and match your perfect paint experience — pick your crew, set your time, add the extras.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Crew Size */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-neon-pink" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Who's coming?</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {crewSizes.map(crew => (
                <button
                  key={crew.label}
                  onClick={() => setSelectedCrew(crew)}
                  className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                    selectedCrew?.label === crew.label
                      ? 'border-neon-pink bg-neon-pink/10 shadow-[0_0_20px_rgba(255,0,127,0.2)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <span className="text-2xl block mb-1">{crew.icon}</span>
                  <span className="font-heading font-semibold text-white text-sm">{crew.label}</span>
                  <span className="text-white/30 text-xs block mt-0.5">~{crew.value} {crew.value === 1 ? 'person' : 'people'}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-electric-cyan" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">How long do you want to paint?</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {durations.map(dur => (
                <button
                  key={dur.label}
                  onClick={() => setSelectedDuration(dur)}
                  className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                    selectedDuration?.label === dur.label
                      ? 'border-electric-cyan bg-electric-cyan/10 shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <span className="text-xl block mb-1">{dur.icon}</span>
                  <span className="font-heading font-bold text-white text-sm">{dur.label}</span>
                  <span className="text-electric-cyan text-xs block mt-1 font-semibold">{dur.price}/person</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Add-Ons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
                <Package className="w-4 h-4 text-neon-green" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Level it up <span className="text-white/30 font-normal text-sm">(optional)</span></h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addOns.map(addon => (
                <button
                  key={addon.label}
                  onClick={() => toggleAddOn(addon.label)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                    selectedAddOns.includes(addon.label)
                      ? 'border-neon-green bg-neon-green/5 shadow-[0_0_15px_rgba(57,255,20,0.1)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <span className="text-2xl">{addon.icon}</span>
                  <div className="flex-1">
                    <span className="font-heading font-semibold text-white text-sm block">{addon.label}</span>
                    <span className="text-white/40 text-xs">{addon.desc}</span>
                  </div>
                  <span className="text-neon-green font-bold text-sm font-heading">{addon.price}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {isReady && (
              <p className="text-white/40 font-body text-sm mb-4">
                {selectedCrew.label} · {selectedDuration.label}
                {selectedAddOns.length > 0 ? ` · ${selectedAddOns.join(', ')}` : ''}
              </p>
            )}
            <button
              onClick={handleBook}
              disabled={!isReady}
              className={`px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 ${
                isReady
                  ? 'bg-neon-pink text-white animate-pulse-glow hover:scale-105'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              {isReady ? '🎨 Take Me to Booking' : 'Pick your crew & time first'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
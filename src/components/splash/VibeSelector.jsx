import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

const vibes = [
  { label: 'Session Length', left: '⏱️ Quick (60 min)', right: 'Extended (3 hrs) 🕐', color: '#FF007F' },
  { label: 'Energy Level', left: '🧘 Chill & Relaxed', right: 'Full Chaos Mode 💥', color: '#9D00FF' },
  { label: 'Age Group', left: '🧸 Kids (under 12)', right: 'Adults Night 🍹', color: '#00F3FF' },
];

export default function VibeSelector() {
  const [values, setValues] = useState([50, 50, 50]);

  const avgVibe = values.reduce((a, b) => a + b, 0) / values.length;

  const bgGlow = `radial-gradient(ellipse at 50% 50%, 
    rgba(255,0,127,${avgVibe / 300}) 0%, 
    rgba(157,0,255,${avgVibe / 400}) 40%, 
    transparent 70%)`;

  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 transition-all duration-1000" style={{ background: bgGlow }} />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric-cyan font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-cyan">
            Personalize It
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">
            Choose Your <span className="text-neon-green text-glow-green">Vibe</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            Slide to match your energy. Every experience is customizable to your mood.
          </p>
        </motion.div>

        <div className="space-y-10">
          {vibes.map((vibe, index) => (
            <motion.div
              key={vibe.label}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8"
            >
              <p className="text-white/40 font-heading text-xs uppercase tracking-[0.2em] mb-4">{vibe.label}</p>
              <div className="flex items-center gap-4">
                <span className="text-white/50 font-body text-xs md:text-sm w-28 text-right shrink-0">{vibe.left}</span>
                <Slider
                  value={[values[index]]}
                  onValueChange={(v) => {
                    const newValues = [...values];
                    newValues[index] = v[0];
                    setValues(newValues);
                  }}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-white/50 font-body text-xs md:text-sm w-28 shrink-0">{vibe.right}</span>
              </div>
              <div className="mt-3 h-1 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: vibe.color, width: `${values[index]}%` }}
                  animate={{ width: `${values[index]}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/30 font-body text-sm mb-4">
            {avgVibe < 30 ? '🧸 Short, chill kids session — perfect for little ones' :
             avgVibe < 60 ? '🎨 Balanced session — creative flow for all ages' :
             '🔥 Extended adult chaos mode — maximum energy, maximum paint!'}
          </p>
          <a href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-block px-8 py-3 bg-neon-pink text-white font-heading font-bold rounded-full animate-pulse-glow hover:scale-105 transition-transform">
            Book This Vibe
          </a>
        </motion.div>
      </div>
    </section>
  );
}
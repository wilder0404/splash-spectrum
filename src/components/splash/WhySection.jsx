import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const reasons = [
  { icon: Sparkles, titleKey: 'why_1_title', descKey: 'why_1_desc', color: '#FF007F' },
  { icon: Zap,      titleKey: 'why_2_title', descKey: 'why_2_desc', color: '#39FF14' },
  { icon: Heart,    titleKey: 'why_3_title', descKey: 'why_3_desc', color: '#9D00FF' },
  { icon: Shield,   titleKey: 'why_4_title', descKey: 'why_4_desc', color: '#00F3FF' },
];

export default function WhySection() {
  const { lang } = useLang();

  return (
    <section id="why" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-pink font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-pink">
            {tr(lang, 'why_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            {tr(lang, 'why_h2_1')} <span className="text-neon-green text-glow-green">{tr(lang, 'why_h2_2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                style={{ backgroundColor: reason.color }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${reason.color}15` }}>
                <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">{tr(lang, reason.titleKey)}</h3>
              <p className="font-body text-white/50 leading-relaxed">{tr(lang, reason.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
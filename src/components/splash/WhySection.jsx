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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-16">
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

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-neon-pink/20 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon-pink/10 rounded-full blur-[80px]" />
            <h3 className="font-heading font-black text-2xl text-neon-pink text-glow-pink mb-4 relative z-10">Our Vision</h3>
            <p className="font-body text-white/60 leading-relaxed relative z-10">
              At SS, we envision a vibrant community where individuals of all ages and backgrounds (artists and non-artists) come together to unleash their creativity and express themselves through the captivating world of art. No skills are required to create beautiful artworks and take them home! Our vision is to be the foremost destination for artistic inspiration, fostering a culture where every stroke of the brush brings joy, passion, and a kaleidoscope of colors to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-neon-green/20 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-green/10 rounded-full blur-[80px]" />
            <h3 className="font-heading font-black text-2xl text-neon-green text-glow-green mb-4 relative z-10">Our Mission</h3>
            <p className="font-body text-white/60 leading-relaxed relative z-10">
              Our mission is to harness the psychological benefits of painting as a therapeutic and enriching experience. We strive to provide a nurturing space where individuals can explore the healing and transformative aspects of art, promoting mental wellness, self-discovery, and emotional resilience within the vibrant tapestry of Saudi culture.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
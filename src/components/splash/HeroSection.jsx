import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-neon-green font-heading font-semibold text-sm md:text-base uppercase tracking-[0.3em] mb-14 text-glow-green"
          >
            {tr(lang, 'hero_badge')}
          </motion.p>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-6" style={{ lineHeight: 1.25 }}>
            {lang === 'ar' ? (
              <>
                <span className="block mb-3">{tr(lang, 'hero_h1_1')}</span>
                <span className="block">
                  <span className="text-neon-pink text-glow-pink">{tr(lang, 'hero_h1_2')}</span>
                  {tr(lang, 'hero_h1_3') ? <> {tr(lang, 'hero_h1_3')}</> : ' '}
                  <span className="text-electric-cyan text-glow-cyan">{tr(lang, 'hero_h1_4')}</span>
                </span>
              </>
            ) : (
              <>
                <span className="block">
                  {tr(lang, 'hero_h1_1')}{' '}
                  <span className="text-neon-pink text-glow-pink">{tr(lang, 'hero_h1_2')}</span>
                </span>
                <span className="block">
                  {tr(lang, 'hero_h1_3') ? <>{tr(lang, 'hero_h1_3')} </> : ''}
                  <span className="text-electric-cyan text-glow-cyan">{tr(lang, 'hero_h1_4')}</span>
                </span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 font-body text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {tr(lang, 'hero_sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <a href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-10 py-4 bg-neon-pink text-white font-heading font-bold rounded-full text-lg animate-pulse-glow hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
            >
              {tr(lang, 'hero_cta1')}
            </a>
            <a href="#experiences"
              onClick={(e) => { e.preventDefault(); document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 border border-white/20 text-white font-heading font-semibold rounded-full text-lg hover:border-neon-pink/50 hover:text-neon-pink transition-all cursor-pointer"
            >
              {tr(lang, 'hero_cta2')}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 animate-float"
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
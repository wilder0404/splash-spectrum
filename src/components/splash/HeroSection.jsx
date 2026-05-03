import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";
const BLOBS = [
  { id: 0, color: '#FF007F', x: 15, y: 35, size: 200, duration: 8, delay: 0,   xAmp: 10, yAmp: 8 },
  { id: 1, color: '#00F3FF', x: 70, y: 40, size: 250, duration: 10, delay: 1.5, xAmp: 8,  yAmp: 10 },
  { id: 2, color: '#9D00FF', x: 45, y: 65, size: 180, duration: 9,  delay: 0.8, xAmp: 12, yAmp: 6 },
];

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/20 to-obsidian" />
      </div>

      {/* Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {BLOBS.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color}30 0%, transparent 70%)`,
              filter: 'blur(60px)',
              willChange: 'transform',
            }}
            animate={{
              x: [`0px`, `${blob.xAmp}px`, `0px`],
              y: [`0px`, `-${blob.yAmp}px`, `0px`],
            }}
            transition={{
              duration: blob.duration,
              delay: blob.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-neon-green font-heading font-semibold text-xs md:text-sm uppercase tracking-[0.25em] mb-8 md:mb-14 text-glow-green"
          >
            {tr(lang, 'hero_badge')}
          </motion.p>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-5" style={{ lineHeight: 1.2 }}>
            {lang === 'ar' ? (
              <>
                <span className="block mb-2">{tr(lang, 'hero_h1_1')}</span>
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
            transition={{ delay: 0.7 }}
            className="text-white/60 font-body text-sm md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
          >
            {tr(lang, 'hero_sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center"
          >
            <a href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 bg-neon-pink text-white font-heading font-bold rounded-full text-base md:text-lg animate-pulse-glow active:scale-95 transition-transform cursor-pointer text-center"
            >
              {tr(lang, 'hero_cta1')}
            </a>
            <a href="#experiences"
              onClick={(e) => { e.preventDefault(); document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-7 py-4 border border-white/20 text-white font-heading font-semibold rounded-full text-base md:text-lg active:border-neon-pink/50 active:text-neon-pink transition-all cursor-pointer text-center"
            >
              {tr(lang, 'hero_cta2')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 animate-float"
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
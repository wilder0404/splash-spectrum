import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";

// Large soft paint splodges centered roughly behind the headline text
const PAINT_SPLODGES = [
  { color: '#FF007F', cx: 48, cy: 50, rx: 28, ry: 18, blur: 55, opacity: [0.18, 0.28, 0.15, 0.25, 0.18], dur: 9,  delay: 0   },
  { color: '#9D00FF', cx: 35, cy: 55, rx: 22, ry: 14, blur: 50, opacity: [0.12, 0.22, 0.10, 0.20, 0.12], dur: 11, delay: 2   },
  { color: '#00F3FF', cx: 62, cy: 48, rx: 20, ry: 13, blur: 48, opacity: [0.10, 0.20, 0.08, 0.18, 0.10], dur: 10, delay: 1.2 },
  { color: '#39FF14', cx: 50, cy: 62, rx: 16, ry: 10, blur: 44, opacity: [0.08, 0.14, 0.06, 0.12, 0.08], dur: 13, delay: 3   },
];

export default function HeroSection() {
  const { lang } = useLang();
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const colors = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = 6 + Math.floor(Math.random() * 5);
      const newDroplets = Array.from({ length: count }, (_, idx) => {
        const angle = (idx / count) * 360 + Math.random() * 40;
        const dist = 25 + Math.random() * 65;
        return {
          id: Date.now() + Math.random() + idx,
          x: e.clientX,
          y: e.clientY,
          color,
          angle,
          dist,
          size: 8 + Math.random() * 18,
          isCore: idx === 0,
        };
      });
      setSplashes(prev => [...prev.slice(-40), ...newDroplets]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
      </div>

      {/* Soft paint splodges behind the headline — very subtle, paint-like */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {PAINT_SPLODGES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${s.cx}%`,
              top: `${s.cy}%`,
              width: `${s.rx * 2}vw`,
              height: `${s.ry * 2}vw`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at 45% 45%, ${s.color} 0%, ${s.color}88 25%, ${s.color}22 55%, transparent 75%)`,
              filter: `blur(${s.blur}px)`,
              borderRadius: '43% 57% 61% 39% / 47% 42% 58% 53%',
            }}
            animate={{
              opacity: s.opacity,
              scale:   [1, 1.06, 0.97, 1.04, 1],
              rotate:  [0, 4, -3, 2, 0],
            }}
            transition={{
              duration: s.dur,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Click paint splashes — behind text */}
      <AnimatePresence>
        {splashes.map(droplet => {
          const rad = (droplet.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * droplet.dist;
          const ty = Math.sin(rad) * droplet.dist;
          return droplet.isCore ? (
            <motion.div
              key={droplet.id}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="pointer-events-none fixed z-[2] rounded-full"
              style={{
                left: droplet.x - 30,
                top: droplet.y - 30,
                width: 60,
                height: 60,
                background: `radial-gradient(circle, ${droplet.color}88 0%, ${droplet.color}33 50%, transparent 80%)`,
                filter: 'blur(6px)',
              }}
            />
          ) : (
            <motion.div
              key={droplet.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 0.8 }}
              animate={{ x: tx, y: ty, scale: [1, 1.2, 0], opacity: [0.8, 0.6, 0] }}
              exit={{}}
              transition={{ duration: 0.6 + Math.random() * 0.3, ease: 'easeOut' }}
              className="pointer-events-none fixed z-[2] rounded-full"
              style={{
                left: droplet.x - droplet.size / 2,
                top: droplet.y - droplet.size / 2,
                width: droplet.size,
                height: droplet.size * 1.3,
                backgroundColor: droplet.color,
                filter: 'blur(2px)',
                borderRadius: '50% 50% 58% 42%',
              }}
            />
          );
        })}
      </AnimatePresence>

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
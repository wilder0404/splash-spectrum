import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";

// Watercolor splash droplets — burst outward from center on load
// Each has angle/distance from center (50%, 52%) and a color layer
const SPLASH_CORE = [
  { color: '#FF007F', rx: 18, ry: 14, blur: 35, ox: 0,   oy: 0   },
  { color: '#9D00FF', rx: 16, ry: 12, blur: 32, ox: -3,  oy: 2   },
  { color: '#00F3FF', rx: 14, ry: 10, blur: 30, ox: 3,   oy: -2  },
  { color: '#FFD700', rx: 12, ry: 9,  blur: 28, ox: 2,   oy: 3   },
  { color: '#39FF14', rx: 10, ry: 8,  blur: 26, ox: -2,  oy: -3  },
];

const SPLASH_DROPLETS = [
  { color: '#FF007F', angle: 20,  dist: 22, size: 7,  blur: 12 },
  { color: '#9D00FF', angle: 60,  dist: 28, size: 5,  blur: 10 },
  { color: '#00F3FF', angle: 100, dist: 25, size: 9,  blur: 14 },
  { color: '#FFD700', angle: 140, dist: 30, size: 4,  blur: 8  },
  { color: '#39FF14', angle: 180, dist: 24, size: 6,  blur: 11 },
  { color: '#FF4500', angle: 220, dist: 27, size: 8,  blur: 13 },
  { color: '#FF007F', angle: 260, dist: 32, size: 5,  blur: 9  },
  { color: '#9D00FF', angle: 300, dist: 26, size: 7,  blur: 12 },
  { color: '#00F3FF', angle: 340, dist: 20, size: 4,  blur: 8  },
  // smaller far droplets
  { color: '#FF007F', angle: 40,  dist: 38, size: 3,  blur: 6  },
  { color: '#39FF14', angle: 80,  dist: 42, size: 3,  blur: 6  },
  { color: '#FFD700', angle: 160, dist: 40, size: 4,  blur: 7  },
  { color: '#9D00FF', angle: 240, dist: 44, size: 3,  blur: 6  },
  { color: '#00F3FF', angle: 320, dist: 36, size: 4,  blur: 7  },
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

      {/* Watercolor paint splash behind headline — bursts on load */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>

        {/* Central overlapping color mass */}
        {SPLASH_CORE.map((s, i) => (
          <motion.div
            key={`core-${i}`}
            className="absolute"
            style={{
              left: `${50 + s.ox}%`,
              top: `${52 + s.oy}%`,
              width: `${s.rx * 2}vw`,
              height: `${s.ry * 2}vw`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at 48% 48%, ${s.color}dd 0%, ${s.color}88 40%, ${s.color}22 70%, transparent 90%)`,
              filter: `blur(${s.blur}px)`,
              borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale:   [0, 1.6, 1.1, 1.25, 1.15],
              opacity: [0, 0.85, 0.65, 0.75, 0.65],
              rotate:  [0, 10, -5, 3, 0],
            }}
            transition={{
              duration: 3.5,
              delay: 0.1 + i * 0.08,
              times: [0, 0.2, 0.5, 0.75, 1],
              repeat: Infinity,
              repeatType: 'mirror',
              repeatDelay: 4,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Flying droplets bursting outward */}
        {SPLASH_DROPLETS.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * d.dist;
          const ty = Math.sin(rad) * d.dist;
          return (
            <motion.div
              key={`drop-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '52%',
                width: `${d.size}vw`,
                height: `${d.size * 0.7}vw`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(ellipse, ${d.color}cc 0%, ${d.color}55 60%, transparent 100%)`,
                filter: `blur(${d.blur}px)`,
                borderRadius: '50%',
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: [`0vw`, `${tx * 0.3}vw`, `${tx}vw`, `${tx * 1.05}vw`],
                y: [`0vw`, `${ty * 0.3}vw`, `${ty}vw`, `${ty * 1.05}vw`],
                scale: [0, 1.2, 0.9, 0.8],
                opacity: [0, 0.9, 0.7, 0.6],
              }}
              transition={{
                duration: 1.2,
                delay: 0.15 + i * 0.04,
                times: [0, 0.25, 0.7, 1],
                repeat: Infinity,
                repeatType: 'mirror',
                repeatDelay: 3.5,
                ease: [0.2, 0.8, 0.3, 1],
              }}
            />
          );
        })}
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
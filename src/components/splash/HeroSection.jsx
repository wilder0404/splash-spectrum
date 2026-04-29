import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";
const BLOB_COLORS = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF', '#FF4500', '#FFD700'];

// Fewer blobs, smaller, less intense for performance
const BLOBS_DESKTOP = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  color: BLOB_COLORS[i % BLOB_COLORS.length],
  x: [15, 65, 40, 80, 10, 55, 30, 70][i],
  y: [30, 45, 65, 25, 70, 55, 20, 80][i],
  size: 80 + (i * 20),
  duration: 6 + i * 1.2,
  delay: i * 0.5,
  xAmp: 8 + (i % 3) * 4,
  yAmp: 6 + (i % 3) * 4,
}));

const BLOBS_MOBILE = BLOBS_DESKTOP.slice(0, 4);

const BG_SHAPES = [
  { x: 20, y: 35, color: '#FF007F', r: 160, delay: 0 },
  { x: 65, y: 45, color: '#00F3FF', r: 200, delay: 1.5 },
  { x: 80, y: 25, color: '#9D00FF', r: 120, delay: 2.2 },
];

export default function HeroSection() {
  const { lang } = useLang();
  const [splashes, setSplashes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only add click splashes on desktop
  useEffect(() => {
    if (isMobile) return;
    const handleClick = (e) => {
      const colors = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dropletCount = 6 + Math.floor(Math.random() * 4);
      const newDroplets = Array.from({ length: dropletCount }, (_, idx) => {
        const angle = (idx / dropletCount) * 360 + Math.random() * 30;
        const distance = 30 + Math.random() * 60;
        return {
          id: Date.now() + Math.random() + idx,
          x: e.clientX,
          y: e.clientY,
          color,
          angle,
          distance,
          size: 4 + Math.random() * 10,
          isCore: idx === 0,
        };
      });
      setSplashes(prev => [...prev.slice(-30), ...newDroplets]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isMobile]);

  const blobs = isMobile ? BLOBS_MOBILE : BLOBS_DESKTOP;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/20 to-obsidian" />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color}44 0%, ${blob.color}11 60%, transparent 80%)`,
              filter: 'blur(20px)',
              willChange: 'transform',
            }}
            animate={{
              x: [`0px`, `${blob.xAmp}px`, `-${blob.xAmp * 0.5}px`, `0px`],
              y: [`0px`, `-${blob.yAmp}px`, `${blob.yAmp * 0.6}px`, `0px`],
              opacity: [0.5, 0.8, 0.4, 0.5],
            }}
            transition={{
              duration: blob.duration,
              delay: blob.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Reduced static background shapes — desktop only */}
        {!isMobile && BG_SHAPES.map((s, i) => (
          <motion.div
            key={`splash-bg-${i}`}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 1.3,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at 40% 40%, ${s.color}33 0%, transparent 70%)`,
              filter: 'blur(40px)',
              borderRadius: '40% 60% 55% 45% / 45% 55% 60% 40%',
              willChange: 'transform',
            }}
            animate={{
              scale: [1, 1.06, 0.97, 1],
              opacity: [0.4, 0.65, 0.35, 0.4],
            }}
            transition={{
              duration: 7 + i * 1.5,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Click Paint Splashes — desktop only */}
      <AnimatePresence>
        {splashes.map(droplet => {
          const rad = (droplet.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * droplet.distance;
          const ty = Math.sin(rad) * droplet.distance;
          return droplet.isCore ? (
            <motion.div
              key={droplet.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.4, 1] }}
              className="pointer-events-none fixed z-[2] rounded-full"
              style={{
                left: droplet.x - 30,
                top: droplet.y - 30,
                width: 60,
                height: 60,
                background: `radial-gradient(circle, ${droplet.color}bb 0%, ${droplet.color}44 50%, transparent 100%)`,
                filter: 'blur(2px)',
              }}
            />
          ) : (
            <motion.div
              key={droplet.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
              animate={{ x: tx, y: ty, scale: [1, 1.2, 0.1], opacity: [0.9, 0.6, 0] }}
              exit={{}}
              transition={{ duration: 0.5, ease: [0.1, 0.7, 0.3, 1] }}
              className="pointer-events-none fixed z-[2]"
              style={{
                left: droplet.x - droplet.size / 2,
                top: droplet.y - droplet.size / 2,
                width: droplet.size,
                height: droplet.size * 1.4,
                backgroundColor: droplet.color,
                borderRadius: '50% 50% 55% 55%',
              }}
            />
          );
        })}
      </AnimatePresence>

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
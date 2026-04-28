import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const HERO_BG = "https://media.base44.com/images/public/69e5ef89828747441c931879/d591ebed4_generated_ffef7112.png";

const BLOB_COLORS = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF', '#FF4500', '#FFD700'];

function generateBlobs(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: BLOB_COLORS[i % BLOB_COLORS.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 80 + Math.random() * 160,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 4,
    xAmp: 8 + Math.random() * 14,
    yAmp: 8 + Math.random() * 14,
  }));
}

const blobs = generateBlobs(14);

export default function HeroSection() {
  const { lang } = useLang();
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const colors = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Generate multiple droplets per splash for realistic paint splat
      const dropletCount = 8 + Math.floor(Math.random() * 6);
      const newDroplets = Array.from({ length: dropletCount }, (_, idx) => {
        const angle = (idx / dropletCount) * 360 + Math.random() * 30;
        const distance = 30 + Math.random() * 80;
        return {
          id: Date.now() + Math.random() + idx,
          x: e.clientX,
          y: e.clientY,
          color,
          angle,
          distance,
          size: 4 + Math.random() * 14,
          isCore: idx === 0,
        };
      });
      setSplashes(prev => [...prev.slice(-60), ...newDroplets]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/20 to-obsidian" />
      </div>

      {/* Animated Paint Blobs — background layer */}
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
              background: `radial-gradient(circle, ${blob.color}55 0%, ${blob.color}22 50%, transparent 70%)`,
              filter: 'blur(18px)',
            }}
            animate={{
              x: [`0px`, `${blob.xAmp}px`, `-${blob.xAmp * 0.6}px`, `${blob.xAmp * 0.3}px`, `0px`],
              y: [`0px`, `-${blob.yAmp}px`, `${blob.yAmp * 0.8}px`, `-${blob.yAmp * 0.4}px`, `0px`],
              scale: [1, 1.15, 0.9, 1.08, 1],
              opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
            }}
            transition={{
              duration: blob.duration,
              delay: blob.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Persistent paint splat shapes — static large splashes in background */}
        {[
          { x: 20, y: 35, color: '#FF007F', r: 160, delay: 0 },
          { x: 65, y: 45, color: '#00F3FF', r: 200, delay: 1.5 },
          { x: 45, y: 60, color: '#39FF14', r: 140, delay: 0.8 },
          { x: 80, y: 25, color: '#9D00FF', r: 120, delay: 2.2 },
          { x: 10, y: 70, color: '#FF4500', r: 110, delay: 1.1 },
        ].map((s, i) => (
          <motion.div
            key={`splash-bg-${i}`}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 1.3,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at 40% 40%, ${s.color}44 0%, ${s.color}22 40%, transparent 70%)`,
              filter: 'blur(30px)',
              borderRadius: '40% 60% 55% 45% / 45% 55% 60% 40%',
            }}
            animate={{
              scale: [1, 1.08, 0.95, 1.05, 1],
              opacity: [0.5, 0.75, 0.45, 0.7, 0.5],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{
              duration: 6 + i * 1.2,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Click Paint Splash Effects — behind content */}
      <AnimatePresence>
        {splashes.map(droplet => {
          const rad = (droplet.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * droplet.distance;
          const ty = Math.sin(rad) * droplet.distance;
          return droplet.isCore ? (
            <motion.div
              key={droplet.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.4, 1] }}
              className="pointer-events-none fixed z-[2] rounded-full"
              style={{
                left: droplet.x - 35,
                top: droplet.y - 35,
                width: 70,
                height: 70,
                background: `radial-gradient(circle, ${droplet.color}cc 0%, ${droplet.color}66 40%, ${droplet.color}11 70%, transparent 100%)`,
                filter: 'blur(2px)',
              }}
            />
          ) : (
            <motion.div
              key={droplet.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
              animate={{
                x: tx,
                y: ty,
                scale: [1, 1.3, 0.2],
                opacity: [0.9, 0.7, 0],
              }}
              exit={{}}
              transition={{ duration: 0.55 + Math.random() * 0.3, ease: [0.1, 0.7, 0.3, 1] }}
              className="pointer-events-none fixed z-[2]"
              style={{
                left: droplet.x - droplet.size / 2,
                top: droplet.y - droplet.size / 2,
                width: droplet.size,
                height: droplet.size * 1.5,
                backgroundColor: droplet.color,
                borderRadius: '50% 50% 55% 55%',
                filter: `blur(0.5px)`,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Content — above splashes */}
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
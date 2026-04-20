import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const colors = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'];
      const newSplash = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setSplashes(prev => [...prev.slice(-8), newSplash]);
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

      {/* Animated Paint Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      </div>

      {/* Click Paint Splash Effects */}
      <AnimatePresence>
        {splashes.map(splash => (
          <motion.div
            key={splash.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="pointer-events-none fixed z-40 rounded-full"
            style={{
              left: splash.x - 30,
              top: splash.y - 30,
              width: 60,
              height: 60,
              background: `radial-gradient(circle, ${splash.color}cc, ${splash.color}44, transparent)`,
            }}
          />
        ))}
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
            className="text-neon-green font-heading font-semibold text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-glow-green"
          >
            Immersive Art Experience
          </motion.p>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6">
            Where Color{' '}
            <span className="text-neon-pink text-glow-pink">Becomes</span>
            <br />
            an{' '}
            <span className="text-electric-cyan text-glow-cyan">Experience</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 font-body text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Paint. Splash. Laugh. Create memories you can take home.
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
              🎨 Book Your Experience
            </a>
            <a href="#experiences"
              onClick={(e) => { e.preventDefault(); document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 border border-white/20 text-white font-heading font-semibold rounded-full text-lg hover:border-neon-pink/50 hover:text-neon-pink transition-all cursor-pointer"
            >
              View Experiences
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
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

const RINGS = [
  { color: '#FF007F', delay: 0,    size: 120 },
  { color: '#9D00FF', delay: 0.15, size: 120 },
  { color: '#00F3FF', delay: 0.3,  size: 120 },
  { color: '#39FF14', delay: 0.45, size: 120 },
];

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('logo'); // 'logo' | 'reveal' | 'exit'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1200);
    const t2 = setTimeout(() => setPhase('exit'), 2400);
    const t3 = setTimeout(() => onDone?.(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian overflow-hidden"
        >
          {/* Paint ring bursts */}
          {phase !== 'exit' && RINGS.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 pointer-events-none"
              style={{ borderColor: ring.color, width: ring.size, height: ring.size }}
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: [0.5, 8 + i * 3], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, delay: ring.delay, ease: [0.1, 0.6, 0.3, 1] }}
            />
          ))}

          {/* Glow behind logo */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, #FF007F55 0%, #9D00FF33 40%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase === 'exit'
              ? { scale: 0, opacity: 0 }
              : { scale: [0, 1.3, 1.0], opacity: [0, 1, 0.7] }
            }
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={phase === 'exit'
              ? { scale: 1.1, opacity: 0, y: -20 }
              : { scale: [0.4, 1.05, 1.0], opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.2, 0.9, 0.4, 1] }}
          >
            {/* Logo circle with neon border */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 0 2px #FF007F, 0 0 40px #FF007F88, 0 0 80px #9D00FF44' }}
                animate={{ boxShadow: [
                  '0 0 0 2px #FF007F, 0 0 40px #FF007F88, 0 0 80px #9D00FF44',
                  '0 0 0 2px #9D00FF, 0 0 40px #9D00FF88, 0 0 80px #00F3FF44',
                  '0 0 0 2px #FF007F, 0 0 40px #FF007F88, 0 0 80px #9D00FF44',
                ]}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src={LOGO_URL}
                alt="Splash Spectrum"
                className="w-24 h-24 rounded-full relative z-10"
              />
            </div>

            {/* Brand name — reveals after logo */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={phase === 'logo' ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading font-black text-2xl text-white tracking-widest">
                SPLASH <span className="text-neon-pink" style={{ textShadow: '0 0 20px #FF007F' }}>SPECTRUM</span>
              </p>
              <p className="font-body text-white/40 text-xs tracking-[0.3em] mt-1 uppercase">
                Where color comes alive
              </p>
            </motion.div>
          </motion.div>

          {/* Paint drip accents at top */}
          {['#FF007F', '#9D00FF', '#00F3FF', '#39FF14'].map((color, i) => (
            <motion.div
              key={`drip-${i}`}
              className="absolute top-0 rounded-b-full"
              style={{
                left: `${15 + i * 22}%`,
                width: 8 + i * 2,
                background: color,
                boxShadow: `0 0 12px ${color}`,
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: [0, 60 + i * 20, 50 + i * 18], opacity: [0, 0.8, 0.6] }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
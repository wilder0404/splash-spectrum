import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

// Ink bloom colors that expand and fade — cinematic feel
const BLOOMS = [
  { color: '#FF007F', x: 30, y: 60, size: 500, delay: 0,   duration: 4 },
  { color: '#9D00FF', x: 70, y: 40, size: 600, delay: 0.4, duration: 5 },
  { color: '#00F3FF', x: 50, y: 80, size: 400, delay: 0.8, duration: 4.5 },
];

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('start'); // start → show → exit
  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setPhase('exit');
    setTimeout(() => { setVisible(false); onDone?.(); }, 900);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 300);
    const t2 = setTimeout(() => setPhase('exit'), 4600);
    const t3 = setTimeout(() => { setVisible(false); onDone?.(); }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          onClick={dismiss}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] overflow-hidden cursor-pointer select-none"
        >

          {/* === INK BLOOMS — slow, elegant, barely visible === */}
          {BLOOMS.map((bloom, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${bloom.x}%`,
                top: `${bloom.y}%`,
                transform: 'translate(-50%, -50%)',
                width: bloom.size,
                height: bloom.size,
                background: `radial-gradient(circle, ${bloom.color}18 0%, ${bloom.color}08 40%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={phase === 'exit'
                ? { scale: 0.5, opacity: 0 }
                : { scale: [0, 1.2, 1.0], opacity: [0, 1, 0.85] }
              }
              transition={{ duration: bloom.duration, delay: bloom.delay, ease: [0.0, 0.6, 0.4, 1] }}
            />
          ))}

          {/* === THIN HORIZONTAL LINE that sweeps across — elegant reveal === */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              left: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent 0%, #FF007F 30%, #9D00FF 60%, #00F3FF 80%, transparent 100%)',
              opacity: 0.4,
            }}
            initial={{ width: 0, x: '-100%' }}
            animate={phase === 'start'
              ? { width: 0 }
              : phase === 'exit'
                ? { width: '100%', opacity: 0 }
                : { width: '100%' }
            }
            transition={{ duration: 1.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* === MAIN CONTENT === */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Logo — fades and scales in */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
              animate={phase === 'start'
                ? { opacity: 0, scale: 0.7, filter: 'blur(12px)' }
                : phase === 'exit'
                  ? { opacity: 0, scale: 1.1, filter: 'blur(8px)' }
                  : { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }
              transition={{ duration: 1.0, delay: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
            >
              {/* Subtle glow ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ margin: '-12px' }}
                animate={phase === 'show' ? {
                  boxShadow: [
                    '0 0 0 0px rgba(255,0,127,0)',
                    '0 0 0 8px rgba(255,0,127,0.15), 0 0 60px rgba(255,0,127,0.1)',
                    '0 0 0 4px rgba(157,0,255,0.12), 0 0 40px rgba(157,0,255,0.08)',
                    '0 0 0 6px rgba(255,0,127,0.15), 0 0 60px rgba(255,0,127,0.1)',
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src={LOGO_URL}
                alt="Splash Spectrum"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full relative z-10"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="text-center overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={phase === 'start'
                ? { opacity: 0, y: 24 }
                : phase === 'exit'
                  ? { opacity: 0, y: -16 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.9, delay: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
            >
              <h1 className="font-heading font-black text-4xl md:text-5xl text-white tracking-[0.12em] mb-1">
                SPLASH{' '}
                <span
                  className="text-neon-pink"
                  style={{ textShadow: '0 0 30px rgba(255,0,127,0.5)' }}
                >
                  SPECTRUM
                </span>
              </h1>

              {/* Tagline — slightly delayed */}
              <motion.p
                className="font-body text-white/40 text-sm tracking-[0.35em] uppercase mt-2"
                initial={{ opacity: 0 }}
                animate={phase === 'show' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Where color comes alive
              </motion.p>

              {/* Ultra-thin neon line under text */}
              <motion.div
                className="mx-auto mt-4 rounded-full"
                style={{
                  height: 1.5,
                  background: 'linear-gradient(90deg, transparent, #FF007F, #9D00FF, #00F3FF, transparent)',
                  opacity: 0.6,
                }}
                initial={{ width: 0 }}
                animate={phase === 'show' ? { width: '70%' } : { width: 0 }}
                transition={{ duration: 1.0, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>

            {/* Three dots — loading/breathing indicator */}
            <motion.div
              className="flex items-center gap-2 mt-10"
              initial={{ opacity: 0 }}
              animate={phase === 'show' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              {['#FF007F', '#9D00FF', '#00F3FF'].map((color, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ width: 5, height: 5, background: color }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          </div>

          {/* === TAP HINT — bottom, very subtle === */}
          <motion.p
            className="absolute bottom-8 font-body text-white/20 text-[10px] tracking-[0.4em] uppercase z-10"
            initial={{ opacity: 0 }}
            animate={phase === 'show' ? { opacity: [0, 0.8, 0.3, 0.8, 0.3] } : { opacity: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            tap to enter
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
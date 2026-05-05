import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";
const DRIP_VIDEO = "https://media.base44.com/videos/public/69e5ef89828747441c931879/d846e180a_WhatsAppVideo1447-11-18at204637.mp4";

const RINGS = [
  { color: '#FF007F', delay: 0.2,  size: 140 },
  { color: '#9D00FF', delay: 0.5,  size: 140 },
  { color: '#00F3FF', delay: 0.8,  size: 140 },
  { color: '#39FF14', delay: 1.1,  size: 140 },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  color: ['#FF007F', '#9D00FF', '#00F3FF', '#39FF14'][i % 4],
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  delay: Math.random() * 2,
  duration: 2 + Math.random() * 2,
}));

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('logo'); // 'logo' | 'reveal' | 'exit'
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);
  const dismissed = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setPhase('exit');
    setTimeout(() => { setVisible(false); onDone?.(); }, 800);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 4500);
    const t3 = setTimeout(() => { setVisible(false); onDone?.(); }, 5300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={dismiss}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian overflow-hidden cursor-pointer"
        >
          {/* === DRIP VIDEO — top-aligned, covers width === */}
          <div className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden" style={{ height: '60%' }}>
            <motion.video
              ref={videoRef}
              src={DRIP_VIDEO}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-top"
              style={{ mixBlendMode: 'screen' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'exit' ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            {/* Fade out at the bottom so drip blends into obsidian */}
            <div
              className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)' }}
            />
          </div>

          {/* === ANIMATED PARTICLES floating around === */}
          {phase !== 'logo' && PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0.4, 0.8, 0],
                scale: [0, 1, 0.8, 1.2, 0],
                y: [0, -20, -10, -30, -50],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* === NEON RING BURSTS === */}
          {RINGS.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 pointer-events-none"
              style={{ borderColor: ring.color, width: ring.size, height: ring.size }}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: [0.4, 10 + i * 3], opacity: [0.9, 0] }}
              transition={{ duration: 2.2, delay: ring.delay, ease: [0.1, 0.6, 0.3, 1] }}
            />
          ))}

          {/* === CENTER GLOW PULSE === */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, #FF007F44 0%, #9D00FF22 50%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={phase === 'exit'
              ? { scale: 0, opacity: 0 }
              : { scale: [0.8, 1.3, 0.9, 1.2, 1.0], opacity: [0.4, 0.9, 0.5, 0.8, 0.6] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* === LOGO + BRAND === */}
          <motion.div
            className="relative flex flex-col items-center gap-6 z-10"
            initial={{ scale: 0.3, opacity: 0, y: 30 }}
            animate={phase === 'exit'
              ? { scale: 1.1, opacity: 0, y: -30 }
              : { scale: [0.3, 1.08, 0.97, 1.0], opacity: 1, y: 0 }
            }
            transition={{ duration: 1.0, ease: [0.2, 0.9, 0.4, 1] }}
          >
            {/* Logo with pulsing neon ring */}
            <div className="relative">
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{ background: 'radial-gradient(circle, #FF007F44 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: [
                  '0 0 0 3px #FF007F, 0 0 50px #FF007F99, 0 0 100px #9D00FF44',
                  '0 0 0 3px #9D00FF, 0 0 50px #9D00FF99, 0 0 100px #00F3FF44',
                  '0 0 0 3px #00F3FF, 0 0 50px #00F3FF99, 0 0 100px #39FF1444',
                  '0 0 0 3px #FF007F, 0 0 50px #FF007F99, 0 0 100px #9D00FF44',
                ]}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={LOGO_URL}
                alt="Splash Spectrum"
                className="w-28 h-28 rounded-full relative z-10"
                animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
            </div>

            {/* Brand name with letter-by-letter reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={phase === 'logo' ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.p
                className="font-heading font-black text-3xl text-white tracking-[0.2em]"
                animate={{ textShadow: [
                  '0 0 0px transparent',
                  '0 0 30px rgba(255,255,255,0.3)',
                  '0 0 0px transparent',
                ]}}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                SPLASH{' '}
                <motion.span
                  className="text-neon-pink"
                  animate={{ textShadow: [
                    '0 0 20px #FF007F',
                    '0 0 40px #FF007F, 0 0 60px #9D00FF44',
                    '0 0 20px #FF007F',
                  ]}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  SPECTRUM
                </motion.span>
              </motion.p>
              <motion.p
                className="font-body text-white/50 text-xs tracking-[0.4em] mt-2 uppercase"
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={phase === 'logo' ? { opacity: 0 } : { opacity: 1, letterSpacing: '0.4em' }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Where color comes alive
              </motion.p>

              {/* Neon underline that draws in */}
              <motion.div
                className="mt-3 mx-auto rounded-full"
                style={{ height: 2, background: 'linear-gradient(90deg, #FF007F, #9D00FF, #00F3FF)' }}
                initial={{ width: 0, opacity: 0 }}
                animate={phase === 'logo' ? { width: 0, opacity: 0 } : { width: '100%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* === TAP HINT === */}
          <motion.p
            className="absolute bottom-10 font-body text-white/30 text-xs tracking-[0.3em] uppercase z-10"
            initial={{ opacity: 0 }}
            animate={phase === 'reveal' ? { opacity: [0, 0.7, 0.3, 0.7, 0.3] } : { opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            tap anywhere to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
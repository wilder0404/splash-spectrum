import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

const RINGS = [
  { color: '#FF007F', delay: 0,    size: 120 },
  { color: '#9D00FF', delay: 0.2,  size: 120 },
  { color: '#00F3FF', delay: 0.4,  size: 120 },
  { color: '#39FF14', delay: 0.6,  size: 120 },
];

const DRIPS = [
  { left: 6,   width: 14, color: '#FF007F', delay: 0.3,  duration: 2.2, height: 180 },
  { left: 18,  width: 10, color: '#9D00FF', delay: 0.7,  duration: 2.5, height: 130 },
  { left: 30,  width: 16, color: '#00F3FF', delay: 0.5,  duration: 2.0, height: 220 },
  { left: 44,  width: 11, color: '#39FF14', delay: 1.0,  duration: 2.3, height: 160 },
  { left: 57,  width: 13, color: '#FF007F', delay: 0.4,  duration: 2.6, height: 200 },
  { left: 70,  width: 9,  color: '#9D00FF', delay: 0.8,  duration: 2.1, height: 140 },
  { left: 82,  width: 15, color: '#00F3FF', delay: 0.2,  duration: 2.4, height: 190 },
  { left: 92,  width: 10, color: '#39FF14', delay: 1.1,  duration: 2.2, height: 120 },
];

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('logo'); // 'logo' | 'reveal' | 'exit'
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1000);
    const t2 = setTimeout(() => setPhase('exit'), 4500);
    const t3 = setTimeout(() => { setVisible(false); onDone?.(); }, 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleClick = () => {
    setPhase('exit');
    setTimeout(() => { setVisible(false); onDone?.(); }, 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onClick={handleClick}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian overflow-hidden cursor-pointer"
        >
          {/* Paint ring bursts */}
          {RINGS.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 pointer-events-none"
              style={{ borderColor: ring.color, width: ring.size, height: ring.size }}
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: [0.5, 8 + i * 3], opacity: [0.8, 0] }}
              transition={{ duration: 2.0, delay: ring.delay, ease: [0.1, 0.6, 0.3, 1] }}
            />
          ))}

          {/* Paint drips from top */}
          {DRIPS.map((drip, i) => (
            <motion.div
              key={`drip-${i}`}
              className="absolute top-0 pointer-events-none"
              style={{ left: `${drip.left}%`, width: drip.width }}
            >
              {/* Drip body */}
              <motion.div
                style={{
                  width: '100%',
                  background: `linear-gradient(to bottom, ${drip.color} 0%, ${drip.color}cc 70%, ${drip.color}44 100%)`,
                  boxShadow: `0 0 8px ${drip.color}88`,
                  borderRadius: '0 0 40% 40%',
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: drip.height, opacity: [0, 0.9, 0.85] }}
                transition={{ duration: drip.duration, delay: drip.delay, ease: [0.2, 0.8, 0.4, 1] }}
              />
              {/* Drip bulb tip */}
              <motion.div
                style={{
                  width: drip.width * 1.4,
                  height: drip.width * 1.6,
                  background: drip.color,
                  boxShadow: `0 0 10px ${drip.color}`,
                  borderRadius: '40% 40% 60% 60%',
                  marginLeft: -drip.width * 0.2,
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: drip.height, opacity: [0, 1, 0.9] }}
                transition={{ duration: drip.duration, delay: drip.delay, ease: [0.2, 0.8, 0.4, 1] }}
              />
            </motion.div>
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

          {/* Logo + brand name */}
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={phase === 'exit'
              ? { scale: 1.05, opacity: 0, y: -20 }
              : { scale: [0.4, 1.05, 1.0], opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.2, 0.9, 0.4, 1] }}
          >
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
              <img src={LOGO_URL} alt="Splash Spectrum" className="w-24 h-24 rounded-full relative z-10" />
            </div>

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

          {/* "Tap to enter" hint */}
          <motion.p
            className="absolute bottom-10 font-body text-white/25 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'logo' ? { opacity: 0 } : { opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            tap anywhere to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DROPLETS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (i / 28) * 360 + Math.random() * 13,
  distance: 80 + Math.random() * 180,
  size: 4 + Math.random() * 18,
  color: ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'][i % 4],
  delay: Math.random() * 0.15,
  tail: 0.4 + Math.random() * 0.6,
}));

export default function PaintSplashIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian pointer-events-none"
        >
          {/* Central burst */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.4, 1.1], opacity: [1, 1, 0] }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.4, 1] }}
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FF007F 0%, #9D00FF 40%, #00F3FF 70%, transparent 100%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Droplets shooting out */}
          {DROPLETS.map((d) => {
            const rad = (d.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * d.distance;
            const ty = Math.sin(rad) * d.distance;
            return (
              <motion.div
                key={d.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: tx,
                  y: ty,
                  scale: [0, 1, 0.7],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.75 + d.tail * 0.3,
                  delay: d.delay,
                  ease: 'easeOut',
                }}
                className="absolute rounded-full"
                style={{
                  width: d.size,
                  height: d.size * (1.5 + d.tail),
                  backgroundColor: d.color,
                  boxShadow: `0 0 ${d.size * 2}px ${d.color}`,
                  borderRadius: '40% 40% 60% 60%',
                  rotate: `${d.angle + 90}deg`,
                }}
              />
            );
          })}

          {/* Extra small splatter dots */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i / 18) * 360 + Math.random() * 20;
            const rad = (angle * Math.PI) / 180;
            const dist = 30 + Math.random() * 260;
            const color = ['#FF007F', '#39FF14', '#9D00FF', '#00F3FF'][i % 4];
            return (
              <motion.div
                key={`dot-${i}`}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(rad) * dist,
                  y: Math.sin(rad) * dist,
                  scale: [0, 1, 0],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 0.6 + Math.random() * 0.4, delay: 0.05 + Math.random() * 0.2, ease: 'easeOut' }}
                className="absolute rounded-full"
                style={{ width: 4 + Math.random() * 6, height: 4 + Math.random() * 6, backgroundColor: color }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
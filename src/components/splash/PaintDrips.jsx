import React from 'react';
import { motion } from 'framer-motion';

const drips = [
  { left: '5%', color: '#FF007F', height: 120, delay: 0 },
  { left: '15%', color: '#9D00FF', height: 80, delay: 0.3 },
  { left: '30%', color: '#00F3FF', height: 150, delay: 0.6 },
  { left: '50%', color: '#39FF14', height: 100, delay: 0.2 },
  { left: '70%', color: '#FF007F', height: 130, delay: 0.5 },
  { left: '85%', color: '#9D00FF', height: 90, delay: 0.1 },
  { left: '95%', color: '#00F3FF', height: 110, delay: 0.4 },
];

export default function PaintDrips() {
  return (
    <div className="relative w-full h-0 overflow-visible pointer-events-none z-20">
      {drips.map((drip, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-1 rounded-b-full"
          style={{
            left: drip.left,
            backgroundColor: drip.color,
            opacity: 0.4,
          }}
          initial={{ height: 0 }}
          whileInView={{ height: drip.height }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: drip.delay, ease: 'easeOut' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{ backgroundColor: drip.color, filter: `blur(2px)` }} />
        </motion.div>
      ))}
    </div>
  );
}
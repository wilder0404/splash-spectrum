import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Paint drip configurations - thick drips like real paint flowing from top
const dripsConfig = [
  { id: 1, left: 2, width: 22, color: '#FF007F', delay: 0, maxHeight: 75 },
  { id: 2, left: 7, width: 18, color: '#9D00FF', delay: 0.1, maxHeight: 85 },
  { id: 3, left: 12, width: 26, color: '#00F3FF', delay: 0.05, maxHeight: 90 },
  { id: 4, left: 18, width: 20, color: '#39FF14', delay: 0.15, maxHeight: 70 },
  { id: 5, left: 24, width: 24, color: '#FF007F', delay: 0.08, maxHeight: 95 },
  { id: 6, left: 30, width: 28, color: '#9D00FF', delay: 0.12, maxHeight: 80 },
  { id: 7, left: 36, width: 19, color: '#00F3FF', delay: 0.02, maxHeight: 88 },
  { id: 8, left: 42, width: 30, color: '#39FF14', delay: 0.18, maxHeight: 92 },
  { id: 9, left: 48, width: 22, color: '#FF007F', delay: 0.06, maxHeight: 78 },
  { id: 10, left: 54, width: 25, color: '#9D00FF', delay: 0.14, maxHeight: 86 },
  { id: 11, left: 60, width: 20, color: '#00F3FF', delay: 0.03, maxHeight: 72 },
  { id: 12, left: 66, width: 28, color: '#39FF14', delay: 0.1, maxHeight: 94 },
  { id: 13, left: 72, width: 21, color: '#FF007F', delay: 0.16, maxHeight: 82 },
  { id: 14, left: 78, width: 24, color: '#9D00FF', delay: 0.04, maxHeight: 76 },
  { id: 15, left: 84, width: 23, color: '#00F3FF', delay: 0.11, maxHeight: 89 },
  { id: 16, left: 90, width: 27, color: '#39FF14', delay: 0.07, maxHeight: 84 },
  { id: 17, left: 96, width: 18, color: '#FF007F', delay: 0.13, maxHeight: 68 },
];

// Individual drip component with real dripping animation
const PaintDrip = ({ drip }) => {
  const [hasStarted, setHasStarted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), drip.delay * 1000);
    return () => clearTimeout(timer);
  }, [drip.delay]);

  const bulbSize = drip.width * 1.4;
  
  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${drip.left}%`,
        width: `${drip.width}px`,
        zIndex: 0,
      }}
    >
      {/* Paint pool at top - the source */}
      <div
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: drip.width * 2,
          height: 20,
          background: drip.color,
          borderRadius: '0 0 50% 50%',
          opacity: 0.12,
          filter: `blur(2px)`,
        }}
      />
      
      {/* The dripping paint stream */}
      {hasStarted && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: `linear-gradient(to right, ${drip.color}10, ${drip.color}20, ${drip.color}15, ${drip.color}20, ${drip.color}10)`,
            borderRadius: '0 0 4px 4px',
          }}
          initial={{ height: 0 }}
          animate={{ height: `${drip.maxHeight}vh` }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      )}
      
      {/* The bulbous drip tip that moves down */}
      {hasStarted && (
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            width: bulbSize,
            height: bulbSize * 1.5,
            marginLeft: -bulbSize / 2,
            background: `radial-gradient(ellipse at 30% 30%, ${drip.color}30, ${drip.color}18 50%, ${drip.color}10 100%)`,
            borderRadius: '45% 45% 50% 50%',
            filter: 'blur(1px)',
          }}
          initial={{ top: 0 }}
          animate={{ top: `${drip.maxHeight}vh` }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      )}
    </div>
  );
};

export default function PaintDrips() {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {dripsConfig.map((drip) => (
        <PaintDrip key={drip.id} drip={drip} />
      ))}
    </div>
  );
}

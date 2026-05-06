import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Paint drip configurations - thick drips like real paint flowing from top
const dripsConfig = [
  { id: 1, left: 2, width: 28, color: '#FF007F', maxHeight: 75 },
  { id: 2, left: 8, width: 22, color: '#9D00FF', maxHeight: 85 },
  { id: 3, left: 14, width: 32, color: '#00F3FF', maxHeight: 90 },
  { id: 4, left: 20, width: 25, color: '#39FF14', maxHeight: 70 },
  { id: 5, left: 27, width: 30, color: '#FF007F', maxHeight: 95 },
  { id: 6, left: 34, width: 35, color: '#9D00FF', maxHeight: 80 },
  { id: 7, left: 41, width: 24, color: '#00F3FF', maxHeight: 88 },
  { id: 8, left: 48, width: 38, color: '#39FF14', maxHeight: 92 },
  { id: 9, left: 55, width: 28, color: '#FF007F', maxHeight: 78 },
  { id: 10, left: 62, width: 32, color: '#9D00FF', maxHeight: 86 },
  { id: 11, left: 69, width: 26, color: '#00F3FF', maxHeight: 72 },
  { id: 12, left: 76, width: 34, color: '#39FF14', maxHeight: 94 },
  { id: 13, left: 83, width: 27, color: '#FF007F', maxHeight: 82 },
  { id: 14, left: 90, width: 30, color: '#9D00FF', maxHeight: 76 },
  { id: 15, left: 96, width: 24, color: '#00F3FF', maxHeight: 89 },
];

// Individual drip component with realistic dripping animation
const PaintDrip = ({ drip, index }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    // Small stagger so all drips start almost together
    const timer = setTimeout(() => setShouldAnimate(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const bulbSize = drip.width * 1.6;
  const animationDuration = 4 + (index % 3) * 0.5;
  
  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${drip.left}%`,
        width: `${drip.width}px`,
      }}
    >
      {/* Paint pool at top - the source where paint gathers */}
      <div
        style={{
          position: 'absolute',
          top: -15,
          left: '50%',
          transform: 'translateX(-50%)',
          width: drip.width * 2.5,
          height: 30,
          background: `radial-gradient(ellipse at center bottom, ${drip.color}18, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      
      {/* The dripping paint stream that grows downward */}
      {shouldAnimate && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: -drip.width / 2,
            width: drip.width,
            background: `linear-gradient(to bottom, ${drip.color}15, ${drip.color}08)`,
            borderRadius: '4px 4px 0 0',
          }}
          initial={{ height: 0 }}
          animate={{ height: `${drip.maxHeight}vh` }}
          transition={{
            duration: animationDuration,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      )}
      
      {/* The bulbous drip tip that moves down - the key paint drip shape */}
      {shouldAnimate && (
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            width: bulbSize,
            height: bulbSize * 1.4,
            marginLeft: -bulbSize / 2,
            background: `radial-gradient(ellipse at 35% 30%, ${drip.color}25, ${drip.color}12 60%, ${drip.color}06 100%)`,
            borderRadius: '40% 40% 50% 50%',
          }}
          initial={{ top: 0 }}
          animate={{ top: `${drip.maxHeight}vh` }}
          transition={{
            duration: animationDuration,
            ease: [0.4, 0, 0.2, 1],
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
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {dripsConfig.map((drip, index) => (
        <PaintDrip key={drip.id} drip={drip} index={index} />
      ))}
    </div>
  );
}

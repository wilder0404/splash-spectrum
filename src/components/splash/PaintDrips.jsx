import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Paint drip configurations - thick drips like real paint flowing from top
const generateDrips = () => [
  // Dense arrangement of thick paint drips - all starting together
  { id: 1, left: 2, width: 35, color: '#FF007F', duration: 4.5, height: 75 },
  { id: 2, left: 6, width: 28, color: '#9D00FF', duration: 5.2, height: 85 },
  { id: 3, left: 11, width: 42, color: '#00F3FF', duration: 4.8, height: 90 },
  { id: 4, left: 17, width: 32, color: '#39FF14', duration: 5.5, height: 70 },
  { id: 5, left: 22, width: 38, color: '#FF007F', duration: 4.2, height: 95 },
  { id: 6, left: 28, width: 45, color: '#9D00FF', duration: 5.8, height: 80 },
  { id: 7, left: 34, width: 30, color: '#00F3FF', duration: 4.4, height: 88 },
  { id: 8, left: 40, width: 50, color: '#39FF14', duration: 5.0, height: 92 },
  { id: 9, left: 47, width: 36, color: '#FF007F', duration: 5.3, height: 78 },
  { id: 10, left: 53, width: 42, color: '#9D00FF', duration: 4.6, height: 86 },
  { id: 11, left: 59, width: 32, color: '#00F3FF', duration: 5.1, height: 72 },
  { id: 12, left: 65, width: 48, color: '#39FF14', duration: 4.9, height: 94 },
  { id: 13, left: 71, width: 35, color: '#FF007F', duration: 5.4, height: 82 },
  { id: 14, left: 77, width: 40, color: '#9D00FF', duration: 4.3, height: 76 },
  { id: 15, left: 83, width: 38, color: '#00F3FF', duration: 5.6, height: 89 },
  { id: 16, left: 89, width: 45, color: '#39FF14', duration: 4.7, height: 84 },
  { id: 17, left: 95, width: 30, color: '#FF007F', duration: 5.2, height: 68 },
];

// Generate thick paint drip SVG path with bulbous bottom
const generateThickDripPath = (width) => {
  const centerX = width / 2;
  const bulbRadius = width * 0.5;
  
  return `
    M 0 0
    L ${width} 0
    L ${width} 0
    C ${width} 60, ${width * 0.85} 75, ${width * 0.8} 85
    C ${width * 0.75} 92, ${centerX + bulbRadius} 94, ${centerX + bulbRadius} 96
    A ${bulbRadius} ${bulbRadius} 0 1 1 ${centerX - bulbRadius} 96
    C ${centerX - bulbRadius} 94, ${width * 0.25} 92, ${width * 0.2} 85
    C ${width * 0.15} 75, 0 60, 0 0
    Z
  `;
};

// Individual drip component
const PaintDrip = ({ drip }) => {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${drip.left}%`,
        width: `${drip.width}px`,
        height: `${drip.height}vh`,
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${drip.width} 100`}
        preserveAspectRatio="none"
        style={{ 
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Glossy paint gradient */}
          <linearGradient id={`paint-grad-${drip.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={drip.color} stopOpacity="0.08" />
            <stop offset="30%" stopColor={drip.color} stopOpacity="0.15" />
            <stop offset="50%" stopColor={drip.color} stopOpacity="0.12" />
            <stop offset="70%" stopColor={drip.color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={drip.color} stopOpacity="0.08" />
          </linearGradient>
          
          {/* Highlight for wet paint look */}
          <linearGradient id={`highlight-${drip.id}`} x1="0.3" y1="0" x2="0.7" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Main paint drip body */}
        <motion.path
          d={generateThickDripPath(drip.width)}
          fill={`url(#paint-grad-${drip.id})`}
          initial={{ 
            scaleY: 0,
          }}
          animate={{ 
            scaleY: 1,
          }}
          transition={{
            duration: drip.duration,
            ease: [0.22, 0.03, 0.26, 1], // Slow drip easing
          }}
          style={{
            transformOrigin: 'top',
          }}
        />
        
        {/* Highlight stripe for glossy effect */}
        <motion.path
          d={generateThickDripPath(drip.width)}
          fill={`url(#highlight-${drip.id})`}
          initial={{ 
            scaleY: 0,
          }}
          animate={{ 
            scaleY: 1,
          }}
          transition={{
            duration: drip.duration,
            ease: [0.22, 0.03, 0.26, 1],
          }}
          style={{
            transformOrigin: 'top',
          }}
        />
      </svg>
    </motion.div>
  );
};

export default function PaintDrips() {
  const drips = useMemo(() => generateDrips(), []);
  
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* All drips render and animate together */}
      {drips.map((drip) => (
        <PaintDrip key={drip.id} drip={drip} />
      ))}
    </div>
  );
}

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Paint drip configurations - varied organic shapes flowing from top to bottom
const generateDrips = () => [
  // Left side drips
  { id: 1, left: 3, width: 18, color: '#FF007F', delay: 0, duration: 25, bulbScale: 1.4 },
  { id: 2, left: 8, width: 12, color: '#9D00FF', delay: 3.5, duration: 30, bulbScale: 1.2 },
  { id: 3, left: 15, width: 22, color: '#00F3FF', delay: 1.2, duration: 28, bulbScale: 1.6 },
  
  // Left-center drips
  { id: 4, left: 25, width: 10, color: '#39FF14', delay: 5, duration: 32, bulbScale: 1.1 },
  { id: 5, left: 32, width: 16, color: '#FF007F', delay: 2, duration: 26, bulbScale: 1.3 },
  
  // Center drips
  { id: 6, left: 42, width: 20, color: '#9D00FF', delay: 4, duration: 29, bulbScale: 1.5 },
  { id: 7, left: 50, width: 14, color: '#00F3FF', delay: 0.5, duration: 27, bulbScale: 1.25 },
  { id: 8, left: 58, width: 18, color: '#39FF14', delay: 6, duration: 31, bulbScale: 1.35 },
  
  // Right-center drips
  { id: 9, left: 68, width: 12, color: '#FF007F', delay: 2.5, duration: 28, bulbScale: 1.15 },
  { id: 10, left: 75, width: 24, color: '#9D00FF', delay: 1, duration: 33, bulbScale: 1.7 },
  
  // Right side drips
  { id: 11, left: 85, width: 15, color: '#00F3FF', delay: 4.5, duration: 26, bulbScale: 1.3 },
  { id: 12, left: 93, width: 10, color: '#39FF14', delay: 3, duration: 30, bulbScale: 1.1 },
];

// Generate organic drip path with realistic paint shape
const generateDripPath = (width, height, bulbScale = 1.3) => {
  const bulbSize = width * bulbScale;
  const neckWidth = width * 0.6;
  const bodyTaper = width * 0.8;
  
  // Create organic drip shape with narrowing body and bulbous end
  return `
    M ${width * 0.1} 0
    Q ${width * 0.05} ${height * 0.15} ${width * 0.15} ${height * 0.3}
    Q ${width * 0.1} ${height * 0.5} ${(width - neckWidth) / 2} ${height * 0.7}
    Q ${(width - bulbSize) / 2 - 5} ${height * 0.85} ${(width - bulbSize) / 2} ${height * 0.9}
    Q ${(width - bulbSize) / 2 - 3} ${height * 0.95} ${width / 2} ${height}
    Q ${(width + bulbSize) / 2 + 3} ${height * 0.95} ${(width + bulbSize) / 2} ${height * 0.9}
    Q ${(width + bulbSize) / 2 + 5} ${height * 0.85} ${width - (width - neckWidth) / 2} ${height * 0.7}
    Q ${width - width * 0.1} ${height * 0.5} ${width - width * 0.15} ${height * 0.3}
    Q ${width - width * 0.05} ${height * 0.15} ${width * 0.9} 0
    Z
  `;
};

// Individual drip component with animation
const PaintDrip = ({ drip, screenHeight }) => {
  const dripHeight = screenHeight * (0.6 + Math.random() * 0.35); // Varies between 60-95% of screen height
  
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${drip.left}%`,
        width: `${drip.width}px`,
        height: '100%',
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: drip.delay * 0.3 }}
    >
      <svg
        width={drip.width}
        height="100%"
        style={{ 
          overflow: 'visible',
          filter: `blur(0.5px)`,
        }}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for paint depth */}
          <linearGradient id={`drip-grad-${drip.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={drip.color} stopOpacity="0.25" />
            <stop offset="30%" stopColor={drip.color} stopOpacity="0.18" />
            <stop offset="70%" stopColor={drip.color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={drip.color} stopOpacity="0.08" />
          </linearGradient>
          
          {/* Subtle glow filter */}
          <filter id={`drip-glow-${drip.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated drip path */}
        <motion.path
          d={generateDripPath(drip.width, dripHeight, drip.bulbScale)}
          fill={`url(#drip-grad-${drip.id})`}
          filter={`url(#drip-glow-${drip.id})`}
          initial={{ 
            scaleY: 0,
            originY: 0,
          }}
          animate={{ 
            scaleY: [0, 1],
          }}
          transition={{
            duration: drip.duration,
            delay: drip.delay,
            repeat: Infinity,
            repeatDelay: 5,
            ease: [0.25, 0.1, 0.25, 1], // Smooth easing
          }}
          style={{
            transformOrigin: 'top',
          }}
        />
        
        {/* Secondary layer for depth */}
        <motion.path
          d={generateDripPath(drip.width * 0.7, dripHeight * 0.95, drip.bulbScale * 0.9)}
          fill={drip.color}
          fillOpacity="0.06"
          transform={`translate(${drip.width * 0.15}, 0)`}
          initial={{ 
            scaleY: 0,
            originY: 0,
          }}
          animate={{ 
            scaleY: [0, 1],
          }}
          transition={{
            duration: drip.duration * 1.1,
            delay: drip.delay + 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: [0.25, 0.1, 0.25, 1],
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
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Background subtle glow effect */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, #FF007F 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, #9D00FF 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, #00F3FF 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Paint drips */}
      {drips.map((drip) => (
        <PaintDrip key={drip.id} drip={drip} screenHeight={screenHeight} />
      ))}
    </div>
  );
}

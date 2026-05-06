import React from 'react';

// Paint drip configurations - realistic positions and sizes
const drips = [
  { id: 1, left: 3, width: 18, color: '#FF007F', height: 75, delay: 0 },
  { id: 2, left: 9, width: 14, color: '#9D00FF', height: 88, delay: 0.1 },
  { id: 3, left: 16, width: 20, color: '#00F3FF', height: 92, delay: 0.05 },
  { id: 4, left: 23, width: 12, color: '#39FF14', height: 70, delay: 0.15 },
  { id: 5, left: 31, width: 22, color: '#FF007F', height: 95, delay: 0.08 },
  { id: 6, left: 38, width: 16, color: '#9D00FF', height: 82, delay: 0.12 },
  { id: 7, left: 46, width: 18, color: '#00F3FF', height: 78, delay: 0.03 },
  { id: 8, left: 54, width: 24, color: '#39FF14', height: 90, delay: 0.18 },
  { id: 9, left: 62, width: 15, color: '#FF007F', height: 72, delay: 0.07 },
  { id: 10, left: 69, width: 20, color: '#9D00FF', height: 85, delay: 0.14 },
  { id: 11, left: 77, width: 13, color: '#00F3FF', height: 68, delay: 0.02 },
  { id: 12, left: 84, width: 19, color: '#39FF14', height: 93, delay: 0.1 },
  { id: 13, left: 92, width: 16, color: '#FF007F', height: 80, delay: 0.06 },
  { id: 14, left: 97, width: 14, color: '#9D00FF', height: 76, delay: 0.16 },
];

// Single paint drip component
function PaintDrip({ drip }) {
  const bulbSize = drip.width * 1.6;
  
  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${drip.left}%`,
        width: drip.width,
        height: `${drip.height}%`,
        animation: `paintDrip 3.5s cubic-bezier(0.4, 0, 0.2, 1) ${drip.delay}s forwards`,
        opacity: 0,
        transformOrigin: 'top center',
      }}
    >
      {/* Paint stream - tapered body */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: drip.width,
          height: '100%',
          background: `linear-gradient(to bottom, ${drip.color}18 0%, ${drip.color}10 50%, ${drip.color}05 100%)`,
          clipPath: 'polygon(20% 0%, 80% 0%, 65% 100%, 35% 100%)',
        }}
      >
        {/* Highlight streak */}
        <div
          style={{
            position: 'absolute',
            left: '30%',
            top: 0,
            width: '15%',
            height: '100%',
            background: `linear-gradient(to bottom, ${drip.color}12 0%, ${drip.color}06 100%)`,
          }}
        />
      </div>
      
      {/* Bulbous drip tip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: bulbSize,
          height: bulbSize * 1.3,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 52" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id={`bulbGrad${drip.id}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor={drip.color} stopOpacity="0.2" />
              <stop offset="60%" stopColor={drip.color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={drip.color} stopOpacity="0.04" />
            </radialGradient>
          </defs>
          {/* Bulb shape */}
          <path
            d="M12 0 Q6 4, 4 16 Q2 28, 10 42 Q16 50, 20 52 Q24 50, 30 42 Q38 28, 36 16 Q34 4, 28 0 Z"
            fill={`url(#bulbGrad${drip.id})`}
          />
          {/* Glossy highlight */}
          <ellipse cx="14" cy="18" rx="5" ry="7" fill={drip.color} fillOpacity="0.12" />
        </svg>
      </div>
    </div>
  );
}

export default function PaintDrips() {
  return (
    <div 
      className="absolute inset-0 w-full overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes paintDrip {
          0% {
            clip-path: inset(100% 0 0 0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }
      `}} />
      
      {drips.map((drip) => (
        <PaintDrip key={drip.id} drip={drip} />
      ))}
    </div>
  );
}

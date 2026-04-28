import React from 'react';

// Each drip has a thick base at top and narrows as it falls, with a round bulb at the tip
const DRIPS = [
  { left: 2,   width: 18, color: '#FF007F', delay: 0,    duration: 4.0, height: 55 },
  { left: 7,   width: 12, color: '#FF007F', delay: 0.4,  duration: 3.5, height: 75 },
  { left: 9,   width: 8,  color: '#FF007F', delay: 1.1,  duration: 5.0, height: 45 },
  { left: 14,  width: 22, color: '#9D00FF', delay: 0.2,  duration: 3.8, height: 65 },
  { left: 19,  width: 10, color: '#9D00FF', delay: 1.4,  duration: 4.5, height: 80 },
  { left: 22,  width: 6,  color: '#9D00FF', delay: 0.7,  duration: 3.2, height: 50 },
  { left: 28,  width: 20, color: '#00F3FF', delay: 0.9,  duration: 4.2, height: 70 },
  { left: 33,  width: 9,  color: '#00F3FF', delay: 0.1,  duration: 3.6, height: 60 },
  { left: 36,  width: 6,  color: '#00F3FF', delay: 1.6,  duration: 5.2, height: 42 },
  { left: 41,  width: 24, color: '#39FF14', delay: 0.5,  duration: 3.9, height: 72 },
  { left: 46,  width: 11, color: '#39FF14', delay: 1.2,  duration: 4.6, height: 58 },
  { left: 50,  width: 7,  color: '#39FF14', delay: 0.3,  duration: 3.3, height: 85 },
  { left: 55,  width: 19, color: '#FF007F', delay: 1.0,  duration: 4.1, height: 66 },
  { left: 60,  width: 10, color: '#FF4500', delay: 0.6,  duration: 3.7, height: 48 },
  { left: 63,  width: 6,  color: '#FF4500', delay: 1.8,  duration: 5.1, height: 77 },
  { left: 68,  width: 21, color: '#9D00FF', delay: 0.8,  duration: 4.3, height: 62 },
  { left: 73,  width: 9,  color: '#00F3FF', delay: 0.2,  duration: 3.5, height: 53 },
  { left: 76,  width: 6,  color: '#00F3FF', delay: 1.3,  duration: 4.8, height: 88 },
  { left: 81,  width: 20, color: '#FF007F', delay: 0.4,  duration: 3.9, height: 68 },
  { left: 86,  width: 11, color: '#39FF14', delay: 1.5,  duration: 4.4, height: 57 },
  { left: 89,  width: 7,  color: '#9D00FF', delay: 0.0,  duration: 3.1, height: 43 },
  { left: 93,  width: 18, color: '#00F3FF', delay: 1.1,  duration: 4.7, height: 74 },
  { left: 97,  width: 8,  color: '#FF007F', delay: 0.9,  duration: 3.6, height: 61 },
];

export default function PaintDrips() {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-0" style={{ height: '100vh', overflow: 'hidden' }}>
      {DRIPS.map((drip, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `${drip.left}%`,
            width: `${drip.width}px`,
            animation: `paintDrip ${drip.duration}s ease-in ${drip.delay}s infinite`,
            opacity: 0.35,
          }}
        >
          {/* Thick paint body — tapers from wide at top to narrow */}
          <svg
            width={drip.width}
            height="100%"
            style={{ display: 'block', overflow: 'visible', position: 'absolute', top: 0 }}
            viewBox={`0 0 ${drip.width} 100`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={drip.color} stopOpacity="1" />
                <stop offset="60%" stopColor={drip.color} stopOpacity="0.9" />
                <stop offset="90%" stopColor={drip.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={drip.color} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Main drip shape: wide at top, tapers to a point */}
            <path
              d={`M0,0 Q${drip.width * 0.1},50 ${drip.width * 0.2},100 L${drip.width * 0.8},100 Q${drip.width * 0.9},50 ${drip.width},0 Z`}
              fill={`url(#grad-${i})`}
            />
          </svg>

          {/* Drip bulb tip */}
          <div
            style={{
              position: 'absolute',
              bottom: -drip.width * 0.7,
              left: '50%',
              transform: 'translateX(-50%)',
              width: drip.width * 0.85,
              height: drip.width * 1.1,
              backgroundColor: drip.color,
              borderRadius: '40% 40% 60% 60%',
              boxShadow: `0 0 ${drip.width}px ${drip.color}99`,
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes paintDrip {
          0%   { height: 0vh;   opacity: 0; }
          4%   { opacity: 0.35; }
          75%  { height: 105vh; opacity: 0.35; }
          90%  { height: 108vh; opacity: 0.15; }
          100% { height: 110vh; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
import React from 'react';

// Dulled colors (reduced saturation/brightness vs pure neons)
const DRIPS = [
  { left: 2,   width: 18, color: '#cc0066', delay: 0,    duration: 14.0, height: 55 },
  { left: 7,   width: 12, color: '#cc0066', delay: 1.2,  duration: 16.5, height: 75 },
  { left: 9,   width: 8,  color: '#cc0066', delay: 3.0,  duration: 18.0, height: 45 },
  { left: 14,  width: 22, color: '#7a00cc', delay: 0.8,  duration: 15.5, height: 65 },
  { left: 19,  width: 10, color: '#7a00cc', delay: 4.0,  duration: 17.5, height: 80 },
  { left: 22,  width: 6,  color: '#7a00cc', delay: 2.0,  duration: 13.5, height: 50 },
  { left: 28,  width: 20, color: '#00b8cc', delay: 2.5,  duration: 16.0, height: 70 },
  { left: 33,  width: 9,  color: '#00b8cc', delay: 0.5,  duration: 14.5, height: 60 },
  { left: 36,  width: 6,  color: '#00b8cc', delay: 5.0,  duration: 19.0, height: 42 },
  { left: 41,  width: 24, color: '#28cc10', delay: 1.5,  duration: 15.5, height: 72 },
  { left: 46,  width: 11, color: '#28cc10', delay: 3.5,  duration: 17.0, height: 58 },
  { left: 50,  width: 7,  color: '#28cc10', delay: 0.9,  duration: 14.0, height: 85 },
  { left: 55,  width: 19, color: '#cc0066', delay: 2.8,  duration: 16.5, height: 66 },
  { left: 60,  width: 10, color: '#cc3300', delay: 1.8,  duration: 15.0, height: 48 },
  { left: 63,  width: 6,  color: '#cc3300', delay: 4.5,  duration: 18.5, height: 77 },
  { left: 68,  width: 21, color: '#7a00cc', delay: 2.2,  duration: 16.0, height: 62 },
  { left: 73,  width: 9,  color: '#00b8cc', delay: 0.6,  duration: 14.5, height: 53 },
  { left: 76,  width: 6,  color: '#00b8cc', delay: 3.8,  duration: 17.5, height: 88 },
  { left: 81,  width: 20, color: '#cc0066', delay: 1.2,  duration: 15.5, height: 68 },
  { left: 86,  width: 11, color: '#28cc10', delay: 4.2,  duration: 17.0, height: 57 },
  { left: 89,  width: 7,  color: '#7a00cc', delay: 0.0,  duration: 13.5, height: 43 },
  { left: 93,  width: 18, color: '#00b8cc', delay: 3.2,  duration: 18.0, height: 74 },
  { left: 97,  width: 8,  color: '#cc0066', delay: 2.6,  duration: 15.5, height: 61 },
];

export default function PaintDrips() {
  return (
    // z-0 keeps drips BEHIND the hero splash blobs (z-[1]) and all content (z-10)
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-0" style={{ height: '100vh', overflow: 'hidden' }}>
      {DRIPS.map((drip, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `${drip.left}%`,
            width: `${drip.width}px`,
            animation: `paintDrip ${drip.duration}s ease-in ${drip.delay}s infinite`,
            opacity: 0.28,
          }}
        >
          {/* Thick paint body */}
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
                <stop offset="60%" stopColor={drip.color} stopOpacity="0.85" />
                <stop offset="90%" stopColor={drip.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={drip.color} stopOpacity="0.3" />
              </linearGradient>
            </defs>
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
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes paintDrip {
          0%   { height: 0vh;   opacity: 0; }
          5%   { opacity: 0.28; }
          78%  { height: 105vh; opacity: 0.28; }
          92%  { height: 108vh; opacity: 0.10; }
          100% { height: 110vh; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
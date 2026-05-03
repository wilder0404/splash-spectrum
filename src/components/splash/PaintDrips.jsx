import React from 'react';

const DRIPS = [
  { left: 8,   width: 14, color: '#cc0066', delay: 0,    duration: 16.0 },
  { left: 20,  width: 10, color: '#7a00cc', delay: 2.5,  duration: 18.0 },
  { left: 35,  width: 16, color: '#00b8cc', delay: 1.0,  duration: 15.5 },
  { left: 50,  width: 12, color: '#28cc10', delay: 3.5,  duration: 17.0 },
  { left: 65,  width: 10, color: '#cc0066', delay: 1.8,  duration: 16.5 },
  { left: 80,  width: 14, color: '#7a00cc', delay: 0.5,  duration: 18.5 },
  { left: 92,  width: 9,  color: '#00b8cc', delay: 4.0,  duration: 15.0 },
];

export default function PaintDrips() {
  return (
    <div className="relative w-full pointer-events-none overflow-hidden" style={{ height: '120px' }}>
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
          0%   { height: 0px;   opacity: 0; }
          8%   { opacity: 0.22; }
          75%  { height: 110px; opacity: 0.22; }
          100% { height: 120px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
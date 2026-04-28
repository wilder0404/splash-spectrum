import React from 'react';

const DRIPS = [
  { left: 2,   width: 22, color: '#FF007F', delay: 0,    duration: 10 },
  { left: 6,   width: 10, color: '#FF007F', delay: 2.1,  duration: 13 },
  { left: 11,  width: 16, color: '#9D00FF', delay: 0.5,  duration: 11 },
  { left: 15,  width: 8,  color: '#9D00FF', delay: 3.2,  duration: 14 },
  { left: 19,  width: 26, color: '#00F3FF', delay: 1.0,  duration: 9  },
  { left: 25,  width: 11, color: '#00F3FF', delay: 0.3,  duration: 12 },
  { left: 29,  width: 7,  color: '#39FF14', delay: 2.8,  duration: 15 },
  { left: 34,  width: 20, color: '#39FF14', delay: 0.8,  duration: 10 },
  { left: 39,  width: 9,  color: '#FF007F', delay: 1.6,  duration: 13 },
  { left: 43,  width: 24, color: '#9D00FF', delay: 0.1,  duration: 11 },
  { left: 49,  width: 12, color: '#00F3FF', delay: 3.5,  duration: 9  },
  { left: 53,  width: 7,  color: '#FF4500', delay: 1.2,  duration: 14 },
  { left: 57,  width: 18, color: '#FF4500', delay: 0.6,  duration: 10 },
  { left: 62,  width: 10, color: '#39FF14', delay: 2.4,  duration: 12 },
  { left: 66,  width: 25, color: '#FF007F', delay: 0.9,  duration: 11 },
  { left: 72,  width: 8,  color: '#9D00FF', delay: 1.8,  duration: 13 },
  { left: 76,  width: 14, color: '#00F3FF', delay: 0.4,  duration: 10 },
  { left: 81,  width: 21, color: '#39FF14', delay: 2.0,  duration: 9  },
  { left: 86,  width: 9,  color: '#FF007F', delay: 3.0,  duration: 14 },
  { left: 90,  width: 17, color: '#9D00FF', delay: 0.7,  duration: 11 },
  { left: 95,  width: 11, color: '#00F3FF', delay: 1.4,  duration: 12 },
  { left: 98,  width: 7,  color: '#FF4500', delay: 2.6,  duration: 10 },
];

export default function PaintDrips() {
  return (
    <div
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{ height: '100vh', overflow: 'hidden', zIndex: 0 }}
    >
      {DRIPS.map((drip, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: `${drip.left}%`,
            width: `${drip.width}px`,
          }}
        >
          {/* Animated drip container */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              animation: `dripGrow ${drip.duration}s ease-in-out ${drip.delay}s infinite`,
              transformOrigin: 'top center',
            }}
          >
            {/* Thick top blob — the paint pooling at top */}
            <div style={{
              width: `${drip.width * 1.3}px`,
              marginLeft: `-${drip.width * 0.15}px`,
              height: `${drip.width * 0.8}px`,
              background: drip.color,
              borderRadius: '0 0 60% 60%',
              opacity: 0.85,
            }} />

            {/* Main paint stream — tapers from wide to narrow */}
            <div style={{
              width: '55%',
              marginLeft: '22.5%',
              height: '60vh',
              background: `linear-gradient(to bottom, ${drip.color} 0%, ${drip.color} 70%, ${drip.color}99 88%, transparent 100%)`,
              borderRadius: '2px 2px 8px 8px',
              opacity: 0.75,
            }} />

            {/* Round drip bulb at the tip */}
            <div style={{
              width: `${drip.width * 0.9}px`,
              height: `${drip.width * 1.2}px`,
              marginLeft: `${drip.width * 0.05}px`,
              background: drip.color,
              borderRadius: '45% 45% 55% 55%',
              opacity: 0.85,
              boxShadow: `0 4px 12px ${drip.color}66`,
            }} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes dripGrow {
          0%   { transform: scaleY(0); opacity: 0; }
          8%   { opacity: 1; }
          65%  { transform: scaleY(1); opacity: 0.75; }
          85%  { transform: scaleY(1); opacity: 0.4; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
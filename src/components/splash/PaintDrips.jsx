import React from 'react';

// Dense drips packed across the top, like paint dripping from a shelf
const DRIPS = [
  { left: 1,   width: 28, color: '#4B0082', delay: 0,    duration: 12 },
  { left: 4,   width: 14, color: '#6A0DAD', delay: 1.5,  duration: 14 },
  { left: 7,   width: 8,  color: '#6A0DAD', delay: 3.2,  duration: 16 },
  { left: 10,  width: 20, color: '#00BFFF', delay: 0.4,  duration: 11 },
  { left: 13,  width: 10, color: '#00BFFF', delay: 2.8,  duration: 15 },
  { left: 16,  width: 6,  color: '#39FF14', delay: 1.1,  duration: 13 },
  { left: 19,  width: 24, color: '#39FF14', delay: 0.7,  duration: 10 },
  { left: 23,  width: 12, color: '#FF69B4', delay: 2.0,  duration: 14 },
  { left: 26,  width: 8,  color: '#FF007F', delay: 0.2,  duration: 12 },
  { left: 29,  width: 22, color: '#FF007F', delay: 3.5,  duration: 11 },
  { left: 33,  width: 10, color: '#FF4500', delay: 1.3,  duration: 15 },
  { left: 36,  width: 7,  color: '#FF8C00', delay: 0.6,  duration: 13 },
  { left: 39,  width: 26, color: '#FFD700', delay: 2.4,  duration: 10 },
  { left: 43,  width: 13, color: '#FFD700', delay: 0.9,  duration: 14 },
  { left: 47,  width: 8,  color: '#FF69B4', delay: 3.1,  duration: 16 },
  { left: 50,  width: 20, color: '#FF007F', delay: 0.3,  duration: 11 },
  { left: 54,  width: 11, color: '#9D00FF', delay: 1.8,  duration: 13 },
  { left: 57,  width: 7,  color: '#9D00FF', delay: 2.6,  duration: 15 },
  { left: 60,  width: 25, color: '#00F3FF', delay: 0.5,  duration: 12 },
  { left: 65,  width: 12, color: '#00F3FF', delay: 1.7,  duration: 10 },
  { left: 68,  width: 8,  color: '#39FF14', delay: 3.3,  duration: 14 },
  { left: 71,  width: 22, color: '#FF007F', delay: 0.8,  duration: 11 },
  { left: 75,  width: 10, color: '#FF4500', delay: 2.1,  duration: 13 },
  { left: 78,  width: 6,  color: '#FF8C00', delay: 1.0,  duration: 16 },
  { left: 81,  width: 20, color: '#FFD700', delay: 0.1,  duration: 12 },
  { left: 85,  width: 11, color: '#6A0DAD', delay: 2.9,  duration: 10 },
  { left: 88,  width: 7,  color: '#00BFFF', delay: 1.6,  duration: 14 },
  { left: 91,  width: 24, color: '#FF007F', delay: 0.4,  duration: 11 },
  { left: 95,  width: 13, color: '#39FF14', delay: 2.3,  duration: 13 },
  { left: 98,  width: 8,  color: '#9D00FF', delay: 0.7,  duration: 15 },
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
            {/* Top paint mass — thick and wide */}
            <div style={{
              width: `${drip.width * 1.4}px`,
              marginLeft: `-${drip.width * 0.2}px`,
              height: `${drip.width * 0.7}px`,
              background: drip.color,
              borderRadius: '0 0 55% 55%',
              opacity: 0.9,
            }} />

            {/* Drip stream — solid, no blur */}
            <div style={{
              width: '50%',
              marginLeft: '25%',
              height: '65vh',
              background: `linear-gradient(to bottom, ${drip.color} 0%, ${drip.color} 75%, ${drip.color}bb 90%, transparent 100%)`,
              borderRadius: '2px 2px 6px 6px',
              opacity: 0.8,
            }} />

            {/* Bulb tip at bottom */}
            <div style={{
              width: `${drip.width * 0.95}px`,
              height: `${drip.width * 1.3}px`,
              marginLeft: `${drip.width * 0.025}px`,
              background: drip.color,
              borderRadius: '40% 40% 60% 60%',
              opacity: 0.9,
            }} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes dripGrow {
          0%   { transform: scaleY(0); opacity: 0; }
          6%   { opacity: 1; }
          70%  { transform: scaleY(1); opacity: 0.85; }
          88%  { transform: scaleY(1); opacity: 0.4; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
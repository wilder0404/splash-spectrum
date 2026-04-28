import React from 'react';

// Subtle but visible paint drips — spread across top, slow and natural
const DRIPS = [
  { left: 3,   width: 18, color: '#6A0DAD', delay: 0,    duration: 13 },
  { left: 8,   width: 10, color: '#4B0082', delay: 2.5,  duration: 15 },
  { left: 14,  width: 22, color: '#00BFFF', delay: 0.8,  duration: 12 },
  { left: 19,  width: 12, color: '#39FF14', delay: 3.5,  duration: 14 },
  { left: 25,  width: 8,  color: '#39FF14', delay: 1.2,  duration: 16 },
  { left: 30,  width: 20, color: '#FF007F', delay: 0.3,  duration: 11 },
  { left: 36,  width: 11, color: '#FF4500', delay: 2.8,  duration: 13 },
  { left: 42,  width: 16, color: '#FFD700', delay: 1.0,  duration: 15 },
  { left: 48,  width: 9,  color: '#FFD700', delay: 4.0,  duration: 12 },
  { left: 54,  width: 21, color: '#FF007F', delay: 0.6,  duration: 14 },
  { left: 60,  width: 12, color: '#9D00FF', delay: 2.1,  duration: 11 },
  { left: 66,  width: 8,  color: '#00F3FF', delay: 3.2,  duration: 16 },
  { left: 72,  width: 19, color: '#FF007F', delay: 0.9,  duration: 13 },
  { left: 78,  width: 11, color: '#FF4500', delay: 1.7,  duration: 15 },
  { left: 84,  width: 7,  color: '#FFD700', delay: 2.9,  duration: 12 },
  { left: 89,  width: 17, color: '#6A0DAD', delay: 0.4,  duration: 14 },
  { left: 95,  width: 10, color: '#39FF14', delay: 3.8,  duration: 11 },
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
            animation: `dripFlow ${drip.duration}s ease-in ${drip.delay}s infinite`,
          }}
        >
          {/* Top paint blob edge */}
          <div style={{
            width: `${drip.width * 1.5}px`,
            marginLeft: `-${drip.width * 0.25}px`,
            height: `${drip.width * 0.6}px`,
            background: drip.color,
            borderRadius: '0 0 50% 50%',
            opacity: 0.55,
          }} />

          {/* Drip stream — tapers slightly */}
          <div style={{
            width: `${drip.width * 0.55}px`,
            marginLeft: `${drip.width * 0.225}px`,
            height: '60vh',
            background: `linear-gradient(to bottom, ${drip.color} 0%, ${drip.color} 80%, ${drip.color}66 95%, transparent 100%)`,
            opacity: 0.5,
            borderRadius: '1px 1px 4px 4px',
          }} />

          {/* Bulb at the tip */}
          <div style={{
            width: `${drip.width * 0.9}px`,
            height: `${drip.width * 1.2}px`,
            marginLeft: `${drip.width * 0.05}px`,
            background: drip.color,
            borderRadius: '40% 40% 60% 60%',
            opacity: 0.55,
          }} />
        </div>
      ))}

      <style>{`
        @keyframes dripFlow {
          0%   { transform: scaleY(0); opacity: 0; }
          8%   { opacity: 1; }
          65%  { transform: scaleY(1); opacity: 0.9; }
          85%  { opacity: 0.5; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
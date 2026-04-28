import React, { useMemo } from 'react';

const COLORS = ['#FF007F', '#9D00FF', '#00F3FF', '#39FF14', '#FF4500'];

// Generate drip configs once
function makeDrips() {
  const drips = [];
  let x = 1;
  while (x < 100) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const width = 12 + Math.random() * 28; // thick paint streams
    const delay = Math.random() * 3;
    const duration = 5 + Math.random() * 5;
    const finalH = 40 + Math.random() * 55; // % of viewport height
    drips.push({ x, width, color, delay, duration, finalH });
    x += width + 2 + Math.random() * 6;
  }
  return drips;
}

const DRIPS = makeDrips();

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
            left: `${drip.x}%`,
            width: `${drip.width}px`,
            overflow: 'visible',
          }}
        >
          {/* Drip body */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              animation: `dripDown ${drip.duration}s cubic-bezier(0.4, 0, 0.8, 1) ${drip.delay}s infinite`,
              transformOrigin: 'top center',
              opacity: 0.3,
            }}
          >
            {/* Wide thick top bar */}
            <div style={{
              width: '100%',
              height: `${drip.width * 0.6}px`,
              background: drip.color,
              filter: `blur(${drip.width * 0.3}px)`,
              borderRadius: '0 0 4px 4px',
            }} />
            {/* Tapered stream */}
            <div style={{
              width: '60%',
              marginLeft: '20%',
              height: `${drip.finalH}vh`,
              background: `linear-gradient(to bottom, ${drip.color} 0%, ${drip.color}bb 60%, ${drip.color}44 85%, transparent 100%)`,
              filter: `blur(${drip.width * 0.18}px)`,
              borderRadius: '0 0 50% 50%',
            }} />
            {/* Round bulb tip */}
            <div style={{
              width: `${drip.width * 0.85}px`,
              height: `${drip.width * 1.1}px`,
              marginLeft: `${drip.width * 0.075}px`,
              background: drip.color,
              borderRadius: '40% 40% 60% 60%',
              filter: `blur(${drip.width * 0.2}px)`,
              boxShadow: `0 0 ${drip.width * 1.2}px ${drip.color}88`,
            }} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes dripDown {
          0%   { transform: scaleY(0); opacity: 0; }
          5%   { opacity: 1; }
          70%  { transform: scaleY(1); opacity: 0.3; }
          90%  { transform: scaleY(1.02); opacity: 0.15; }
          100% { transform: scaleY(1.02); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
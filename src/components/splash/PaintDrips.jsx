import React, { useEffect, useRef } from 'react';

const DRIP_CONFIG = [
  { left: '3%',  color: '#FF007F', delay: 0,    duration: 3.2 },
  { left: '12%', color: '#9D00FF', delay: 0.8,  duration: 2.8 },
  { left: '22%', color: '#00F3FF', delay: 0.3,  duration: 3.5 },
  { left: '33%', color: '#39FF14', delay: 1.2,  duration: 2.6 },
  { left: '45%', color: '#FF007F', delay: 0.5,  duration: 3.8 },
  { left: '56%', color: '#9D00FF', delay: 1.5,  duration: 2.9 },
  { left: '67%', color: '#00F3FF', delay: 0.2,  duration: 3.1 },
  { left: '78%', color: '#39FF14', delay: 1.0,  duration: 2.7 },
  { left: '88%', color: '#FF007F', delay: 0.7,  duration: 3.4 },
  { left: '96%', color: '#9D00FF', delay: 1.8,  duration: 3.0 },
];

export default function PaintDrips() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {DRIP_CONFIG.map((drip, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{ left: drip.left }}
        >
          {/* Main drip stem */}
          <div
            style={{
              width: '3px',
              background: `linear-gradient(to bottom, ${drip.color}00 0%, ${drip.color}cc 15%, ${drip.color} 70%, ${drip.color}bb 90%, ${drip.color}44 100%)`,
              borderRadius: '0 0 3px 3px',
              animation: `drip-fall-${i % 3} ${drip.duration}s ease-in ${drip.delay}s infinite`,
              transformOrigin: 'top center',
              boxShadow: `0 0 6px ${drip.color}88`,
            }}
          />
          {/* Drip bulb at bottom */}
          <div
            style={{
              width: '8px',
              height: '10px',
              backgroundColor: drip.color,
              borderRadius: '50% 50% 60% 60%',
              marginLeft: '-2.5px',
              boxShadow: `0 0 10px ${drip.color}, 0 0 20px ${drip.color}66`,
              animation: `drip-bulb-${i % 3} ${drip.duration}s ease-in ${drip.delay}s infinite`,
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes drip-fall-0 {
          0%   { height: 0vh; opacity: 0; }
          5%   { opacity: 1; }
          85%  { height: 110vh; opacity: 1; }
          95%  { height: 110vh; opacity: 0.3; }
          100% { height: 110vh; opacity: 0; }
        }
        @keyframes drip-fall-1 {
          0%   { height: 0vh; opacity: 0; }
          8%   { opacity: 1; }
          80%  { height: 110vh; opacity: 1; }
          92%  { height: 110vh; opacity: 0.3; }
          100% { height: 110vh; opacity: 0; }
        }
        @keyframes drip-fall-2 {
          0%   { height: 0vh; opacity: 0; }
          6%   { opacity: 1; }
          82%  { height: 110vh; opacity: 1; }
          94%  { height: 110vh; opacity: 0.3; }
          100% { height: 110vh; opacity: 0; }
        }
        @keyframes drip-bulb-0 {
          0%   { transform: translateY(0vh) scaleY(1); opacity: 0; }
          5%   { opacity: 1; }
          80%  { transform: translateY(107vh) scaleY(1.3); opacity: 1; }
          88%  { transform: translateY(109vh) scaleY(0.6) scaleX(1.8); opacity: 0.7; }
          100% { transform: translateY(110vh) scaleY(0); opacity: 0; }
        }
        @keyframes drip-bulb-1 {
          0%   { transform: translateY(0vh) scaleY(1); opacity: 0; }
          8%   { opacity: 1; }
          75%  { transform: translateY(107vh) scaleY(1.3); opacity: 1; }
          85%  { transform: translateY(109vh) scaleY(0.6) scaleX(1.8); opacity: 0.7; }
          100% { transform: translateY(110vh) scaleY(0); opacity: 0; }
        }
        @keyframes drip-bulb-2 {
          0%   { transform: translateY(0vh) scaleY(1); opacity: 0; }
          6%   { opacity: 1; }
          78%  { transform: translateY(107vh) scaleY(1.3); opacity: 1; }
          87%  { transform: translateY(109vh) scaleY(0.6) scaleX(1.8); opacity: 0.7; }
          100% { transform: translateY(110vh) scaleY(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
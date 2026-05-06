import React from 'react';

// Paint drip configurations - realistic positions and sizes
const dripsConfig = [
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

export default function PaintDrips() {
  return (
    <>
      {/* CSS Keyframes for the drip animation */}
      <style>{`
        @keyframes drip-down {
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
        
        @keyframes drip-bulb {
          0% {
            transform: translateY(-100%) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-100%) scale(1);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .paint-drip-container {
          position: absolute;
          top: 0;
          pointer-events: none;
        }
        
        .paint-stream {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: drip-down 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .paint-bulb {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: drip-bulb 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      
      <div 
        className="absolute inset-0 w-full pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {dripsConfig.map((drip) => {
          const bulbWidth = drip.width * 1.8;
          const bulbHeight = drip.width * 2.2;
          
          return (
            <div
              key={drip.id}
              className="paint-drip-container"
              style={{
                left: `${drip.left}%`,
                width: `${drip.width}px`,
                height: `${drip.height}%`,
              }}
            >
              {/* Paint source pool at top */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: drip.width * 2.5,
                  height: 16,
                  background: `radial-gradient(ellipse at center bottom, ${drip.color}20, transparent 70%)`,
                  borderRadius: '50%',
                }}
              />
              
              {/* The dripping paint stream - tapered shape */}
              <svg
                className="paint-stream"
                style={{
                  animationDelay: `${drip.delay}s`,
                  width: drip.width,
                  height: `${drip.height}%`,
                }}
                viewBox={`0 0 ${drip.width} 100`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`grad-${drip.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={drip.color} stopOpacity="0.06" />
                    <stop offset="35%" stopColor={drip.color} stopOpacity="0.12" />
                    <stop offset="50%" stopColor={drip.color} stopOpacity="0.15" />
                    <stop offset="65%" stopColor={drip.color} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={drip.color} stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id={`grad-v-${drip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={drip.color} stopOpacity="0.2" />
                    <stop offset="50%" stopColor={drip.color} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={drip.color} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Tapered paint stream shape */}
                <path
                  d={`
                    M ${drip.width * 0.2} 0
                    Q ${drip.width * 0.1} 20, ${drip.width * 0.15} 40
                    Q ${drip.width * 0.1} 60, ${drip.width * 0.2} 80
                    L ${drip.width * 0.35} 100
                    L ${drip.width * 0.65} 100
                    L ${drip.width * 0.8} 80
                    Q ${drip.width * 0.9} 60, ${drip.width * 0.85} 40
                    Q ${drip.width * 0.9} 20, ${drip.width * 0.8} 0
                    Z
                  `}
                  fill={`url(#grad-v-${drip.id})`}
                />
                {/* Highlight streak for wet paint look */}
                <path
                  d={`
                    M ${drip.width * 0.35} 0
                    Q ${drip.width * 0.3} 30, ${drip.width * 0.32} 60
                    L ${drip.width * 0.38} 100
                    L ${drip.width * 0.45} 100
                    Q ${drip.width * 0.42} 60, ${drip.width * 0.4} 30
                    L ${drip.width * 0.42} 0
                    Z
                  `}
                  fill={drip.color}
                  fillOpacity="0.08"
                />
              </svg>
              
              {/* The bulbous drip tip at bottom */}
              <div
                className="paint-bulb"
                style={{
                  animationDelay: `${drip.delay}s`,
                  width: bulbWidth,
                  height: bulbHeight,
                  marginLeft: -bulbWidth / 2,
                }}
              >
                <svg
                  width={bulbWidth}
                  height={bulbHeight}
                  viewBox={`0 0 ${bulbWidth} ${bulbHeight}`}
                >
                  <defs>
                    <radialGradient id={`bulb-${drip.id}`} cx="35%" cy="25%" r="65%">
                      <stop offset="0%" stopColor={drip.color} stopOpacity="0.25" />
                      <stop offset="50%" stopColor={drip.color} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={drip.color} stopOpacity="0.05" />
                    </radialGradient>
                  </defs>
                  {/* Realistic drip bulb shape */}
                  <path
                    d={`
                      M ${bulbWidth * 0.3} 0
                      Q ${bulbWidth * 0.1} ${bulbHeight * 0.1}, ${bulbWidth * 0.08} ${bulbHeight * 0.35}
                      Q ${bulbWidth * 0.05} ${bulbHeight * 0.6}, ${bulbWidth * 0.2} ${bulbHeight * 0.8}
                      Q ${bulbWidth * 0.35} ${bulbHeight * 0.95}, ${bulbWidth * 0.5} ${bulbHeight}
                      Q ${bulbWidth * 0.65} ${bulbHeight * 0.95}, ${bulbWidth * 0.8} ${bulbHeight * 0.8}
                      Q ${bulbWidth * 0.95} ${bulbHeight * 0.6}, ${bulbWidth * 0.92} ${bulbHeight * 0.35}
                      Q ${bulbWidth * 0.9} ${bulbHeight * 0.1}, ${bulbWidth * 0.7} 0
                      Z
                    `}
                    fill={`url(#bulb-${drip.id})`}
                  />
                  {/* Highlight for glossy effect */}
                  <ellipse
                    cx={bulbWidth * 0.35}
                    cy={bulbHeight * 0.35}
                    rx={bulbWidth * 0.12}
                    ry={bulbHeight * 0.15}
                    fill={drip.color}
                    fillOpacity="0.15"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

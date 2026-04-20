import React, { useEffect, useState } from 'react';

const drips = [
  { left: '5%', color: '#FF007F', height: 120, speed: 0.15 },
  { left: '15%', color: '#9D00FF', height: 80, speed: 0.22 },
  { left: '30%', color: '#00F3FF', height: 150, speed: 0.12 },
  { left: '50%', color: '#39FF14', height: 100, speed: 0.18 },
  { left: '70%', color: '#FF007F', height: 130, speed: 0.2 },
  { left: '85%', color: '#9D00FF', height: 90, speed: 0.14 },
  { left: '95%', color: '#00F3FF', height: 110, speed: 0.25 },
];

export default function PaintDrips() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full h-0 overflow-visible pointer-events-none z-20">
      {drips.map((drip, i) => {
        const offset = scrollY * drip.speed;
        return (
          <div
            key={i}
            className="absolute top-0 w-1 rounded-b-full transition-none"
            style={{
              left: drip.left,
              backgroundColor: drip.color,
              opacity: 0.45,
              height: drip.height,
              transform: `translateY(${offset}px)`,
              willChange: 'transform',
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{ backgroundColor: drip.color, filter: 'blur(2px)' }}
            />
          </div>
        );
      })}
    </div>
  );
}
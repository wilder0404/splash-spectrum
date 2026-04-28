import React from 'react';

// Uses the real paint drip image, animated to slowly slide down like real paint
export default function PaintDrips() {
  return (
    <>
      <style>{`
        @keyframes drip-slide {
          0%   { transform: translateY(-60%); }
          100% { transform: translateY(0%); }
        }
      `}</style>
      <div
        className="w-full pointer-events-none select-none"
        style={{ marginBottom: '-2px', overflow: 'hidden', lineHeight: 0 }}
      >
        <img
          src="https://media.base44.com/images/public/69e5ef89828747441c931879/3642a6a24_image.png"
          alt=""
          style={{
            width: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'top',
            animation: 'drip-slide 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate',
            opacity: 0.85,
            mixBlendMode: 'screen',
            maxHeight: '220px',
          }}
        />
      </div>
    </>
  );
}
import React from 'react';

// CSS-based RetroGrid with perspective and animated background grid
const RetroGrid = ({
  angle = 65,
  cellSize = 90,
  opacity = 0.45,
  lightLineColor = '#ffffff',
  darkLineColor = '#ffffff',
  className = '',
  startY = 0,
}) => {
  // Only apply top offset if startY > 0
  // To prevent flicker at the top, offset grid so lines never snap at startY
  // Use a negative offset for transformY in both grid layers and keyframes
  const gridPositionStyle = startY > 0
    ? { top: startY, height: `calc(100% - ${startY}px)` }
    : { top: 0, height: '100%' };
  return (
    <div
      className={`pointer-events-none absolute left-0 w-full overflow-hidden perspective-[350px] ${className}`}
      style={{ opacity, ...gridPositionStyle, position: 'absolute' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes gridMoveTransform {
          0% { transform: translateY(-${cellSize}px) translateZ(0); }
          100% { transform: translateY(0) translateZ(0); }
        }
        @keyframes gridBreath {
          0% { opacity: 0.35; }
          50% { opacity: 0.7; }
          100% { opacity: 0.35; }
        }
      `}</style>
      <div className="absolute inset-0" style={{ transform: `rotateX(${angle}deg)` }}>
        <div
          className="h-[300vh] w-[600vw] ml-[-200%]"
          style={{
            backgroundImage:
              `linear-gradient(to right, ${lightLineColor}99 1.5px, transparent 0),` + // vertical lines, 60% alpha
              `linear-gradient(to bottom, ${lightLineColor}cc 1px, transparent 0)`, // horizontal lines, 80% alpha
            backgroundRepeat: 'repeat',
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundPositionY: `${cellSize / 2}px`,
            animation: 'gridMoveTransform 4.5s linear infinite, gridBreath 6.5s ease-in-out infinite',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: `translateY(-${cellSize}px) translateZ(0)`,
            imageRendering: 'auto',
            filter: 'blur(0.4px)',
            opacity,
          }}
        />
      </div>
      {/* Top fade overlay to hide/fade-in grid lines at the upper edge */}
      {startY > 0 && (
        <div
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: 0,
            height: 56,
            background: 'linear-gradient(to bottom, var(--background, #181c2a) 80%, transparent 100%)',
            zIndex: 2,
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent to-90%" />
    </div>
  );
};

export default RetroGrid;

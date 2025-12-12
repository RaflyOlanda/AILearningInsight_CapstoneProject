import React from 'react';

// CSS-based RetroGrid with perspective and animated background grid
const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = '#ffffff',
  darkLineColor = '#ffffff',
  className = '',
}) => {
  const gridStyles = {
    '--grid-angle': `${angle}deg`,
    '--cell-size': `${cellSize}px`,
    '--opacity': opacity,
    '--light-line': lightLineColor,
    '--dark-line': darkLineColor,
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden perspective-[600px] opacity-(--opacity) ${className}`}
      style={gridStyles}
      aria-hidden="true"
    >
      {/* Keyframes for independent X and Y grid motion */}
      <style>{`
        @keyframes gridMoveY {
          0% { background-position-y: 0; }
          100% { background-position-y: var(--cell-size); }
        }
      `}</style>
      <div className="absolute inset-0 transform-[rotateX(var(--grid-angle))]">
        {/* Combined grid layer with both X and Y animations */}
        <div
          className="h-[300vh] inset-[0%_0px] ml-[-200%] origin-[50%_0_0] w-[600vw]"
          style={{
            backgroundImage:
              `linear-gradient(to right, var(--light-line) 1px, transparent 0),` +
              `linear-gradient(to bottom, var(--light-line) 1px, transparent 0),` +
              `linear-gradient(to right, var(--dark-line) 1px, transparent 0),` +
              `linear-gradient(to bottom, var(--dark-line) 1px, transparent 0)`,
            backgroundRepeat: 'repeat',
            backgroundSize: `var(--cell-size) var(--cell-size)`,
            animation: 'gridMoveY 1.2s linear infinite',
            filter: 'drop-shadow(0 0 3px var(--dark-line))',
            opacity: 'var(--opacity)'
          }}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-white/10 to-transparent to-90%" />
    </div>
  );
};

export default RetroGrid;

import React from 'react';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'rgba(255,255,255,0.9)',
  speed = '1s',
  thickness = '4.5px',
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...(rest.style || {}),
      }}
      {...rest}
    >
      <div
        className="pointer-events-none absolute w-[240%] h-[85%] opacity-65 bottom-[-22px] left-[-120%] rounded-full animate-star-movement-bottom z-10 mix-blend-screen blur-[8px]"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="pointer-events-none absolute w-[240%] h-[85%] opacity-65 top-[-22px] left-[-120%] rounded-full animate-star-movement-top z-10 mix-blend-screen blur-[8px]"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="relative z-30 rounded-[20px] border text-white text-center text-[14px] py-[8px] px-[14px] flex items-center gap-2 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,17,32,0.65), rgba(6,9,20,0.65))',
          borderColor: 'rgba(255,255,255,0.12)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04) inset, 0 10px 30px rgba(80,114,255,0.08)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-[60%] animate-star-shine"
            style={{
              background:
                'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 40%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.22) 60%, rgba(255,255,255,0) 100%)',
              filter: 'blur(4px)',
              animationDuration: speed,
            }}
          />
        </div>
        <div className="relative z-10 flex items-center gap-2">{children}</div>
      </div>
    </Component>
  );
};

export default StarBorder;
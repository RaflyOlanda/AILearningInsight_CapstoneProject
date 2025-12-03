import React from 'react';

const StarBorder = ({ 
  as: Component = 'button', 
  className = '', 
  color = 'cyan', // Warna default indigo yang cocok dengan tema
  speed = '6s', 
  thickness = 1, 
  children, 
  ...rest
}) => {
  // Warna latar belakang konten diubah menjadi gray-100 agar cocok dengan Navbar Anda
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`} // rounded-full agar sesuai tombol badge
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      {/* Efek Cahaya Bawah */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      {/* Efek Cahaya Atas */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      
      {/* Konten Badge: Diubah agar transparan/abu-abu sesuai desain Anda */}
      <div className="relative z-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center text-[14px] py-[6px] px-[12px] rounded-full flex items-center gap-2 border border-gray-100">
        {children}
      </div>
    </Component>
  );
};
export default StarBorder;
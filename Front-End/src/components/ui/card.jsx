import React from 'react';

// Card sederhana yang hanya menyediakan wrapper styling
const Card = ({ children, className }) => {
  return (
    // Styling default: Background putih, shadow, dan rounded corners
    // Menerima prop className untuk override atau tambahan styling
    <div className={`bg-white shadow-md rounded-lg ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;
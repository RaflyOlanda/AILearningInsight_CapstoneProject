import React from 'react';

// Card sederhana yang hanya menyediakan wrapper styling
const Card = ({ children, className }) => {
  return (
    // Styling default: Background putih, shadow, rounded corners, dan border
    // Menerima prop className untuk override atau tambahan styling
    <div className={`bg-white rounded-xl border border-gray-200 card-shadow ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;
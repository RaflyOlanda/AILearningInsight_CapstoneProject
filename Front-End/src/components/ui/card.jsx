import React from 'react';

// Card sederhana yang hanya menyediakan wrapper styling dan meneruskan atribut tambahan.
const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-card text-card-foreground rounded-xl border border-border card-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
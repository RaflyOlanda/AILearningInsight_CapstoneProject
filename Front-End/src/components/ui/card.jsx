import React from 'react';

// Card sederhana yang hanya menyediakan wrapper styling
const Card = ({ children, className }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border border-border card-shadow ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;
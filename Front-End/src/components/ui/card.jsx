import React from 'react';

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
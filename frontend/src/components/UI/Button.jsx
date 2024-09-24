import React from 'react';

const Button = ({ label, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}  // Add custom classes here
    >
      {label}
    </button>
  );
};

export default Button;

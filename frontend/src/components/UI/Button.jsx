import React from 'react';

const Button = ({ label, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-gold-ui focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

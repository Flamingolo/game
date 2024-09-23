import React from 'react';

const Button = ({ label, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

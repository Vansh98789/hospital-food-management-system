import React from 'react';

const Button = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

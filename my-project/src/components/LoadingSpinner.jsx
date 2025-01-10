import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin border-t-4 border-blue-500 w-16 h-16 border-solid rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;

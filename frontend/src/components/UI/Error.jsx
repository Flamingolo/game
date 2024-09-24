import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message || 'An unknown error occurred.'}</span>
    </div>
  );
};

export default Error;

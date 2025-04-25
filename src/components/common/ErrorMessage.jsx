import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg max-w-7xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
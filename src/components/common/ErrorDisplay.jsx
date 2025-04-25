import React from 'react';

function ErrorDisplay({ message = "An error occurred. Please try again later." }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-2">Error</h2>
      <p className="text-gray-300 text-center">{message}</p>
      <div className="mt-6 flex justify-center">
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorDisplay;
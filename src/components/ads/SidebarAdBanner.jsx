import React from 'react';

function SidebarAdBanner({ title = "Advertisement" }) {
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md">
      <div className="p-1 bg-gray-700 text-xs text-gray-400 uppercase tracking-wider text-center">
        {title}
      </div>
      <div className="h-72 bg-gradient-to-b from-gray-800 to-gray-700 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-white text-lg font-bold mb-2">Gaming Tournament</div>
        <p className="text-gray-300 text-sm mb-4">Register now for the upcoming championship</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SidebarAdBanner;
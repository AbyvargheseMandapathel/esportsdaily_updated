import React from 'react';

function HorizontalAdBanner({ title = "Advertisement" }) {
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md">
      <div className="p-1 bg-gray-700 text-xs text-gray-400 uppercase tracking-wider text-center">
        {title}
      </div>
      <div className="h-24 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="text-white text-lg font-bold mb-1">Subscribe to Premium</div>
          <p className="text-gray-300 text-sm">Get exclusive access to pro analysis and guides</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ml-4">
          Join Now
        </button>
      </div>
    </div>
  );
}

export default HorizontalAdBanner;
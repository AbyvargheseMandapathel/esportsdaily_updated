import React from 'react';

function RectangleAdBanner({ title = "Advertisement" }) {
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md">
      <div className="p-2 bg-gray-700 text-xs text-gray-400 uppercase tracking-wider text-center">
        {title}
      </div>
      <div className="h-60 sm:h-80 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-purple-400 text-lg font-bold mb-2">Premium Gaming Gear</div>
          <p className="text-gray-300 text-sm mb-4">Upgrade your setup with pro-level equipment</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RectangleAdBanner;
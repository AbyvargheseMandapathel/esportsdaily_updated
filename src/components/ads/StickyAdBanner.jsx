import React from 'react';

function StickyAdBanner({ title = "Advertisement" }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-800 border-t border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <div className="hidden sm:block mr-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider">{title}</div>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Join our Discord community</div>
              <p className="text-gray-400 text-xs">Connect with other gamers and stay updated</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200 mr-2">
              Join Now
            </button>
            <button className="text-gray-400 hover:text-gray-300 p-1" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyAdBanner;
import React from 'react';

function InlineAdBanner({ title = "Advertisement" }) {
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md my-6">
      <div className="p-1 bg-gray-700 text-xs text-gray-400 uppercase tracking-wider text-center">
        {title}
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-750">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-white text-base font-medium">Special Offer: 20% off all gaming peripherals</div>
            <p className="text-gray-400 text-xs">Limited time offer. Use code: ESPORTS20</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap ml-4">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default InlineAdBanner;
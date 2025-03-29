import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function AnnouncementBar() {
  return (
    <div className="bg-blue-900 py-1 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">NEW</span>
          <p className="text-white text-sm">Best prices on games, prepaids & in-game items!</p>
        </div>
        <a href="#" className="text-white text-sm hover:text-blue-200 transition-colors duration-200 flex items-center group">
          Shop now!
          <FaArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

export default AnnouncementBar;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import GameBadge from './GameBadge';

function GameNewsCard({ news, variant = 'default', className = '' }) {
  if (!news) return null;
  
  if (variant === 'compact') {
    return (
      <Link to={`/blog/${news.id}`} className={`block ${className}`}>
        <div className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="text-white font-medium line-clamp-2">{news.title}</h3>
            <div className="flex items-center mt-1 text-xs text-gray-400">
              <FaCalendarAlt className="mr-1" />
              {news.date}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/blog/${news.id}`} className={`block ${className}`}>
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 z-10"></div>
        <img 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={news.image} 
          alt={news.title} 
        />
        
        <div className="relative z-20 p-5 h-full flex flex-col min-h-[280px]">
          <div className="flex items-center justify-between mb-2">
            <GameBadge text={news.category} color="purple" />
            <span className="text-xs text-gray-300 flex items-center">
              <FaCalendarAlt className="mr-1" />
              {news.date}
            </span>
          </div>
          
          <div className="mt-auto">
            {news.game && (
              <span className="inline-block bg-gray-700 bg-opacity-70 text-purple-300 text-xs font-medium px-2 py-1 rounded mb-2">
                {news.game}
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
              {news.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-80">{news.excerpt}</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 flex items-center">
              Read More 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameNewsCard;
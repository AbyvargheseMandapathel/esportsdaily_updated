import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import PlatformIcons from './PlatformIcons';
import GameStats from './GameStats';

function GameCard({ game, variant = 'default', className = '' }) {
  if (!game) return null;
  
  // Different card variants
  if (variant === 'compact') {
    return (
      <Link to={`/games/${game.id}`} className={`block ${className}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex items-center p-3">
          <img 
            src={game.logo} 
            alt={game.title} 
            className="w-12 h-12 object-cover rounded mr-3"
          />
          <div className="flex-1">
            <h3 className="text-white font-bold">{game.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">{game.genre}</span>
              <PlatformIcons platforms={game.platforms} className="text-gray-400 text-xs" />
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <Link to={`/games/${game.id}`} className={`block ${className}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex h-32">
          <div className="w-1/3 relative">
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900"></div>
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">{game.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <GameStats game={game} variant="compact" />
              <PlatformIcons platforms={game.platforms} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card variant
  return (
    <Link to={`/games/${game.id}`} className={`block ${className}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 flex items-center space-x-2">
            <img 
              src={game.logo} 
              alt={`${game.title} logo`} 
              className="w-10 h-10 rounded bg-gray-800 p-1"
            />
            <div className="flex space-x-2">
              <PlatformIcons platforms={game.platforms} />
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">{game.description}</p>
          
          <div className="mt-auto">
            <GameStats game={game} variant="grid" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
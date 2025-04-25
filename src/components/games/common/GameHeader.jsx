import React from 'react';
import PlatformIcons from './PlatformIcons';
import GameBadge from './GameBadge';

function GameHeader({ game, className = '' }) {
  if (!game) return null;
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${game.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg mb-4 md:mb-0 md:mr-6">
            <img 
              src={game.logo} 
              alt={game.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <GameBadge text={game.genre} color="purple" />
              {game.releaseYear && (
                <GameBadge text={`Released ${game.releaseYear}`} color="blue" />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
              <div className="flex items-center">
                <span className="mr-2">Platforms:</span>
                <PlatformIcons platforms={game.platforms} />
              </div>
              <div>
                <span className="mr-2">Developer:</span>
                {game.developer}
              </div>
              {game.playerCount && (
                <div>
                  <span className="mr-2">Players:</span>
                  {game.playerCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
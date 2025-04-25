import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers, FaDesktop, FaMobileAlt, FaPlaystation, FaXbox, FaGamepad } from 'react-icons/fa';

function GameCard({ game }) {
  // Function to render platform icons
  const renderPlatformIcons = (platforms) => {
    return platforms.map((platform, index) => {
      let icon;
      switch (platform.toLowerCase()) {
        case 'pc':
          icon = <FaDesktop key={index} title="PC" className="text-gray-300" />;
          break;
        case 'mobile':
          icon = <FaMobileAlt key={index} title="Mobile" className="text-gray-300" />;
          break;
        case 'playstation':
          icon = <FaPlaystation key={index} title="PlayStation" className="text-gray-300" />;
          break;
        case 'xbox':
          icon = <FaXbox key={index} title="Xbox" className="text-gray-300" />;
          break;
        default:
          icon = <FaGamepad key={index} title={platform} className="text-gray-300" />;
      }
      return icon;
    });
  };

  return (
    <Link to={`/games/${game.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 h-full flex flex-col">
        {/* Game Image */}
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
              className="w-10 h-10 rounded-md"
            />
            <h3 className="text-xl font-bold text-white">{game.title}</h3>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
              {game.genre}
            </span>
            <div className="flex space-x-2">
              {renderPlatformIcons(game.platforms)}
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{game.description}</p>
          
          <div className="mt-auto">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center text-sm text-gray-400">
                <FaTrophy className="mr-1 text-yellow-500" />
                <span>{game.tournaments} Tournaments</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <FaUsers className="mr-1 text-blue-500" />
                <span>{game.playerCount}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{game.developer}</span>
              <span className="text-sm text-gray-400">{game.releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
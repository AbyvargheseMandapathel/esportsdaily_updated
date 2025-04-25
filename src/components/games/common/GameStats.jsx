import React from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaCode, FaGamepad } from 'react-icons/fa';

function GameStats({ game, variant = 'default' }) {
  if (!game) return null;
  
  // Different layouts based on variant
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center text-sm text-gray-300 gap-x-4 gap-y-1">
        <div className="flex items-center">
          <FaGamepad className="mr-1 text-purple-400" />
          <span>{game.genre}</span>
        </div>
        <div className="flex items-center">
          <FaUsers className="mr-1 text-purple-400" />
          <span>{game.playerCount}</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1 text-purple-400" />
          <span>{game.releaseYear}</span>
        </div>
      </div>
    );
  }
  
  if (variant === 'grid') {
    return (
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
    );
  }
  
  // Default variant - full stats display
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <FaGamepad className="text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Genre</h3>
        </div>
        <p className="text-gray-300">{game.genre}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <FaCode className="text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Developer</h3>
        </div>
        <p className="text-gray-300">{game.developer}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Release Year</h3>
        </div>
        <p className="text-gray-300">{game.releaseYear}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <FaTrophy className="text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Prize Pool</h3>
        </div>
        <p className="text-gray-300">{game.prizePool}</p>
      </div>
    </div>
  );
}

export default GameStats;
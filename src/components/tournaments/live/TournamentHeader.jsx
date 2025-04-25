import React from 'react';
import { FaCircle } from 'react-icons/fa';

function TournamentHeader({ tournament }) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-black/50 z-10 rounded-lg"></div>
      <div 
        className="h-[200px] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${tournament.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 rounded-lg"></div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center">
          <img 
            src={tournament.logo} 
            alt={tournament.title} 
            className="w-16 h-16 object-cover rounded-lg mr-4 bg-gray-800 p-1"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{tournament.title}</h2>
            <div className="flex items-center mt-1">
              <span className="text-gray-300 mr-2">{tournament.game}</span>
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                <FaCircle className="text-white mr-1 animate-pulse" size={8} />
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentHeader;
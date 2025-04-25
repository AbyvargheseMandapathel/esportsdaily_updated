import React from 'react';
import { FaCircle } from 'react-icons/fa';

function TournamentSelector({ tournaments, selectedTournament, onSelectTournament }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {tournaments.map(tournament => (
        <div 
          key={tournament.id}
          onClick={() => onSelectTournament(tournament)}
          className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
            selectedTournament?.id === tournament.id ? 'border-2 border-purple-500' : ''
          }`}
        >
          <div className="flex items-center">
            <img 
              src={tournament.logo} 
              alt={tournament.title} 
              className="w-12 h-12 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-white font-bold">{tournament.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-400 mr-2">{tournament.game}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                  <FaCircle className="text-white mr-1 animate-pulse" size={8} />
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TournamentSelector;
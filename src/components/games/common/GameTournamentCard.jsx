import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTrophy, FaMapMarkerAlt } from 'react-icons/fa';
import GameBadge from './GameBadge';

function GameTournamentCard({ tournament, className = '' }) {
  if (!tournament) return null;
  
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'live': return 'red';
      case 'upcoming': return 'green';
      case 'completed': return 'gray';
      default: return 'blue';
    }
  };
  
  return (
    <Link to={`/tournaments/${tournament.id}`} className={`block ${className}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute top-3 right-3">
            <GameBadge 
              text={tournament.status} 
              color={getStatusColor(tournament.status)} 
            />
          </div>
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <img 
              src={tournament.logo} 
              alt={`${tournament.title} logo`} 
              className="w-10 h-10 rounded bg-gray-800 p-1"
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2">{tournament.title}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-300">
              <FaCalendarAlt className="mr-2 text-purple-400" />
              {tournament.startDate} - {tournament.endDate}
            </div>
            
            {tournament.location && (
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="mr-2 text-purple-400" />
                {tournament.location}
              </div>
            )}
            
            {tournament.prizePool && (
              <div className="flex items-center text-gray-300">
                <FaTrophy className="mr-2 text-purple-400" />
                Prize Pool: {tournament.prizePool}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameTournamentCard;
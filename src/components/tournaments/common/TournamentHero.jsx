import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaUsers } from 'react-icons/fa';

function TournamentHero({ tournament }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${tournament.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg mb-4 md:mb-0 md:mr-6">
            <img 
              src={tournament.logo} 
              alt={tournament.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {tournament.game}
              </span>
              <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                tournament.status === 'Live' ? 'bg-red-600' : 
                tournament.status === 'Upcoming' ? 'bg-green-600' : 
                tournament.status === 'Completed' ? 'bg-gray-600' : 'bg-blue-600'
              }`}>
                {tournament.status}
              </span>
              {tournament.registrationOpen && (
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Registration Open
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{tournament.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{tournament.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-400" />
                <span>{tournament.startDate} - {tournament.endDate}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-purple-400" />
                <span>{tournament.location}</span>
              </div>
              <div className="flex items-center">
                <FaTrophy className="mr-2 text-purple-400" />
                <span>{tournament.prizePool}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-2 text-purple-400" />
                <span>{tournament.teams} Teams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentHero;
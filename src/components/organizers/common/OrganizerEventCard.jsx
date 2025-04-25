import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaCalendarAlt, FaTrophy, FaUsers } from 'react-icons/fa';

function OrganizerEventCard({ event, isPast = false }) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute top-3 right-3">
          <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
            event.type === 'tournament' ? 'bg-purple-600' : 'bg-indigo-600'
          }`}>
            {event.type === 'tournament' ? 'Tournament' : 'Scrim'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
            isPast ? 'bg-gray-600' : 'bg-green-600'
          }`}>
            {isPast ? 'Completed' : event.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
        <div className="flex flex-wrap gap-y-2 text-sm text-gray-300 mb-3">
          <div className="w-full flex items-center">
            <FaGamepad className="mr-2 text-purple-400" />
            <span>{event.game}</span>
          </div>
          <div className="w-full flex items-center">
            <FaCalendarAlt className="mr-2 text-purple-400" />
            <span>{event.startDate} - {event.endDate}</span>
          </div>
          <div className="w-full flex items-center">
            <FaTrophy className="mr-2 text-purple-400" />
            <span>Prize Pool: {event.prizePool}</span>
          </div>
          {isPast && event.winner && (
            <div className="w-full flex items-center">
              <FaUsers className="mr-2 text-purple-400" />
              <span>Winner: {event.winner}</span>
            </div>
          )}
        </div>
        <Link 
          to={event.type === 'tournament' ? `/tournaments/${event.id}` : `/scrims/${event.id}`}
          className={`block w-full text-center ${
            isPast 
              ? 'bg-gray-600 hover:bg-gray-500' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white font-medium py-2 px-4 rounded-md transition-colors`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default OrganizerEventCard;
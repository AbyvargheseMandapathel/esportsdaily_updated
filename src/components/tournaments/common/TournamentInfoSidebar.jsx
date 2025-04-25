import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaUsers, FaGamepad, FaBuilding } from 'react-icons/fa';

function TournamentInfoSidebar({ tournament }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Tournament Info</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <FaCalendarAlt className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Dates</p>
            <p className="text-white">{tournament.startDate} - {tournament.endDate}</p>
          </div>
        </li>
        <li className="flex items-start">
          <FaMapMarkerAlt className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white">{tournament.venue}</p>
            <p className="text-white">{tournament.location}</p>
          </div>
        </li>
        <li className="flex items-start">
          <FaTrophy className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Prize Pool</p>
            <p className="text-white">{tournament.prizePool}</p>
          </div>
        </li>
        <li className="flex items-start">
          <FaUsers className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Teams</p>
            <p className="text-white">{tournament.teams} Teams</p>
          </div>
        </li>
        <li className="flex items-start">
          <FaGamepad className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Game</p>
            <p className="text-white">{tournament.game}</p>
          </div>
        </li>
        <li className="flex items-start">
          <FaBuilding className="text-purple-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Organizer</p>
            <p className="text-white">{tournament.organizer}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TournamentInfoSidebar;
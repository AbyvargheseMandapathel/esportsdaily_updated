import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaClock, FaGamepad, FaBuilding } from 'react-icons/fa';

function ScrimInfoSidebar({ scrim, onRegisterClick }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg sticky top-24">
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Scrim Details</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaCalendarAlt className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date</p>
              <p className="text-white">{scrim.startDate} {scrim.startDate !== scrim.endDate && `- ${scrim.endDate}`}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaClock className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time</p>
              <p className="text-white">{scrim.time}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaGamepad className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Game</p>
              <p className="text-white">{scrim.game}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaUsers className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Slots</p>
              <p className="text-white">{scrim.slotsRemaining} of {scrim.slots} available</p>
            </div>
          </div>
          
          {scrim.prizePool !== "None" && (
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-full mr-3">
                <FaMoneyBillWave className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Prize Pool</p>
                <p className="text-white">{scrim.prizePool}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaMapMarkerAlt className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white">{scrim.location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <FaBuilding className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Organizer</p>
              <Link 
                to={`/organizers/${scrim.organizer.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {scrim.organizer}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={onRegisterClick}
            disabled={scrim.status !== "Registration Open"}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              scrim.status === "Registration Open"
                ? 'bg-purple-600 text-white hover:bg-purple-700 transition-colors'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {scrim.status === "Registration Open" ? "Register Team" : "Registration Closed"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScrimInfoSidebar;
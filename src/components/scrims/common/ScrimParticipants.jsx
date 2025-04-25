import React from 'react';
import { FaUsers } from 'react-icons/fa';

function ScrimParticipants({ scrim }) {
  if (!scrim || !scrim.participants) return null;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <FaUsers className="text-purple-400 mr-2 text-xl" />
        <h2 className="text-xl font-bold text-white">Participants</h2>
      </div>
      
      <p className="text-gray-300 mb-4">
        {scrim.participants.length} of {scrim.slots} slots filled
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {scrim.participants.map((team, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center">
            <img 
              src={team.logo} 
              alt={team.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-white font-medium">{team.name}</p>
              <span className={`text-xs ${
                team.status === 'confirmed' ? 'text-green-400' : 
                team.status === 'pending' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {team.status === 'confirmed' ? 'Confirmed' : 
                 team.status === 'pending' ? 'Pending' : team.status}
              </span>
            </div>
          </div>
        ))}
        
        {/* Empty slots */}
        {Array.from({ length: scrim.slots - scrim.participants.length }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-gray-700 rounded-lg p-4 flex items-center border border-dashed border-gray-600">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
              <FaUsers className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-400 font-medium">Open Slot</p>
              <span className="text-xs text-gray-500">Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrimParticipants;
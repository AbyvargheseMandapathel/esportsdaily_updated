import React from 'react';

function OrganizerAbout({ organizer }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">About {organizer.name}</h2>
      <div className="text-gray-300 mb-6 whitespace-pre-line">
        {organizer.longDescription}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-3">Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{organizer.stats.tournamentsHosted}</div>
          <div className="text-sm text-gray-400">Tournaments</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{organizer.stats.scrimsHosted}</div>
          <div className="text-sm text-gray-400">Scrims</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{organizer.stats.totalPrizePool}</div>
          <div className="text-sm text-gray-400">Prize Pool</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{organizer.stats.totalParticipants}</div>
          <div className="text-sm text-gray-400">Participants</div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerAbout;
import React from 'react';
import { FaGamepad, FaBuilding, FaTrophy, FaMapMarkerAlt, FaExternalLinkAlt, FaTwitter, FaTwitch, FaYoutube } from 'react-icons/fa';

function TournamentAbout({ tournament }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">About the Tournament</h2>
      <p className="text-gray-300 mb-4">{tournament.longDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaGamepad className="text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Game</h3>
          </div>
          <p className="text-gray-300">{tournament.game}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaBuilding className="text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Organizer</h3>
          </div>
          <p className="text-gray-300">{tournament.organizer}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaTrophy className="text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Prize Pool</h3>
          </div>
          <p className="text-gray-300">{tournament.prizePool}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-purple-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Venue</h3>
          </div>
          <p className="text-gray-300">{tournament.venue}, {tournament.location}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {tournament.socialLinks && Object.entries(tournament.socialLinks).map(([key, url]) => (
          <a 
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
          >
            {key === 'website' && <FaExternalLinkAlt className="mr-2" />}
            {key === 'twitter' && <FaTwitter className="mr-2" />}
            {key === 'twitch' && <FaTwitch className="mr-2" />}
            {key === 'youtube' && <FaYoutube className="mr-2" />}
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
}

export default TournamentAbout;
import React from 'react';
import { FaExternalLinkAlt, FaTwitter, FaTwitch, FaYoutube } from 'react-icons/fa';

function TournamentSocialLinks({ socialLinks }) {
  if (!socialLinks) return null;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Follow Tournament</h3>
      <div className="flex flex-wrap gap-3">
        {socialLinks.website && (
          <a 
            href={socialLinks.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-gray-700 hover:bg-gray-600 transition-colors duration-200 rounded-lg px-4 py-2 text-white"
          >
            <FaExternalLinkAlt className="mr-2" />
            Website
          </a>
        )}
        {socialLinks.twitter && (
          <a 
            href={socialLinks.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg px-4 py-2 text-white"
          >
            <FaTwitter className="mr-2" />
            Twitter
          </a>
        )}
        {socialLinks.twitch && (
          <a 
            href={socialLinks.twitch} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-purple-700 hover:bg-purple-800 transition-colors duration-200 rounded-lg px-4 py-2 text-white"
          >
            <FaTwitch className="mr-2" />
            Twitch
          </a>
        )}
        {socialLinks.youtube && (
          <a 
            href={socialLinks.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-lg px-4 py-2 text-white"
          >
            <FaYoutube className="mr-2" />
            YouTube
          </a>
        )}
      </div>
    </div>
  );
}

export default TournamentSocialLinks;
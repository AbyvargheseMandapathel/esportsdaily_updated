import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaEnvelope, FaTwitter, FaDiscord } from 'react-icons/fa';

function OrganizerContactSidebar({ organizer }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg sticky top-24">
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
        
        <div className="space-y-4 mb-6">
          {organizer.website && (
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-full mr-3">
                <FaGlobe className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Website</p>
                <a 
                  href={organizer.website.startsWith('http') ? organizer.website : `https://${organizer.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {organizer.website}
                </a>
              </div>
            </div>
          )}
          
          {organizer.email && (
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-full mr-3">
                <FaEnvelope className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a 
                  href={`mailto:${organizer.email}`}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {organizer.email}
                </a>
              </div>
            </div>
          )}
          
          {organizer.twitter && (
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-full mr-3">
                <FaTwitter className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Twitter</p>
                <a 
                  href={`https://twitter.com/${organizer.twitter}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  @{organizer.twitter}
                </a>
              </div>
            </div>
          )}
          
          {organizer.discord && (
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-full mr-3">
                <FaDiscord className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Discord</p>
                <a 
                  href={`https://${organizer.discord}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {organizer.discord}
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <Link
            to="/contact"
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Contact Organizer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrganizerContactSidebar;
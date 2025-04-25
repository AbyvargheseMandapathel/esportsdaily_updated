import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

function OrganizerHero({ organizer }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[300px] md:h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${organizer.coverImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg mb-4 md:mb-0 md:mr-6">
            <img 
              src={organizer.logo} 
              alt={organizer.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{organizer.name}</h1>
            <p className="text-gray-300 mb-4 max-w-3xl">{organizer.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-purple-400" />
                <span>{organizer.location}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-400" />
                <span>Founded in {organizer.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerHero;
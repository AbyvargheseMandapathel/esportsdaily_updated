import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaClock, FaShieldAlt } from 'react-icons/fa';

function ScrimHero({ scrim }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${scrim.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {scrim.game}
              </span>
              <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                scrim.entryFee === 'Free' ? 'bg-green-600' : 'bg-yellow-600'
              }`}>
                {scrim.entryFee}
              </span>
              <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                scrim.status === 'Registration Open' ? 'bg-green-600' : 
                scrim.status === 'Starting Soon' ? 'bg-yellow-600' : 
                scrim.status === 'In Progress' ? 'bg-red-600' : 'bg-gray-600'
              }`}>
                {scrim.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{scrim.title}</h1>
            <p className="text-gray-300 text-lg mb-4 max-w-3xl">{scrim.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <FaCalendarAlt className="text-purple-400 mr-2" />
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white">{scrim.startDate} {scrim.startDate !== scrim.endDate && `- ${scrim.endDate}`}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-purple-400 mr-2" />
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white">{scrim.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-purple-400 mr-2" />
                <div>
                  <p className="text-gray-400 text-sm">Slots</p>
                  <p className="text-white">{scrim.slotsRemaining} of {scrim.slots} available</p>
                </div>
              </div>
              {scrim.prizePool !== "None" && (
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-purple-400 mr-2" />
                  <div>
                    <p className="text-gray-400 text-sm">Prize Pool</p>
                    <p className="text-white">{scrim.prizePool}</p>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to={`/scrims/${scrim.id}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrimHero;
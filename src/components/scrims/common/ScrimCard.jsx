import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa';

function ScrimCard({ scrim, variant = 'default' }) {
  if (!scrim) return null;
  
  const isCompact = variant === 'compact';
  
  // Determine entry fee badge color
  const getEntryFeeColor = () => {
    if (scrim.entryFee === "Free") return "bg-green-600";
    return "bg-yellow-600";
  };
  
  // Determine status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Registration Open': return 'bg-green-600';
      case 'Starting Soon': return 'bg-yellow-600';
      case 'In Progress': return 'bg-red-600';
      case 'Completed': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };
  
  return (
    <Link to={`/scrims/${scrim.id}`} className="block h-full">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-transform duration-300 hover:transform hover:scale-105 flex flex-col">
        <div className="relative">
          <img 
            src={scrim.image} 
            alt={scrim.title} 
            className={`w-full object-cover ${isCompact ? 'h-40' : 'h-48'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          
          {/* Game and Status Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {scrim.game}
            </span>
            <span className={`${getEntryFeeColor()} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {scrim.entryFee}
            </span>
          </div>
          
          <div className="absolute top-2 right-2">
            <span className={`${getStatusColor(scrim.status)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {scrim.status}
            </span>
          </div>
          
          {/* Slots Remaining */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
            {scrim.slotsRemaining}/{scrim.slots} slots
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{scrim.title}</h3>
          
          {!isCompact && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{scrim.description}</p>
          )}
          
          <div className="mt-auto space-y-2">
            <div className="flex items-center text-sm">
              <FaCalendarAlt className="text-purple-400 mr-2" />
              <span className="text-gray-300">{scrim.startDate}</span>
              {scrim.startDate !== scrim.endDate && (
                <span className="text-gray-300"> - {scrim.endDate}</span>
              )}
            </div>
            
            <div className="flex items-center text-sm">
              <FaClock className="text-purple-400 mr-2" />
              <span className="text-gray-300">{scrim.time}</span>
            </div>
            
            {!isCompact && (
              <div className="flex items-center text-sm">
                <FaMapMarkerAlt className="text-purple-400 mr-2" />
                <span className="text-gray-300">{scrim.location}</span>
              </div>
            )}
            
            {scrim.prizePool !== "None" && (
              <div className="flex items-center text-sm">
                <FaMoneyBillWave className="text-purple-400 mr-2" />
                <span className="text-gray-300">Prize: {scrim.prizePool}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ScrimCard;
import React from 'react';
import { FaTrophy, FaUser, FaBuilding, FaGamepad, FaShieldAlt } from 'react-icons/fa';

function RecentActivityCard({ activity }) {
  // Define icon based on activity type
  const getIcon = () => {
    switch (activity.type) {
      case 'tournament':
        return <FaTrophy />;
      case 'user':
        return <FaUser />;
      case 'organizer':
        return <FaBuilding />;
      case 'game':
        return <FaGamepad />;
      case 'scrim':
        return <FaShieldAlt />;
      default:
        return <FaUser />;
    }
  };

  // Define color based on activity type
  const getColorClass = () => {
    switch (activity.type) {
      case 'tournament':
        return 'bg-purple-600';
      case 'user':
        return 'bg-blue-600';
      case 'organizer':
        return 'bg-orange-600';
      case 'game':
        return 'bg-green-600';
      case 'scrim':
        return 'bg-indigo-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
      <div className={`p-2 rounded-full ${getColorClass()} text-white`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-white">
          <span className="font-medium">{activity.title}</span> was {activity.action}
        </p>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>{activity.time}</span>
          <span>by {activity.user}</span>
        </div>
      </div>
    </div>
  );
}

export default RecentActivityCard;
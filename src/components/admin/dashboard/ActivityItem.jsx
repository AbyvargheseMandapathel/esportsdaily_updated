import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function ActivityItem({ activity }) {
  return (
    <div className="flex items-start border-b border-gray-700 pb-4">
      <div className="bg-purple-500/10 p-2 rounded-lg mr-4">
        <FaCalendarAlt className="text-purple-400" />
      </div>
      <div>
        <p className="text-white font-medium">{activity.action}</p>
        <p className="text-gray-400 text-sm">{activity.subject}</p>
        <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
}

export default ActivityItem;
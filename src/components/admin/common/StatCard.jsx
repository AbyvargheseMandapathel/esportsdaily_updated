import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function StatCard({ title, value, icon, change, trend, color }) {
  // Define color classes based on the color prop
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-600/20',
          iconBg: 'bg-blue-600',
          text: 'text-blue-400'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600/20',
          iconBg: 'bg-purple-600',
          text: 'text-purple-400'
        };
      case 'green':
        return {
          bg: 'bg-green-600/20',
          iconBg: 'bg-green-600',
          text: 'text-green-400'
        };
      case 'orange':
        return {
          bg: 'bg-orange-600/20',
          iconBg: 'bg-orange-600',
          text: 'text-orange-400'
        };
      default:
        return {
          bg: 'bg-gray-600/20',
          iconBg: 'bg-gray-600',
          text: 'text-gray-400'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
          <div className={`p-2 rounded-full ${colorClasses.iconBg} text-white`}>
            {icon}
          </div>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default StatCard;
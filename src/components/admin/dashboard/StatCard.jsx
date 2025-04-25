import React from 'react';

function StatCard({ stat }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
          <span className={`text-${stat.color}-400 text-xl`}>{stat.icon}</span>
        </div>
        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {stat.change}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
      <p className="text-white text-2xl font-bold">{stat.value}</p>
    </div>
  );
}

export default StatCard;
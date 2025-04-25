import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

function UserGrowthChart() {
  const [timeRange, setTimeRange] = useState('7days');

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">User Growth</h3>
        <select 
          className="bg-gray-700 text-gray-300 rounded-lg px-3 py-1 text-sm border border-gray-600"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>
      <div className="h-64 flex items-center justify-center">
        <FaChartLine className="text-6xl text-gray-600" />
        <p className="ml-4 text-gray-400">Chart visualization will appear here</p>
      </div>
    </div>
  );
}

export default UserGrowthChart;
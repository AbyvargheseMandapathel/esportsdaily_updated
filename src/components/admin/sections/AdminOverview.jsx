import React from 'react';
import { FaUsers, FaTrophy, FaGamepad, FaBuilding, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import StatCard from '../common/StatCard';
import RecentActivityCard from '../common/RecentActivityCard';
import LineChart from '../common/LineChart';

function AdminOverview() {
  // Mock data for stats
  const stats = [
    { 
      title: 'Total Users', 
      value: '12,345', 
      icon: <FaUsers />, 
      change: '+12%', 
      trend: 'up',
      color: 'blue' 
    },
    { 
      title: 'Active Tournaments', 
      value: '24', 
      icon: <FaTrophy />, 
      change: '+5%', 
      trend: 'up',
      color: 'purple' 
    },
    { 
      title: 'Games', 
      value: '48', 
      icon: <FaGamepad />, 
      change: '-2%', 
      trend: 'down',
      color: 'green' 
    },
    { 
      title: 'Organizers', 
      value: '86', 
      icon: <FaBuilding />, 
      change: '+8%', 
      trend: 'up',
      color: 'orange' 
    },
  ];

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      type: 'tournament',
      title: 'BGMI Pro League Season 3',
      action: 'created',
      time: '10 minutes ago',
      user: 'admin@esportsdaily.com'
    },
    {
      id: 2,
      type: 'user',
      title: 'John Doe',
      action: 'registered',
      time: '1 hour ago',
      user: 'system'
    },
    {
      id: 3,
      type: 'organizer',
      title: 'ESL Gaming',
      action: 'updated',
      time: '3 hours ago',
      user: 'admin@esportsdaily.com'
    },
    {
      id: 4,
      type: 'game',
      title: 'Valorant',
      action: 'added',
      time: 'Yesterday',
      user: 'admin@esportsdaily.com'
    },
    {
      id: 5,
      type: 'scrim',
      title: 'Daily BGMI Scrims',
      action: 'completed',
      time: 'Yesterday',
      user: 'system'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <LineChart />
        </div>
        
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <RecentActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <FaTrophy className="mr-2" />
            Create Tournament
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <FaGamepad className="mr-2" />
            Add Game
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <FaBuilding className="mr-2" />
            Add Organizer
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <FaUsers className="mr-2" />
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
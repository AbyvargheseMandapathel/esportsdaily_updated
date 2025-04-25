import React from 'react';
import { FaUsers, FaTrophy, FaGamepad, FaBuilding } from 'react-icons/fa';
import StatCard from './StatCard';

function StatCards() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}

export default StatCards;
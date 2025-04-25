import React from 'react';
import { Link } from 'react-router-dom';
import QuickActionCard from './QuickActionCard';

function QuickActionCards() {
  const actions = [
    {
      title: "Create Tournament",
      description: "Set up a new tournament with custom rules and brackets",
      buttonText: "Get Started",
      buttonLink: `${window.location.origin}/dashboard/admin/tournaments/create`,
      gradient: "from-purple-900/40 to-indigo-900/40",
      border: "border-purple-500/20 hover:border-purple-500/40",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Manage Users",
      description: "Review and manage user accounts and permissions",
      buttonText: "View Users",
      buttonLink: `${window.location.origin}/dashboard/admin/users`,
      gradient: "from-blue-900/40 to-cyan-900/40",
      border: "border-blue-500/20 hover:border-blue-500/40",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Platform Analytics",
      description: "View detailed analytics about platform usage",
      buttonText: "View Analytics",
      buttonLink: "/dashboard/admin/analytics",
      gradient: "from-green-900/40 to-emerald-900/40",
      border: "border-green-500/20 hover:border-green-500/40",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <QuickActionCard key={index} action={action} />
      ))}
    </div>
  );
}

export default QuickActionCards;
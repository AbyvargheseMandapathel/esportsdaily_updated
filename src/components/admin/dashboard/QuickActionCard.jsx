import React from 'react';
import { Link } from 'react-router-dom';

function QuickActionCard({ action }) {
  return (
    <div className={`bg-gradient-to-br ${action.gradient} rounded-xl p-6 shadow-lg border ${action.border} transition-all duration-300`}>
      <h3 className="text-lg font-medium text-white mb-2">{action.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{action.description}</p>
      <Link 
        to={action.buttonLink}
        className={`${action.buttonColor} text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200 inline-block`}
      >
        {action.buttonText}
      </Link>
    </div>
  );
}

export default QuickActionCard;
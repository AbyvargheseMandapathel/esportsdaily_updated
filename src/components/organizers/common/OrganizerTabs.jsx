import React from 'react';
import { FaInfoCircle, FaCalendarAlt, FaHistory } from 'react-icons/fa';

function OrganizerTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'about', label: 'About', icon: <FaInfoCircle /> },
    { id: 'upcoming', label: 'Upcoming Events', icon: <FaCalendarAlt /> },
    { id: 'past', label: 'Past Events', icon: <FaHistory /> }
  ];

  return (
    <div className="flex flex-wrap border-b border-gray-700 bg-gray-800 rounded-t-lg overflow-hidden">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.id 
              ? 'text-white bg-gray-700 border-b-2 border-purple-500' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.id === 'upcoming' ? 'Upcoming' : tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default OrganizerTabs;
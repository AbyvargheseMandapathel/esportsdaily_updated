import React, { useState } from 'react';
import { FaSave, FaCog, FaBell, FaShieldAlt, FaDatabase, FaEnvelope } from 'react-icons/fa';

function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
    { id: 'email', label: 'Email', icon: <FaEnvelope /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex border-b border-gray-700">
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
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    defaultValue="ESports Daily"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Site Description
                  </label>
                  <textarea
                    defaultValue="The ultimate platform for esports tournaments and scrims in India"
                    rows={3}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Maintenance Mode
                  </label>
                  <div className="flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="maintenance"
                        value="off"
                        defaultChecked
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4 bg-gray-700 border-gray-600"
                      />
                      <span className="ml-2 text-white">Off</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="maintenance"
                        value="on"
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4 bg-gray-700 border-gray-600"
                      />
                      <span className="ml-2 text-white">On</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Default Language
                  </label>
                  <select className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              <p className="text-gray-400 mb-4">Configure how notifications are sent and displayed.</p>
              
              {/* Notification settings content would go here */}
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-300">Notification settings content</p>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
              <p className="text-gray-400 mb-4">Configure security options for your platform.</p>
              
              {/* Security settings content would go here */}
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-300">Security settings content</p>
              </div>
            </div>
          )}
          
          {activeTab === 'database' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Database Settings</h2>
              <p className="text-gray-400 mb-4">Manage database connections and backups.</p>
              
              {/* Database settings content would go here */}
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-300">Database settings content</p>
              </div>
            </div>
          )}
          
          {activeTab === 'email' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
              <p className="text-gray-400 mb-4">Configure email server settings and templates.</p>
              
              {/* Email settings content would go here */}
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-300">Email settings content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
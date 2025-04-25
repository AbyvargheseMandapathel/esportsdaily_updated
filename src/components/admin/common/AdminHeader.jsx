import React, { useState } from 'react';
import { FaBell, FaSearch, FaUser, FaCog } from 'react-icons/fa';

function AdminHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 relative"
            >
              <FaBell />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-white font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <p className="text-sm text-white">New tournament registration</p>
                    <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                  <div className="p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <p className="text-sm text-white">User reported an issue</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-700 transition-colors duration-200">
                    <p className="text-sm text-white">System update completed</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-700 text-center">
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                <FaUser className="text-white" />
              </div>
              <span className="hidden md:inline-block">Admin User</span>
            </button>
            
            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-white font-medium">Admin User</p>
                  <p className="text-xs text-gray-400">admin@esportsdaily.com</p>
                </div>
                <div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 flex items-center">
                    <FaUser className="mr-2" />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 flex items-center">
                    <FaCog className="mr-2" />
                    Settings
                  </button>
                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTrophy, 
  FaGamepad, 
  FaUsers, 
  FaBuilding, 
  FaCog, 
  FaSignOutAlt,
  FaShieldAlt,
  FaChevronRight,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Logo from '../../Logo';

function AdminSidebar({ activeSection, setActiveSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <FaHome />, path: '/dashboard/admin' },
    { id: 'tournaments', label: 'Tournaments', icon: <FaTrophy />, path: '/dashboard/admin/tournaments' },
    { id: 'scrims', label: 'Scrims', icon: <FaShieldAlt />, path: '/dashboard/admin/scrims' },
    { id: 'organizers', label: 'Organizers', icon: <FaBuilding />, path: '/dashboard/admin/organizers' },
    { id: 'users', label: 'Users', icon: <FaUsers />, path: '/dashboard/admin/users' },
    { id: 'games', label: 'Games', icon: <FaGamepad />, path: '/dashboard/admin/games' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/dashboard/admin/settings' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Fixed at top */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg shadow-lg"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          ${collapsed ? 'w-20' : 'w-64'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed z-40
          transition-all duration-300 ease-in-out md:relative
        `}
      >
        {/* Toggle Button - Desktop Only */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-full shadow-lg z-10 hidden md:block"
        >
          {collapsed ? <FaChevronRight size={14} /> : <FaBars size={14} />}
        </button>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/dashboard/admin" className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
            <Logo className="h-7 w-7 text-purple-500" />
            {!collapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Admin Console
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={() => setActiveSection(item.id)}
                  className={({ isActive }) => `
                    w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-purple-500/10 border border-purple-500/30 shadow-purple-glow' 
                      : 'hover:bg-gray-800/50 hover:border-gray-700'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className={`font-medium ${isActive ? 'text-purple-200' : 'text-gray-300'}`}>
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!collapsed && isActive && (
                        <FaChevronRight className="text-purple-400 text-sm mr-1" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/login"
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300 group`}
            onClick={() => console.log('Logout')}
          >
            <FaSignOutAlt className="text-red-400 group-hover:text-red-300 text-lg" />
            {!collapsed && (
              <span className="text-gray-300 group-hover:text-red-300 font-medium">Logout</span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
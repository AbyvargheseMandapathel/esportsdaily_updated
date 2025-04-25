import { useState, useEffect } from 'react';
import { FaHome, FaNewspaper,FaShieldAlt  , FaTrophy, FaCircle, FaGamepad, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

// Import the separated components
import Logo from './Logo';
import SignInButton from './SignInButton';
import MobileMenuItems from './MobileMenuItems';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "News", icon: <FaNewspaper />, path: "/news" },
    { name: "Tournaments", icon: <FaTrophy />, path: "/tournaments" },
    { name: "Live", icon: <FaCircle className="text-red-500 animate-pulse" />, path: "/live" },
    { name: "Games", icon: <FaGamepad />, path: "/games" },
    { name: "Scrims", icon: <FaShieldAlt   />, path: "/scrims" }
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-gray-800 ${
                    location.pathname === item.path 
                      ? 'text-purple-400 bg-gray-800/50' 
                      : 'text-gray-300 hover:text-purple-300'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Sign in button and mobile menu toggle */}
          <div className="flex items-center">
            {/* Desktop sign in buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignInButton isMobile="signup" />
              <SignInButton />
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu backdrop */}
      <div 
        onClick={toggleMenu}
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>
      
      {/* Mobile menu panel */}
      <div 
        className={`md:hidden fixed top-0 right-0 w-4/5 max-w-xs h-full bg-gray-900 shadow-2xl z-50 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Logo />
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          {/* Mobile menu items */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <MobileMenuItems 
              navItems={navItems} 
              isMenuOpen={isMenuOpen} 
              location={location} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const SignInButton = ({ isMobile = false, toggleMenu, isMenuOpen, buttonStyle }) => {
  // For mobile version, we'll return the entire menu toggle section
  if (isMobile === 'toggle') {
    return (
      <div className="flex items-center">
        {/* Desktop sign in button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signup"
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-900/30 px-5 py-2 text-sm"
          >
            <FaUserPlus className="mr-2" />
            Sign Up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black hover:bg-gray-800 text-white rounded-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/30 px-5 py-2 text-sm"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </Link>
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
    );
  }
  
  // Sign Up button
  if (isMobile === 'signup') {
    return (
      <Link
        to="/signup"
        className={`flex items-center justify-center ${
          buttonStyle === 'black' 
            ? 'bg-black hover:bg-gray-800 text-white hover:shadow-gray-900/30' 
            : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-900/30'
        } rounded-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${
          isMobile === true
            ? 'w-full px-6 py-3 text-lg' 
            : 'px-5 py-2 text-sm'
        }`}
      >
        <FaUserPlus className="mr-2" />
        Sign Up
      </Link>
    );
  }
  
  // Sign In button
  return (
    <Link
      to="/login"
      className={`flex items-center justify-center ${
        buttonStyle === 'purple' 
          ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-900/30' 
          : 'bg-black hover:bg-gray-800 text-white hover:shadow-gray-900/30'
      } rounded-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        isMobile === true
          ? 'w-full px-6 py-3 text-lg' 
          : 'px-5 py-2 text-sm'
      }`}
    >
      <FaSignInAlt className="mr-2" />
      Sign In
    </Link>
  );
};

export default SignInButton;
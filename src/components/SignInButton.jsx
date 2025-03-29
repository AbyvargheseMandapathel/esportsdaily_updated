import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const SignInButton = ({ isMobile = false, toggleMenu, isMenuOpen, buttonStyle }) => {
  // For mobile version, we'll return the entire menu toggle section
  if (isMobile === 'toggle') {
    return (
      <div className="flex items-center">
        {/* Desktop sign in button */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            to="/signup"
            className="flex items-center justify-center bg-white hover:bg-gray-100 text-black rounded-full font-medium transition-all duration-200 px-5 py-2 text-sm"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center bg-gray-900 hover:bg-black text-white rounded-full font-medium transition-all duration-200 px-5 py-2 text-sm"
          >
            Log in
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
            ? 'bg-gray-900 hover:bg-black text-white' 
            : 'bg-white hover:bg-gray-100 text-black'
        } rounded-full font-medium transition-all duration-200 ${
          isMobile === true
            ? 'w-full px-6 py-3 text-lg' 
            : 'px-5 py-2 text-sm'
        }`}
      >
        {buttonStyle === 'black' ? 'Log in' : 'Sign up'}
      </Link>
    );
  }
  
  // Sign In button
  return (
    <Link
      to="/login"
      className={`flex items-center justify-center ${
        buttonStyle === 'white' 
          ? 'bg-white hover:bg-gray-100 text-black' 
          : 'bg-gray-900 hover:bg-black text-white'
      } rounded-full font-medium transition-all duration-200 ${
        isMobile === true
          ? 'w-full px-6 py-3 text-lg' 
          : 'px-5 py-2 text-sm'
      }`}
    >
      {buttonStyle === 'white' ? 'Sign up' : 'Log in'}
    </Link>
  );
};

export default SignInButton;
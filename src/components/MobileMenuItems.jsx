import React from 'react';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';

const MobileMenuItems = ({ navItems, isMenuOpen, location }) => (
  <div className="space-y-6">
    {navItems.map((item, index) => (
      <Link
        key={item.name} 
        to={item.path}
        className={`flex items-center text-lg font-medium py-2 px-3 rounded-md transform transition-all duration-300 ${
          location.pathname === item.path 
            ? 'text-purple-400 bg-gray-800/50' 
            : 'text-gray-300 hover:text-purple-300 hover:bg-gray-800'
        } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
        style={{ transitionDelay: `${index * 75}ms` }}
      >
        <span className="text-xl mr-3">{item.icon}</span>
        {item.name}
      </Link>
    ))}
    
    <div 
      className={`mt-8 transform transition-all duration-300 ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`} 
      style={{ transitionDelay: `${navItems.length * 75}ms` }}
    >
      <div className="space-y-3">
        <SignInButton isMobile={true} buttonStyle="black" />
        <SignInButton isMobile="signup" buttonStyle="black" />
      </div>
    </div>
  </div>
);

export default MobileMenuItems;
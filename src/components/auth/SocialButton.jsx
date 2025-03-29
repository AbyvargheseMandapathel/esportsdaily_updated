import React from 'react';

function SocialButton({ icon, provider }) {
  return (
    <button
      type="button"
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
    >
      {icon}
      <span className="sr-only">Sign in with {provider}</span>
    </button>
  );
}

export default SocialButton;
import React from 'react';
import { FaUsers } from 'react-icons/fa';

function ScrimRegistrationCTA({ scrim, onRegisterClick }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-white mb-1">Join This Scrim</h3>
          <p className="text-gray-400">
            {scrim.slotsRemaining} of {scrim.slots} slots remaining
          </p>
        </div>
        <button
          onClick={onRegisterClick}
          disabled={scrim.status !== "Registration Open"}
          className={`flex items-center justify-center px-6 py-3 rounded-md font-medium ${
            scrim.status === "Registration Open"
              ? 'bg-purple-600 text-white hover:bg-purple-700 transition-colors'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FaUsers className="mr-2" />
          {scrim.status === "Registration Open" ? "Register Team" : "Registration Closed"}
        </button>
      </div>
    </div>
  );
}

export default ScrimRegistrationCTA;
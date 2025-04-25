import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function TournamentRegistrationBanner({ tournament, onRegisterClick }) {
  if (!tournament || tournament.tournamentType !== "entryForAll" || !tournament.registrationOpen) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg p-6 mb-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-2">Registration Open!</h3>
          <p className="text-purple-200 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Registration closes on {tournament.registrationDeadline}
          </p>
        </div>
        <button
          onClick={onRegisterClick}
          className="bg-white text-purple-800 hover:bg-purple-100 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

export default TournamentRegistrationBanner;
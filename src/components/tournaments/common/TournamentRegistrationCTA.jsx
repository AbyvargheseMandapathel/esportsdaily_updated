import React from 'react';
import { FaUserCheck, FaMoneyBill } from 'react-icons/fa';

function TournamentRegistrationCTA({ 
  tournament, 
  onRegisterClick, 
  variant = 'default' // 'default', 'sidebar', 'mobile'
}) {
  if (!tournament) return null;

  // For invited tournaments that only need ticket sales
  if (tournament.tournamentType === "invited" && variant !== 'banner') {
    return tournament.ticketsAvailable ? (
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Get Tickets</h3>
        <p className="text-gray-300 mb-4">
          Secure your spot to watch the top teams compete live!
        </p>
        <a 
          href="#" 
          className="w-full py-3 px-6 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 flex items-center justify-center"
        >
          <FaMoneyBill className="mr-2" />
          Purchase Tickets
        </a>
      </div>
    ) : null;
  }

  // For open tournaments with registration
  if (tournament.tournamentType === "entryForAll") {
    if (variant === 'banner') {
      return (
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Compete?</h2>
              <p className="text-purple-200">
                {tournament.tournamentType === "invited" 
                  ? "Get your spectator tickets before they sell out!" 
                  : "Register your team now and join the competition!"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {tournament.tournamentType === "entryForAll" && (
                <button
                  onClick={onRegisterClick}
                  disabled={!tournament.registrationOpen}
                  className={`py-3 px-8 rounded-lg font-bold text-lg ${
                    tournament.registrationOpen 
                      ? 'bg-white text-purple-800 hover:bg-purple-100' 
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  } transition-all duration-200 flex items-center justify-center shadow-md`}
                >
                  <FaUserCheck className="mr-2" />
                  Register Now
                </button>
              )}
              {tournament.ticketsAvailable && (
                <a 
                  href="#" 
                  className="py-3 px-8 rounded-lg font-bold text-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 flex items-center justify-center shadow-md"
                >
                  <FaMoneyBill className="mr-2" />
                  Get Tickets
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Sidebar or mobile variant
    return (
      <div className={variant === 'mobile' ? 'lg:hidden' : 'hidden lg:block sticky top-4'}>
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Join the Tournament</h3>
          <p className="text-gray-300 mb-4">
            {tournament.registrationOpen 
              ? `Don't miss your chance to compete! Registration closes on ${tournament.registrationDeadline}.` 
              : "Registration for this tournament is currently closed."}
          </p>
          <button
            onClick={onRegisterClick}
            disabled={!tournament.registrationOpen}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white ${
              tournament.registrationOpen 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
                : 'bg-gray-700 cursor-not-allowed'
            } transition-all duration-200 flex items-center justify-center`}
          >
            {tournament.registrationOpen ? "Sign Up Now" : "Registration Closed"}
          </button>
          {tournament.ticketsAvailable && (
            <a 
              href="#" 
              className="mt-3 w-full py-3 px-6 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <FaMoneyBill className="mr-2" />
              Get Tickets
            </a>
          )}
        </div>
      </div>
    );
  }
  
  return null;
}

export default TournamentRegistrationCTA;
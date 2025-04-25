import React from 'react';
import { Tab } from '@headlessui/react';
import { FaClock, FaTrophy, FaUsers, FaClipboardList, FaChartLine, FaStar } from 'react-icons/fa';

function TournamentTabs({ tournament, activeTab, setActiveTab }) {
  // Add null check for tournament
  if (!tournament) {
    return null;
  }

  // Tab configuration with icons and responsive labels
  const tabs = [
    { 
      id: 'format', 
      icon: <FaClock className="mr-2" />, 
      label: 'Format & Schedule',
      shortLabel: 'Format'
    },
    // Show both registered and invited teams for all tournament types
    { 
      id: 'teams', 
      icon: <FaUsers className="mr-2" />, 
      label: 'Teams',
      shortLabel: 'Teams'
    },
    { 
      id: 'prize', 
      icon: <FaTrophy className="mr-2" />, 
      label: 'Prize Distribution',
      shortLabel: 'Prize'
    },
    { 
      id: 'points', 
      icon: <FaChartLine className="mr-2" />, 
      label: 'Points System',
      shortLabel: 'Points'
    },
    { 
      id: 'rules', 
      icon: <FaClipboardList className="mr-2" />, 
      label: 'Rules',
      shortLabel: 'Rules'
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 shadow-lg">
      <Tab.Group onChange={setActiveTab} defaultIndex={activeTab || 0}>
        <Tab.List className="flex flex-wrap sm:flex-nowrap space-y-1 sm:space-y-0 sm:space-x-1 rounded-xl bg-gray-700 p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `flex items-center justify-center w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white transition-all duration-200 ease-in-out
                ${selected 
                  ? 'bg-purple-600 shadow' 
                  : 'text-gray-400 hover:bg-gray-600 hover:text-white'}`
              }
            >
              <span className="flex items-center">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
            </Tab>
          ))}
        </Tab.List>
        
        <Tab.Panels className="mt-2">
          {/* Format & Schedule Panel */}
          <Tab.Panel className="rounded-xl bg-gray-800 p-3 transition-all duration-300 ease-in-out">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <FaClock className="mr-2 text-purple-400" /> Tournament Format & Schedule
            </h2>
            <p className="text-gray-300 mb-6">
              <span className="font-semibold">Format:</span> {tournament.format || 'Not specified'}
            </p>
            
            {tournament.schedule && tournament.schedule.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-600"></div>
                <div className="space-y-6">
                  {tournament.schedule.map((item, index) => (
                    <div key={index} className="relative pl-8 group">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <FaClock className="text-white" />
                      </div>
                      <div className="transform transition-all duration-200 ease-in-out group-hover:translate-x-1">
                        <h3 className="text-lg font-semibold text-white">{item.stage}</h3>
                        <p className="text-purple-400 text-sm mb-1">{item.date}</p>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-300">No schedule information available.</p>
            )}
          </Tab.Panel>
          
          {/* Teams Panel - Shows both invited and registered teams */}
          <Tab.Panel className="rounded-xl bg-gray-800 p-3 transition-all duration-300 ease-in-out">
            <div className="space-y-8">
              {/* Invited Teams Section */}
              {tournament.invitedTeams && tournament.invitedTeams.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                    <FaStar className="mr-2 text-yellow-400" /> Invited Teams
                    {tournament.tournamentType !== "invited" && (
                      <span className="ml-2 text-sm bg-yellow-600/30 text-yellow-300 px-2 py-0.5 rounded-full">
                        Special Invites
                      </span>
                    )}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tournament.invitedTeams.map((team, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-start hover:bg-gray-650 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg border-l-4 border-yellow-500">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full overflow-hidden mr-4 flex-shrink-0">
                          <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-base sm:text-lg">{team.name}</h3>
                          <p className="text-gray-400 text-sm mb-1">{team.region}</p>
                          {team.inviteReason && (
                            <p className="text-yellow-400 text-sm">{team.inviteReason}</p>
                          )}
                          {team.achievements && (
                            <p className="text-purple-400 text-sm">{team.achievements}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Registered Teams Section - Show for non-invited tournaments or if there are registered teams */}
              {(tournament.tournamentType !== "invited" || tournament.registeredTeams?.length > 0) && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                    <FaUsers className="mr-2 text-purple-400" /> Registered Teams
                  </h2>
                  {tournament.registeredTeams && tournament.registeredTeams.length > 0 ? (
                    <>
                      <p className="text-gray-300 mb-4">
                        Total teams registered: <span className="text-purple-400 font-semibold">{tournament.registeredTeams.length}</span> / <span className="text-white">{tournament.teams || 'N/A'}</span>
                      </p>
                      <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-purple-900/50">
                              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Team Name</th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Region</th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Registration Date</th>
                              {tournament.registeredTeams.some(team => team.status) && (
                                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Status</th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {tournament.registeredTeams.map((team, index) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                                <td className="py-3 px-4 text-white">{team.name}</td>
                                <td className="py-3 px-4 text-white">{team.region}</td>
                                <td className="py-3 px-4 text-white">{team.registrationDate}</td>
                                {tournament.registeredTeams.some(team => team.status) && (
                                  <td className="py-3 px-4">
                                    {team.status && (
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        team.status === 'Qualified' ? 'bg-green-900/50 text-green-400' :
                                        team.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' :
                                        team.status === 'Eliminated' ? 'bg-red-900/50 text-red-400' :
                                        'bg-gray-700 text-gray-300'
                                      }`}>
                                        {team.status}
                                      </span>
                                    )}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-300">No registered teams yet.</p>
                  )}
                </div>
              )}
              
              {/* Show message if no teams at all */}
              {(!tournament.invitedTeams || tournament.invitedTeams.length === 0) && 
               (!tournament.registeredTeams || tournament.registeredTeams.length === 0) && (
                <p className="text-gray-300">No team information available for this tournament.</p>
              )}
            </div>
          </Tab.Panel>
          
          {/* Prize Distribution Panel */}
          <Tab.Panel className="rounded-xl bg-gray-800 p-3 transition-all duration-300 ease-in-out">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <FaTrophy className="mr-2 text-purple-400" /> Prize Pool Distribution
            </h2>
            <p className="text-gray-300 mb-6">
              <span className="font-semibold">Total Prize Pool:</span> <span className="text-purple-400">{tournament.prizePool || 'Not specified'}</span>
            </p>
            
            {tournament.prizeDistribution && tournament.prizeDistribution.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-purple-900/50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-white">Position</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-white">Prize</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {tournament.prizeDistribution.map((prize, index) => (
                      <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="py-3 px-4 text-white">{prize.position}</td>
                        <td className="py-3 px-4 text-purple-400 font-medium">{prize.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-300">Prize distribution details not available.</p>
            )}
          </Tab.Panel>
          
          {/* Points System Panel */}
          <Tab.Panel className="rounded-xl bg-gray-800 p-3 transition-all duration-300 ease-in-out">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <FaChartLine className="mr-2 text-purple-400" /> Points System
            </h2>
            <p className="text-gray-300 mb-6">
              Points are awarded based on placement and eliminations in each match.
            </p>
            
            {tournament.pointsSystem && tournament.pointsSystem.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-purple-900/50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-white">Action</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-white">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {tournament.pointsSystem.map((point, index) => (
                      <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="py-3 px-4 text-white">{point.action}</td>
                        <td className="py-3 px-4 text-purple-400 font-medium">{point.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-300">Points system details not available.</p>
            )}
          </Tab.Panel>
          
          {/* Rules Panel */}
          <Tab.Panel className="rounded-xl bg-gray-800 p-3 transition-all duration-300 ease-in-out">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
              <FaClipboardList className="mr-2 text-purple-400" /> Tournament Rules
            </h2>
            {tournament.rules && tournament.rules.length > 0 ? (
              <div className="space-y-3">
                {tournament.rules.map((rule, index) => (
                  <div key={index} className="flex items-start group hover:bg-gray-750/30 p-2 rounded-lg transition-colors duration-150">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 group-hover:bg-purple-500 transition-colors duration-150">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-150">{rule}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">Tournament rules not available.</p>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default TournamentTabs;
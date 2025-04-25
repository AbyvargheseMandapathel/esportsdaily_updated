import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaClock, FaShieldAlt, FaGamepad, FaBuilding } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';
import ScrimRegistrationCTA from './common/ScrimRegistrationCTA';
import ScrimInfoSidebar from './common/ScrimInfoSidebar';
import ScrimRules from './common/ScrimRules';
import ScrimParticipants from './common/ScrimParticipants';

function ScrimDetailPage() {
  const { id } = useParams();
  const [scrim, setScrim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchScrim = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            // Mock data for a single scrim
            resolve({
              id: 1,
              title: "BGMI Pro Scrims Series",
              game: "BGMI",
              entryFee: "Free",
              prizePool: "₹10,000",
              startDate: "July 15, 2023",
              endDate: "July 18, 2023",
              time: "8:00 PM - 11:00 PM IST",
              location: "Online",
              slots: 20,
              slotsRemaining: 8,
              status: "Registration Open",
              image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=BGMI+Pro+Scrims",
              logo: "https://placehold.co/200/3b0764/e9d5ff?text=BGMI",
              organizer: "ESports Daily",
              organizerLogo: "https://placehold.co/100/3b0764/e9d5ff?text=ESD",
              description: "Daily scrims for professional and semi-professional BGMI teams. Perfect practice environment with top-tier competition.",
              longDescription: "The BGMI Pro Scrims Series is designed to provide a competitive practice environment for teams preparing for tournaments. Each day features 3 matches with a point system similar to official tournaments. Teams will receive detailed statistics and replay analysis after each session to help improve their gameplay and strategies.",
              rules: [
                "Teams must check-in 30 minutes before the start time",
                "All players must use the official Discord server for communication",
                "Stream sniping is strictly prohibited",
                "Teams must play all scheduled matches",
                "Teaming with other squads is not allowed",
                "Use of cheats, hacks, or exploits will result in permanent ban",
                "Toxic behavior will not be tolerated",
                "Admins' decisions are final"
              ],
              format: "3 matches per day, points system: Position points + kill points",
              pointSystem: [
                { position: "1st", points: 15 },
                { position: "2nd", points: 12 },
                { position: "3rd", points: 10 },
                { position: "4th", points: 8 },
                { position: "5th", points: 6 },
                { position: "6th-10th", points: 4 },
                { position: "11th-15th", points: 2 },
                { position: "16th-20th", points: 0 },
                { position: "Per Kill", points: 1 }
              ],
              schedule: [
                { date: "July 15, 2023", time: "8:00 PM - 11:00 PM", matches: 3 },
                { date: "July 16, 2023", time: "8:00 PM - 11:00 PM", matches: 3 },
                { date: "July 17, 2023", time: "8:00 PM - 11:00 PM", matches: 3 },
                { date: "July 18, 2023", time: "8:00 PM - 11:00 PM", matches: 3 }
              ],
              participants: [
                { name: "Team Alpha", logo: "https://placehold.co/50/3b0764/e9d5ff?text=TA", status: "confirmed" },
                { name: "Omega Squad", logo: "https://placehold.co/50/3b0764/e9d5ff?text=OS", status: "confirmed" },
                { name: "Phoenix Force", logo: "https://placehold.co/50/3b0764/e9d5ff?text=PF", status: "confirmed" },
                { name: "Viper Gaming", logo: "https://placehold.co/50/3b0764/e9d5ff?text=VG", status: "confirmed" },
                { name: "Nexus Esports", logo: "https://placehold.co/50/3b0764/e9d5ff?text=NE", status: "confirmed" },
                { name: "Titan Squad", logo: "https://placehold.co/50/3b0764/e9d5ff?text=TS", status: "confirmed" },
                { name: "Dragon Esports", logo: "https://placehold.co/50/3b0764/e9d5ff?text=DE", status: "confirmed" },
                { name: "Raven Gaming", logo: "https://placehold.co/50/3b0764/e9d5ff?text=RG", status: "confirmed" },
                { name: "Falcon Team", logo: "https://placehold.co/50/3b0764/e9d5ff?text=FT", status: "confirmed" },
                { name: "Shadow Wolves", logo: "https://placehold.co/50/3b0764/e9d5ff?text=SW", status: "confirmed" },
                { name: "Cobra Squad", logo: "https://placehold.co/50/3b0764/e9d5ff?text=CS", status: "confirmed" },
                { name: "Eagle Gaming", logo: "https://placehold.co/50/3b0764/e9d5ff?text=EG", status: "confirmed" }
              ],
              contact: {
                discord: "discord.gg/esportsdaily",
                email: "scrims@esportsdaily.com",
                phone: "+91 9876543210"
              }
            });
          }, 1000);
        });
        
        setScrim(response);
      } catch (err) {
        setError(err.message || "Failed to load scrim details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchScrim();
  }, [id]);

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading scrim details..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  // Not found state
  if (!scrim) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 text-center max-w-md">
          <FaShieldAlt className="text-gray-600 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Scrim Not Found</h2>
          <p className="text-gray-400 mb-4">The scrim you're looking for doesn't exist or has been removed.</p>
          <a href="/scrims" className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Back to Scrims
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="h-[300px] md:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${scrim.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {scrim.game}
                </span>
                <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                  scrim.entryFee === 'Free' ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                  {scrim.entryFee}
                </span>
                <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                  scrim.status === 'Registration Open' ? 'bg-green-600' : 
                  scrim.status === 'Starting Soon' ? 'bg-yellow-600' : 
                  scrim.status === 'In Progress' ? 'bg-red-600' : 'bg-gray-600'
                }`}>
                  {scrim.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{scrim.title}</h1>
              <p className="text-gray-300 mb-4 max-w-3xl">{scrim.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-gray-800 rounded-t-lg overflow-hidden mb-6">
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'info' 
                      ? 'text-white bg-gray-700 border-b-2 border-purple-500' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Information
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'rules' 
                      ? 'text-white bg-gray-700 border-b-2 border-purple-500' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Rules & Format
                </button>
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'participants' 
                      ? 'text-white bg-gray-700 border-b-2 border-purple-500' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Participants ({scrim.participants.length}/{scrim.slots})
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'info' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">About This Scrim</h2>
                    <p className="text-gray-300 mb-6">{scrim.longDescription}</p>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Schedule</h3>
                    <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
                      <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Matches
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                          {scrim.schedule.map((day, index) => (
                            <tr key={index} className="hover:bg-gray-600">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {day.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {day.time}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {day.matches}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <div className="bg-gray-800 p-2 rounded-full mr-3">
                            <FaMapMarkerAlt className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Discord</p>
                            <p className="text-white">{scrim.contact.discord}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-gray-800 p-2 rounded-full mr-3">
                            <FaMapMarkerAlt className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white">{scrim.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-gray-800 p-2 rounded-full mr-3">
                            <FaMapMarkerAlt className="text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white">{scrim.contact.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'rules' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Rules & Format</h2>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Format</h3>
                    <p className="text-gray-300 mb-6">{scrim.format}</p>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Point System</h3>
                    <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
                      <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Position
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Points
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                          {scrim.pointSystem.map((point, index) => (
                            <tr key={index} className="hover:bg-gray-600">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {point.position}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {point.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Rules</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                      {scrim.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'participants' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
                    <p className="text-gray-300 mb-4">
                      {scrim.participants.length} of {scrim.slots} slots filled
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {scrim.participants.map((team, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center">
                          <img 
                            src={team.logo} 
                            alt={team.name} 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-white font-medium">{team.name}</p>
                            <span className="text-xs text-green-400">Confirmed</span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Empty slots */}
                      {Array.from({ length: scrim.slots - scrim.participants.length }).map((_, index) => (
                        <div key={`empty-${index}`} className="bg-gray-700 rounded-lg p-4 flex items-center border border-dashed border-gray-600">
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                            <FaUsers className="text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-400 font-medium">Open Slot</p>
                            <span className="text-xs text-gray-500">Available</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
                    {/* Sidebar */}
                    <div className="lg:w-80">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Scrim Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-3">
                      <FaCalendarAlt className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Date</p>
                      <p className="text-white">{scrim.startDate} {scrim.startDate !== scrim.endDate && `- ${scrim.endDate}`}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-3">
                      <FaClock className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Time</p>
                      <p className="text-white">{scrim.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-3">
                      <FaGamepad className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Game</p>
                      <p className="text-white">{scrim.game}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-3">
                      <FaUsers className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Slots</p>
                      <p className="text-white">{scrim.slotsRemaining} of {scrim.slots} available</p>
                    </div>
                  </div>
                  
                  {scrim.prizePool !== "None" && (
                    <div className="flex items-center">
                      <div className="bg-gray-700 p-2 rounded-full mr-3">
                        <FaMoneyBillWave className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Prize Pool</p>
                        <p className="text-white">{scrim.prizePool}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-3">
                      <FaBuilding className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Organizer</p>
                      <Link 
                        to={`/organizers/${scrim.organizer.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {scrim.organizer}
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={handleRegisterClick}
                    disabled={scrim.status !== "Registration Open"}
                    className={`w-full py-3 px-4 rounded-md font-medium ${
                      scrim.status === "Registration Open"
                        ? 'bg-purple-600 text-white hover:bg-purple-700 transition-colors'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {scrim.status === "Registration Open" ? "Register Team" : "Registration Closed"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold text-white mb-4">Register for {scrim.title}</h2>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Team Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-purple-500"
                placeholder="Enter your team name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Team Leader
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-purple-500"
                placeholder="Enter team leader name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-purple-500"
                placeholder="Enter contact number"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Discord ID
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-purple-500"
                placeholder="Enter Discord ID"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-700 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScrimDetailPage;
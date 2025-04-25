import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';

function TournamentListPage() {
  const [tournaments, setTournaments] = useState({
    premium: [],
    featured: [],
    normal: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              premium: [
                {
                  id: 1,
                  title: "The International 2023",
                  game: "Dota 2",
                  prizePool: "$40,000,000",
                  startDate: "October 12, 2023",
                  endDate: "October 29, 2023",
                  location: "Seattle, USA",
                  teams: 18,
                  status: "Upcoming",
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=The+International+2023",
                  organizer: "Valve Corporation",
                  description: "The biggest Dota 2 tournament of the year, featuring the world's top teams competing for the Aegis of Champions."
                },
                {
                  id: 2,
                  title: "League of Legends World Championship",
                  game: "League of Legends",
                  prizePool: "$2,500,000",
                  startDate: "September 25, 2023",
                  endDate: "November 4, 2023",
                  location: "Seoul, South Korea",
                  teams: 24,
                  status: "Upcoming",
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=LoL+Worlds+2023",
                  organizer: "Riot Games",
                  description: "The pinnacle of League of Legends esports, where regional champions compete for the Summoner's Cup."
                },
                {
                  id: 3,
                  title: "VALORANT Champions 2023",
                  game: "VALORANT",
                  prizePool: "$1,000,000",
                  startDate: "August 6, 2023",
                  endDate: "August 26, 2023",
                  location: "Los Angeles, USA",
                  teams: 16,
                  status: "Upcoming",
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=VALORANT+Champions+2023",
                  organizer: "Riot Games",
                  description: "The culmination of the VALORANT Champions Tour, featuring the best teams from around the world."
                }
              ],
              featured: [
                {
                  id: 4,
                  title: "ESL Pro League Season 18",
                  game: "CS2",
                  prizePool: "$850,000",
                  startDate: "September 30, 2023",
                  endDate: "October 29, 2023",
                  location: "Malta",
                  teams: 24,
                  status: "Upcoming",
                  image: "https://placehold.co/600x300/3b0764/e9d5ff?text=ESL+Pro+League",
                  organizer: "ESL",
                  description: "One of the longest-running professional CS2 leagues, featuring top teams from around the world."
                },
                {
                  id: 5,
                  title: "Rocket League Championship Series 2023-24",
                  game: "Rocket League",
                  prizePool: "$6,000,000",
                  startDate: "October 20, 2023",
                  endDate: "July 21, 2024",
                  location: "Various",
                  teams: 32,
                  status: "Upcoming",
                  image: "https://placehold.co/600x300/3b0764/e9d5ff?text=RLCS+2023-24",
                  organizer: "Psyonix",
                  description: "The premier Rocket League esports competition, spanning multiple splits and culminating in a World Championship."
                },
                {
                  id: 6,
                  title: "Overwatch League 2023",
                  game: "Overwatch 2",
                  prizePool: "$4,500,000",
                  startDate: "April 27, 2023",
                  endDate: "October 15, 2023",
                  location: "Various",
                  teams: 20,
                  status: "Ongoing",
                  image: "https://placehold.co/600x300/3b0764/e9d5ff?text=Overwatch+League+2023",
                  organizer: "Blizzard Entertainment",
                  description: "The official global esports league for Overwatch 2, featuring city-based franchise teams."
                }
              ],
              normal: [
                {
                  id: 7,
                  title: "DreamHack Open",
                  game: "CS2",
                  prizePool: "$100,000",
                  startDate: "November 15, 2023",
                  endDate: "November 17, 2023",
                  location: "Atlanta, USA",
                  teams: 8,
                  status: "Upcoming",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=DreamHack+Open",
                  organizer: "DreamHack"
                },
                {
                  id: 8,
                  title: "Apex Legends Global Series",
                  game: "Apex Legends",
                  prizePool: "$5,000,000",
                  startDate: "October 2023",
                  endDate: "July 2024",
                  location: "Various",
                  teams: 40,
                  status: "Upcoming",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=ALGS+2023-24",
                  organizer: "Electronic Arts"
                },
                {
                  id: 9,
                  title: "Call of Duty League 2024",
                  game: "Call of Duty",
                  prizePool: "$5,000,000",
                  startDate: "December 2023",
                  endDate: "August 2024",
                  location: "Various",
                  teams: 12,
                  status: "Upcoming",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=CDL+2024",
                  organizer: "Activision Blizzard"
                },
                {
                  id: 10,
                  title: "Fortnite Champion Series 2023",
                  game: "Fortnite",
                  prizePool: "$10,000,000",
                  startDate: "January 2023",
                  endDate: "December 2023",
                  location: "Online",
                  teams: "Various",
                  status: "Ongoing",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=FNCS+2023",
                  organizer: "Epic Games"
                },
                {
                  id: 11,
                  title: "Rainbow Six Invitational 2024",
                  game: "Rainbow Six Siege",
                  prizePool: "$3,000,000",
                  startDate: "February 2024",
                  endDate: "February 2024",
                  location: "Montreal, Canada",
                  teams: 20,
                  status: "Upcoming",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=R6+Invitational+2024",
                  organizer: "Ubisoft"
                },
                {
                  id: 12,
                  title: "Halo Championship Series 2023",
                  game: "Halo Infinite",
                  prizePool: "$1,000,000",
                  startDate: "March 2023",
                  endDate: "October 2023",
                  location: "Various",
                  teams: 16,
                  status: "Ongoing",
                  image: "https://placehold.co/400x200/3b0764/e9d5ff?text=HCS+2023",
                  organizer: "Microsoft"
                }
              ]
            });
          }, 800);
        });
        
        setTournaments(response);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Failed to load tournaments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();

    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % tournaments.premium.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tournaments.premium.length]);

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading tournaments..." />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Helmet>
        <title>Esports Tournaments | Esports Daily</title>
        <meta name="description" content="Browse upcoming and ongoing esports tournaments across all major games." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Esports Tournaments</h1>
          <p className="text-gray-400">Browse upcoming and ongoing tournaments across all major esports titles.</p>
        </div>

        {/* Premium Tournaments Carousel */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Premium Tournaments</h2>
            <div className="flex space-x-2">
              {tournaments.premium.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeSlide === index ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {tournaments.premium.map((tournament) => (
                <div key={tournament.id} className="w-full flex-shrink-0">
                  <div className="relative h-[400px] group">
                    <img 
                      src={tournament.image} 
                      alt={tournament.title} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent rounded-xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center mb-2">
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mr-2">
                          {tournament.game}
                        </span>
                        <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                          {tournament.status}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{tournament.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">{tournament.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Prize Pool</p>
                          <p className="text-white font-semibold">{tournament.prizePool}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Teams</p>
                          <p className="text-white font-semibold">{tournament.teams}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Start Date</p>
                          <p className="text-white font-semibold">{tournament.startDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Location</p>
                          <p className="text-white font-semibold">{tournament.location}</p>
                        </div>
                      </div>
                      <Link 
                        to={`/tournaments/${tournament.id}`} 
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel controls */}
            <button 
              onClick={() => setActiveSlide(prev => (prev - 1 + tournaments.premium.length) % tournaments.premium.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-2 rounded-full"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveSlide(prev => (prev + 1) % tournaments.premium.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-white p-2 rounded-full"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Featured Tournaments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.featured.map((tournament) => (
              <Link to={`/tournaments/${tournament.id}`} key={tournament.id} className="block">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:shadow-xl h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={tournament.image} 
                      alt={tournament.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-br">
                      {tournament.game}
                    </div>
                    <div className="absolute top-0 right-0 bg-gray-800/80 text-white text-xs px-2 py-1 m-2 rounded">
                      {tournament.status}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-2 hover:text-purple-400 transition-colors duration-200">
                      {tournament.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {tournament.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs">Prize Pool</p>
                        <p className="text-white font-semibold">{tournament.prizePool}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Teams</p>
                        <p className="text-white font-semibold">{tournament.teams}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Start Date</p>
                        <p className="text-white font-semibold">{tournament.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Location</p>
                        <p className="text-white font-semibold">{tournament.location}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <span className="text-purple-500 hover:text-purple-400 text-sm font-medium flex items-center">
                        View Tournament
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Normal Tournaments */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">All Tournaments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tournaments.normal.map((tournament) => (
              <Link to={`/tournaments/${tournament.id}`} key={tournament.id} className="block">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:bg-gray-750 hover:shadow-lg group">
                  <div className="relative">
                    <img 
                      src={tournament.image} 
                      alt={tournament.title} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-br">
                      {tournament.game}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-200 line-clamp-1">
                      {tournament.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                      <span>{tournament.organizer}</span>
                      <span className="bg-gray-700 px-2 py-0.5 rounded">{tournament.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Prize</p>
                        <p className="text-white">{tournament.prizePool}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Date</p>
                        <p className="text-white">{tournament.startDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TournamentListPage;
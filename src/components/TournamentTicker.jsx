import { useState, useEffect } from 'react';
import { FaClock, FaChevronLeft, FaChevronRight, FaGamepad, FaChevronDown } from 'react-icons/fa';
import AnnouncementBar from './AnnouncementBar';

function TournamentTicker() {
  // Sample tournament data - in a real app, this would come from an API
  const tournaments = [
    {
      id: 1,
      name: "RLCS 2025 Major 1",
      dates: "Mar. 27-30",
      time: "5:30AM",
      status: "LIVE",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=RLCS"
    },
    {
      id: 2,
      name: "MK1 Texas Showdown 2025",
      dates: "Mar. 28-30",
      time: "5:30AM",
      status: "LIVE",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=MK1"
    },
    {
      id: 3,
      name: "PGL Bucharest 2025",
      dates: "Apr. 1-13",
      time: "5:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=PGL"
    },
    {
      id: 4,
      name: "ESL One Raleigh 2025",
      dates: "Apr. 7-13",
      time: "3:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=ESL"
    },
    {
      id: 5,
      name: "IEM Cologne 2025",
      dates: "May 10-15",
      time: "5:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=IEM"
    },
    {
      id: 6,
      name: "Valorant Champions 2025",
      dates: "Jun. 5-20",
      time: "7:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=VAL"
    },
    {
      id: 7,
      name: "The International 2025",
      dates: "Aug. 15-25",
      time: "10:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=TI"
    },
    {
      id: 8,
      name: "LoL Worlds 2025",
      dates: "Oct. 1-30",
      time: "6:30AM",
      logo: "https://placehold.co/100/3b0764/e9d5ff?text=LoL"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllGames, setShowAllGames] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Determine visible count based on screen size
  const visibleCount = isMobile ? 1 : 4;

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextTournament = () => {
    if (currentIndex < tournaments.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const prevTournament = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(tournaments.length - visibleCount); // Loop to end
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTournament();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const toggleAllGames = () => {
    setShowAllGames(!showAllGames);
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <AnnouncementBar />
      
      {/* Tournament ticker */}
      <div className="relative max-w-7xl mx-auto px-4 py-2 flex items-center">
        {/* All Games Dropdown */}
        <div className="relative mr-2 md:mr-4">
          <button 
            onClick={toggleAllGames}
            className="flex items-center text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 md:px-3 md:py-2 rounded-md"
          >
            <FaGamepad className="text-red-500 mr-1 md:mr-2" />
            <span className="mr-1 hidden sm:inline">All Games</span>
            <FaChevronDown className="text-xs" />
          </button>
          
          {showAllGames && (
            <div className="absolute left-0 top-full mt-1 w-64 md:w-72 bg-gray-800 shadow-lg rounded-md z-50 overflow-hidden">
              <div className="p-2 border-b border-gray-700">
                <h3 className="text-white font-medium">All Tournaments</h3>
              </div>
              <div className="max-h-80 md:max-h-96 overflow-y-auto">
                {tournaments.map(tournament => (
                  <a 
                    key={tournament.id} 
                    href="#" 
                    className="flex items-center p-2 md:p-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 flex-shrink-0 bg-gray-900 rounded-full overflow-hidden">
                      <img src={tournament.logo} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm md:text-base font-medium truncate">{tournament.name}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <span className="truncate">{tournament.dates}</span>
                        <span className="mx-1">|</span>
                        <span className="flex items-center whitespace-nowrap">
                          <FaClock className="mr-1 text-xs" />
                          {tournament.time}
                        </span>
                      </div>
                    </div>
                    {tournament.status === "LIVE" && (
                      <span className="ml-1 md:ml-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 md:px-2 md:py-0.5 rounded">
                        LIVE
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={prevTournament}
          className="text-gray-400 hover:text-white p-1 focus:outline-none"
          aria-label="Previous tournaments"
        >
          <FaChevronLeft />
        </button>
        
        <div className="flex-1 overflow-hidden">
        <div 
            className="flex transition-transform duration-300" 
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {tournaments.map((tournament) => (
              <div 
                key={tournament.id} 
                className="flex-shrink-0 px-1 md:px-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <a href="#" className="flex items-center group">
                  <div className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 flex-shrink-0 bg-gray-800 rounded-full overflow-hidden">
                    <img src={tournament.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-white truncate group-hover:text-purple-400">
                      {tournament.name}
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="hidden xs:inline truncate">{tournament.dates}</span>
                      <span className="hidden xs:inline mx-1">|</span>
                      <span className="flex items-center whitespace-nowrap">
                        <FaClock className="mr-1 text-xs" />
                        {tournament.time}
                      </span>
                    </div>
                  </div>
                  {tournament.status === "LIVE" && (
                    <span className="ml-1 md:ml-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded">
                      LIVE
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextTournament}
          className="text-gray-400 hover:text-white p-1 focus:outline-none"
          aria-label="Next tournaments"
        >
          <FaChevronRight />
        </button>
        
        <a href="#" className="ml-2 md:ml-4 text-xs md:text-sm text-gray-300 hover:text-white whitespace-nowrap">
          View all ({tournaments.length})
        </a>
      </div>
    </div>
  );
}

export default TournamentTicker;
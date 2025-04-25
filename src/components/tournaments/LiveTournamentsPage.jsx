import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrophy, FaCircle, FaChevronLeft, FaChevronRight, FaEdit, FaPlus, FaLock } from 'react-icons/fa';
import TournamentSelector from './live/TournamentSelector';
import TournamentHeader from './live/TournamentHeader';
import PointsTable from './live/PointsTable';
import TablePagination from './live/TablePagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

function LiveTournamentsPage() {
  const [liveTournaments, setLiveTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [matches, setMatches] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // This would be determined by auth state in a real app
  const teamsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveTournaments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              tournaments: [
                {
                  id: "live1",
                  title: "BGMI Pro League Season 5",
                  game: "BGMI",
                  status: "LIVE",
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=BGMI+Pro+League",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=BGMI",
                  teams: [
                    { rank: 1, name: "TROY", group: "GROUP A", matches: 12, positionPts: 65, finishPts: 48, totalPts: 113, logo: "https://placehold.co/50/3b0764/e9d5ff?text=TROY" },
                    { rank: 2, name: "EGGY", group: "GROUP B", matches: 12, positionPts: 58, finishPts: 52, totalPts: 110, logo: "https://placehold.co/50/3b0764/e9d5ff?text=EGGY" },
                    // ... other teams
                  ]
                },
                // ... other tournaments
              ]
            });
          }, 1000);
        });
        
        setLiveTournaments(response.tournaments);
        if (response.tournaments.length > 0) {
          setSelectedTournament(response.tournaments[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to load live tournaments");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveTournaments();
  }, []);

  useEffect(() => {
    // Fetch matches when a tournament is selected
    if (selectedTournament) {
      // Simulate API call to fetch matches for the selected tournament
      const fetchMatches = async () => {
        try {
          // Mock data - replace with actual API call
          const mockMatches = [
            { id: 1, name: "Match 1", date: "2023-06-15", map: "Erangel" },
            { id: 2, name: "Match 2", date: "2023-06-16", map: "Miramar" },
            { id: 3, name: "Match 3", date: "2023-06-17", map: "Sanhok" }
          ];
          
          setTimeout(() => {
            setMatches(mockMatches);
          }, 500);
        } catch (err) {
          console.error("Failed to fetch matches:", err);
        }
      };
      
      fetchMatches();
    }
  }, [selectedTournament]);

  // Calculate pagination
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = selectedTournament?.teams?.slice(indexOfFirstTeam, indexOfLastTeam) || [];
  const totalPages = selectedTournament?.teams ? Math.ceil(selectedTournament.teams.length / teamsPerPage) : 0;

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // New function to handle admin access
  const handleAdminAccess = () => {
    // In a real app, this would check authentication or redirect to login
    // For now, we'll just toggle the admin state for demonstration
    setIsAdmin(!isAdmin);
  };

  // Function to navigate to admin match management
  const goToAdminMatchManagement = () => {
    navigate('/admin/matches');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FaCircle className="text-red-500 animate-pulse mr-2" />
          Live Tournaments
        </h1>
        
        {/* Admin controls - only show Add New Match button if admin */}
        {/*<div className="flex space-x-3">
          <button
            onClick={handleAdminAccess}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <FaLock className="mr-2" /> {isAdmin ? "Exit Admin" : "Admin Access"}
          </button>
          
          {isAdmin && (
            <>
              <Link 
                to="/match/new/score" 
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <FaPlus className="mr-2" /> Add New Match
              </Link>
              <button
                onClick={goToAdminMatchManagement}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <FaEdit className="mr-2" /> Manage Matches
              </button>
            </>
          )}
         </div> */}
      </div>

      {liveTournaments.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">No live tournaments at the moment. Check back later!</p>
        </div>
      ) : (
        <>
          <TournamentSelector 
            tournaments={liveTournaments} 
            selectedTournament={selectedTournament} 
            onSelectTournament={(tournament) => {
              setSelectedTournament(tournament);
              setCurrentPage(1);
            }} 
          />

          {selectedTournament && (
            <>
              <TournamentHeader tournament={selectedTournament} />
              
              {/* Match List Section - Remove edit links for public view */}
              {/* <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6 border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white">Tournament Matches</h2>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matches.length === 0 ? (
                    <div className="col-span-3 text-center py-4 text-gray-400">
                      No matches available for this tournament.
                    </div>
                  ) : (
                    matches.map(match => (
                      <div key={match.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700/70 transition-all">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white font-medium">{match.name}</h3>
                          <span className="text-gray-400 text-sm">{match.date}</span>
                        </div>
                        <div className="text-gray-400 text-sm mb-3">
                          Map: {match.map}
                        </div>
                        {/* Edit link removed from public view 
                      </div>
                    ))
                  )}
                </div>
              </div> */}
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                <PointsTable teams={currentTeams} />
                
                <TablePagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  indexOfFirstTeam={indexOfFirstTeam}
                  indexOfLastTeam={indexOfLastTeam}
                  totalTeams={selectedTournament.teams.length}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </>
      )}
      
      {/* Admin Panel - Only visible when in admin mode */}
      {isAdmin && (
        <div className="mt-8 bg-gray-800/80 border border-purple-500/30 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaLock className="text-purple-400 mr-2" /> Admin Match Management
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map(match => (
              <div key={match.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">{match.name}</h3>
                  <span className="text-gray-400 text-sm">{match.date}</span>
                </div>
                <div className="text-gray-400 text-sm mb-3">
                  Map: {match.map}
                </div>
                <div className="flex justify-between mt-3">
                  <Link 
                    to={`/match/${match.id}/score`}
                    className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
                  >
                    <FaEdit className="mr-1" /> Edit Scores
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveTournamentsPage;
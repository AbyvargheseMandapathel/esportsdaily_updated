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
  const [isAdmin, setIsAdmin] = useState(false);
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const teamsPerPage = 8;
  const navigate = useNavigate();

  // Fetch teams and scores from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch teams
        const teamsResponse = await fetch('http://127.0.0.1:8000/teams/');
        if (!teamsResponse.ok) {
          throw new Error('Failed to fetch teams');
        }
        const teamsData = await teamsResponse.json();
        setTeams(teamsData);
        
        // Fetch scores
        const scoresResponse = await fetch('http://127.0.0.1:8000/scores/');
        if (!scoresResponse.ok) {
          throw new Error('Failed to fetch scores');
        }
        const scoresData = await scoresResponse.json();
        setScores(scoresData);
        
        // Process data to create tournament with teams and their scores
        if (teamsData.length > 0) {
          // Create tournament teams with scores
          const tournamentTeams = teamsData.map(team => {
            // Find all scores for this team
            const teamScores = scoresData.filter(score => score.team === team.id);
            
            // Calculate total points
            const totalPositionPts = teamScores.reduce((sum, score) => sum + score.placement_points, 0);
            const totalFinishPts = teamScores.reduce((sum, score) => sum + score.kill_points, 0);
            const totalPts = teamScores.reduce((sum, score) => sum + score.total_points, 0);
            
            return {
              id: team.id,
              rank: 0, // Will be calculated later
              name: team.name,
              group: "GROUP A", // Default group
              matches: teamScores.length,
              positionPts: totalPositionPts,
              finishPts: totalFinishPts,
              totalPts: totalPts,
              logo: team.logo_url
            };
          });
          
          // Sort teams by total points and assign ranks
          tournamentTeams.sort((a, b) => b.totalPts - a.totalPts);
          tournamentTeams.forEach((team, index) => {
            team.rank = index + 1;
          });
          
          // Create tournament object
          const tournamentData = {
            tournaments: [
              {
                id: "live1",
                title: "BGMI Pro League Season 5",
                game: "BGMI",
                status: "LIVE",
                image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=BGMI+Pro+League",
                logo: "https://placehold.co/200/3b0764/e9d5ff?text=BGMI",
                teams: tournamentTeams
              }
            ]
          };
          
          setLiveTournaments(tournamentData.tournaments);
          if (tournamentData.tournaments.length > 0) {
            setSelectedTournament(tournamentData.tournaments[0]);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load tournament data");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
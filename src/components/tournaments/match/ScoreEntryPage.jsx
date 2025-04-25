import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrophy, FaPlus, FaTrash, FaSave, FaSpinner, FaChevronDown } from 'react-icons/fa';

function ScoreEntryPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    team_name: '',
    total_points: 0,
    kills: 0,
    placement_points: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isNewMatch, setIsNewMatch] = useState(false);
  const [matchDetails, setMatchDetails] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0]
  });
  // Add state for available teams
  const [availableTeams, setAvailableTeams] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch all available teams for the tournament
    const fetchAvailableTeams = async () => {
      try {
        // Simulate API call to get all teams in the tournament
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in a real app, this would come from your API
        const allTeamsMock = [
          "TROY", "EGGY", "SOUL", "GodLike", "Team XSpark", 
          "Team Insane", "Enigma", "Team 8Bit", "Team Tamilas",
          "Team Mayhem", "Team IND", "Team Celsius"
        ];
        
        setAvailableTeams(allTeamsMock);
      } catch (err) {
        console.error("Failed to fetch available teams:", err);
      }
    };
    
    fetchAvailableTeams();
  }, []);

  useEffect(() => {
    // Check if this is a new match or editing an existing one
    if (matchId === 'new') {
      setIsNewMatch(true);
      setTeams([]);
      return;
    }
    
    // Fetch existing match data
    const fetchMatchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockMatch = {
          id: parseInt(matchId),
          name: `Match ${matchId}`,
          date: "2023-06-15",
          teams: [
            {
              id: 1,
              team_name: "TROY",
              total_points: 113,
              kills: 48,
              placement_points: 65
            },
            {
              id: 2,
              team_name: "EGGY",
              total_points: 110,
              kills: 52,
              placement_points: 58
            }
          ]
        };
        
        setMatchDetails({
          name: mockMatch.name,
          date: mockMatch.date
        });
        setTeams(mockMatch.teams);
        
        // Update available teams by removing already added teams
        setAvailableTeams(prev => 
          prev.filter(team => !mockMatch.teams.some(t => t.team_name === team))
        );
      } catch (err) {
        setError("Failed to load match data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatchData();
  }, [matchId]);

  const handleMatchDetailsChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails({
      ...matchDetails,
      [name]: value
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric values
    const numericFields = ['total_points', 'kills', 'placement_points'];
    const processedValue = numericFields.includes(name) ? parseInt(value) || 0 : value;
    
    setNewTeam({
      ...newTeam,
      [name]: processedValue
    });
  };

  // New function to handle team selection from dropdown
  const handleTeamSelect = (teamName) => {
    setNewTeam({
      ...newTeam,
      team_name: teamName
    });
    setDropdownOpen(false);
  };

  const addTeam = () => {
    // Validate team name
    if (!newTeam.team_name.trim()) {
      setError("Team name is required");
      return;
    }
    
    // Check if team already exists
    if (teams.some(team => team.team_name.toLowerCase() === newTeam.team_name.toLowerCase())) {
      setError("Team already exists");
      return;
    }
    
    // Add new team with calculated total
    const teamWithId = {
      ...newTeam,
      id: Date.now(), // Use timestamp as temporary ID
      total_points: parseInt(newTeam.kills) + parseInt(newTeam.placement_points)
    };
    
    setTeams([...teams, teamWithId]);
    
    // Remove the added team from available teams
    setAvailableTeams(prev => prev.filter(team => team !== newTeam.team_name));
    
    // Reset form
    setNewTeam({
      team_name: '',
      total_points: 0,
      kills: 0,
      placement_points: 0
    });
    
    setError(null);
  };

  const removeTeam = (index) => {
    const removedTeam = teams[index];
    
    // Add the removed team back to available teams
    if (!availableTeams.includes(removedTeam.team_name)) {
      setAvailableTeams(prev => [...prev, removedTeam.team_name]);
    }
    
    const updatedTeams = [...teams];
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  const updateTotalPoints = (index) => {
    const team = teams[index];
    const updatedTeams = [...teams];
    updatedTeams[index] = {
      ...team,
      total_points: parseInt(team.kills) + parseInt(team.placement_points)
    };
    setTeams(updatedTeams);
  };

  const saveAllScores = async () => {
    // Validate match details for new matches
    if (isNewMatch && !matchDetails.name.trim()) {
      setError("Match name is required");
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send the data to your backend
      console.log("Saving scores for match", isNewMatch ? "new" : matchId, {
        ...matchDetails,
        teams
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Redirect to tournaments page after successful save of a new match
        if (isNewMatch) {
          navigate('/live');
        }
      }, 2000);
    } catch (err) {
      setError("Failed to save scores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FaTrophy className="text-yellow-500 mr-2" />
          {isNewMatch ? "New Match Score Entry" : `Match #${matchId} Score Entry`}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
        >
          Back
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6">
          Scores saved successfully!
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Match Details Section (for new matches) */}
      {isNewMatch && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Match Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Match Name</label>
              <input
                type="text"
                name="name"
                value={matchDetails.name}
                onChange={handleMatchDetailsChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                placeholder="Enter match name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Match Date</label>
              <input
                type="date"
                name="date"
                value={matchDetails.date}
                onChange={handleMatchDetailsChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add new team form */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Add New Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Team Name</label>
            <div className="relative">
              <div 
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 flex justify-between items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={newTeam.team_name ? "text-white" : "text-gray-400"}>
                  {newTeam.team_name || "Select a team"}
                </span>
                <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>
              
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableTeams.length === 0 ? (
                    <div className="px-4 py-2 text-gray-400">No teams available</div>
                  ) : (
                    availableTeams.map((team, idx) => (
                      <div 
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => handleTeamSelect(team)}
                      >
                        {team}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Kills</label>
            <input
              type="number"
              name="kills"
              value={newTeam.kills}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Placement Points</label>
            <input
              type="number"
              name="placement_points"
              value={newTeam.placement_points}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              min="0"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addTeam}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              disabled={loading || !newTeam.team_name}
            >
              <FaPlus className="mr-2" /> Add Team
            </button>
          </div>
        </div>
      </div>

      {/* Teams table - remains the same */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Team Scores</h2>
          {!isNewMatch && (
            <div className="text-gray-400">
              <span className="font-medium">{matchDetails.name}</span>
              <span className="mx-2">•</span>
              <span>{matchDetails.date}</span>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Kills
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Placement Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Points
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <FaSpinner className="animate-spin text-purple-500 mx-auto text-2xl" />
                  </td>
                </tr>
              ) : teams.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No teams added yet. Add a team to get started.
                  </td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="team_name"
                        value={team.team_name}
                        onChange={(e) => handleTeamInputChange(e, index)}
                        className="bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="kills"
                        value={team.kills}
                        onChange={(e) => {
                          handleTeamInputChange(e, index);
                          setTimeout(() => updateTotalPoints(index), 0);
                        }}
                        className="bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1 w-20"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="placement_points"
                        value={team.placement_points}
                        onChange={(e) => {
                          handleTeamInputChange(e, index);
                          setTimeout(() => updateTotalPoints(index), 0);
                        }}
                        className="bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1 w-20"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold">
                      {team.total_points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => removeTeam(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Remove Team"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={saveAllScores}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center justify-center transition-colors"
            disabled={loading || teams.length === 0}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Save All Scores
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreEntryPage;
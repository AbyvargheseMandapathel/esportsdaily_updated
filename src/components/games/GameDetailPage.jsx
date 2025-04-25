import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaGamepad, FaCode } from 'react-icons/fa';
import PlatformIcons from './common/PlatformIcons';

function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            // Find game by ID from a mock dataset
            const mockGames = [
              {
                id: "1",
                title: "Dota 2",
                developer: "Valve",
                genre: "MOBA",
                releaseYear: 2013,
                description: "Dota 2 is a multiplayer online battle arena (MOBA) game where two teams of five players compete to destroy a large structure defended by the opposing team known as the Ancient, whilst defending their own.",
                playerCount: "800K+ daily",
                platforms: ["PC"],
                tournaments: 12,
                prizePool: "$40M+",
                image: "https://placehold.co/800x400/3b0764/e9d5ff?text=Dota+2",
                logo: "https://placehold.co/200x200/3b0764/e9d5ff?text=Dota+2"
              },
              {
                id: "2",
                title: "League of Legends",
                developer: "Riot Games",
                genre: "MOBA",
                releaseYear: 2009,
                description: "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base.",
                playerCount: "180M+ monthly",
                platforms: ["PC"],
                tournaments: 15,
                prizePool: "$30M+",
                image: "https://placehold.co/800x400/172554/bae6fd?text=League+of+Legends",
                logo: "https://placehold.co/200x200/172554/bae6fd?text=LoL"
              },
              // Add more mock games as needed
            ];
            
            const foundGame = mockGames.find(g => g.id === id);
            resolve({ game: foundGame });
          }, 1000);
        });
        
        if (!response.game) {
          throw new Error("Game not found");
        }
        
        setGame(response.game);
      } catch (err) {
        setError(err.message || "Failed to load game details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGame();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg max-w-7xl mx-auto my-8">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // If game is null after loading (shouldn't happen with proper error handling)
  if (!game) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-300">Game not found</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Game Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${game.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg mb-4 md:mb-0 md:mr-6">
              <img 
                src={game.logo} 
                alt={game.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {game.genre}
                </span>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Released {game.releaseYear}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
                <div className="flex items-center">
                  <span className="mr-2">Platforms:</span>
                  <PlatformIcons platforms={game.platforms} />
                </div>
                <div>
                  <span className="mr-2">Developer:</span>
                  {game.developer}
                </div>
                <div>
                  <span className="mr-2">Players:</span>
                  {game.playerCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">About the Game</h2>
            <p className="text-gray-300 mb-6">{game.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FaGamepad className="text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Genre</h3>
                </div>
                <p className="text-gray-300">{game.genre}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FaCode className="text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Developer</h3>
                </div>
                <p className="text-gray-300">{game.developer}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Release Year</h3>
                </div>
                <p className="text-gray-300">{game.releaseYear}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FaUsers className="text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Player Count</h3>
                </div>
                <p className="text-gray-300">{game.playerCount}</p>
              </div>
            </div>
            
            {/* Additional sections like tournaments, news, etc. can be added here */}
          </div>
          
          <div>
            {/* Sidebar content */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Game Stats</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Prize Pool:</span>
                  <span className="text-white font-medium">{game.prizePool}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Tournaments:</span>
                  <span className="text-white font-medium">{game.tournaments}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Release Year:</span>
                  <span className="text-white font-medium">{game.releaseYear}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Developer:</span>
                  <span className="text-white font-medium">{game.developer}</span>
                </li>
              </ul>
            </div>
            
            {/* More sidebar sections can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
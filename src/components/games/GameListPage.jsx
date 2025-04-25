import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import GameCard from './GameCard';

function GameListPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              games: [
                {
                  id: "1",
                  title: "Dota 2",
                  developer: "Valve",
                  genre: "MOBA",
                  releaseYear: 2013,
                  playerCount: "800,000+",
                  description: "Dota 2 is a multiplayer online battle arena (MOBA) game where two teams of five players compete to destroy a large structure defended by the opposing team known as the Ancient.",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Dota+2",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=Dota2",
                  platforms: ["PC"],
                  tournaments: 156,
                  prizePool: "$250M+"
                },
                {
                  id: "2",
                  title: "League of Legends",
                  developer: "Riot Games",
                  genre: "MOBA",
                  releaseYear: 2009,
                  playerCount: "180 million",
                  description: "League of Legends is a team-based strategy game where two teams of five champions face off to destroy the other's base.",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=League+of+Legends",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=LoL",
                  platforms: ["PC", "Mobile"],
                  tournaments: 243,
                  prizePool: "$100M+"
                },
                {
                  id: "3",
                  title: "Counter-Strike 2",
                  developer: "Valve",
                  genre: "FPS",
                  releaseYear: 2023,
                  playerCount: "1.5 million",
                  description: "Counter-Strike 2 is a first-person shooter where teams compete in different game modes to complete objectives or eliminate the enemy team.",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=CS2",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=CS2",
                  platforms: ["PC"],
                  tournaments: 187,
                  prizePool: "$130M+"
                },
                {
                  id: "4",
                  title: "Valorant",
                  developer: "Riot Games",
                  genre: "FPS",
                  releaseYear: 2020,
                  playerCount: "22 million",
                  description: "Valorant is a tactical first-person shooter where precise gunplay meets unique agent abilities.",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Valorant",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=Valorant",
                  platforms: ["PC"],
                  tournaments: 98,
                  prizePool: "$30M+"
                },
                {
                  id: "5",
                  title: "Rocket League",
                  developer: "Psyonix",
                  genre: "Sports",
                  releaseYear: 2015,
                  playerCount: "90 million",
                  description: "Rocket League is a vehicular soccer video game featuring rocket-powered cars.",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Rocket+League",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=RL",
                  platforms: ["PC", "PlayStation", "Xbox", "Switch"],
                  tournaments: 112,
                  prizePool: "$25M+"
                }
              ]
            });
          }, 1000);
        });
        
        setGames(response.games);
      } catch (err) {
        setError('Failed to fetch games. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on search term and filter
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && game.genre.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Esports Games</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the most popular competitive games in esports, from MOBAs to FPS and beyond.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Genres</option>
              <option value="MOBA">MOBA</option>
              <option value="FPS">FPS</option>
              <option value="Battle Royale">Battle Royale</option>
              <option value="Fighting">Fighting</option>
              <option value="Sports">Sports</option>
              <option value="RTS">RTS</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Games Grid */}
        {!loading && !error && (
          <>
            {filteredGames.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No games found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GameListPage;
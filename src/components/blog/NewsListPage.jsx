import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';
import HorizontalAdBanner from '../ads/HorizontalAdBanner';

function NewsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              posts: [
                {
                  id: 1,
                  title: "Team Liquid's Dominant Performance Secures Championship",
                  excerpt: "An in-depth analysis of how Team Liquid outplayed their opponents with superior strategy and teamwork.",
                  category: "Tournament Coverage",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Team+Liquid",
                  date: "June 15, 2023",
                  game: "Dota 2",
                  views: 12547,
                  comments: 89
                },
                {
                  id: 2,
                  title: "Evil Geniuses Roster Shuffle: Analyzing the Changes",
                  excerpt: "Following their semi-final defeat, EG has announced significant changes to their lineup. We break down what this means for the team.",
                  category: "Team News",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Evil+Geniuses",
                  date: "June 12, 2023",
                  game: "Dota 2",
                  views: 8932,
                  comments: 124
                },
                {
                  id: 3,
                  title: "The Meta Evolution: Post-Tournament Analysis",
                  excerpt: "How the tournament meta shifted throughout the event and what it means for future competitions.",
                  category: "Analysis",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Meta+Analysis",
                  date: "June 14, 2023",
                  game: "Dota 2",
                  views: 7621,
                  comments: 56
                },
                {
                  id: 4,
                  title: "Rising Stars: Newcomers Who Made Their Mark",
                  excerpt: "Several new players made impressive debuts at this tournament. We highlight the ones to watch.",
                  category: "Player Spotlight",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Rising+Stars",
                  date: "June 13, 2023",
                  game: "Dota 2",
                  views: 5438,
                  comments: 42
                },
                {
                  id: 5,
                  title: "Major Update Coming to Valorant Next Week",
                  excerpt: "Riot Games announced a significant update to Valorant, introducing new agents and map changes that will reshape the meta.",
                  category: "Game Updates",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Valorant",
                  date: "June 10, 2023",
                  game: "Valorant",
                  views: 15782,
                  comments: 203
                },
                {
                  id: 6,
                  title: "CS2 Tournament Announced with Record Prize Pool",
                  excerpt: "Valve has revealed details for the upcoming CS2 major with the largest prize pool in the game's history.",
                  category: "Tournament",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=CS2",
                  date: "June 8, 2023",
                  game: "CS2",
                  views: 19845,
                  comments: 178
                }
              ]
            });
          }, 800);
        });
        
        setPosts(response.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load news articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.category === filter || post.game === filter;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Get unique categories and games for filter options
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  const games = [...new Set(posts.map(post => post.game))];

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading news articles..." />
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
        <title>Latest Esports News | Esports Daily</title>
        <meta name="description" content="Stay updated with the latest news, tournament results, and updates from the world of esports." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Latest Esports News</h1>
          <p className="text-gray-400">Stay updated with the latest news, tournament results, and updates from the world of esports.</p>
        </div>

        {/* Search and filter section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === category 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
              {games.map(game => (
                <button
                  key={`game-${game}`}
                  onClick={() => setFilter(game)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === game 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ad banner */}
        <div className="mb-8">
          <HorizontalAdBanner title="Featured Sponsor" />
        </div>

        {/* News articles grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:shadow-xl h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-br">
                      {post.category}
                    </div>
                    <div className="absolute top-0 right-0 bg-gray-800/80 text-white text-xs px-2 py-1 m-2 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.views.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-400">{post.game}</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 hover:text-purple-400 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-gray-400 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {post.comments}
                      </div>
                      <span className="text-purple-500 hover:text-purple-400 text-sm font-medium flex items-center">
                        Read More
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
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400 mb-4">We couldn't find any articles matching your search criteria.</p>
            <button 
              onClick={() => {setFilter('all'); setSearchQuery('');}}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination - simplified version */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-purple-600 text-white">1</button>
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700">2</button>
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700">3</button>
              <span className="text-gray-500">...</span>
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700">10</button>
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsListPage;
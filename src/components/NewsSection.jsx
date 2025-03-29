import StandardNewsCard from './cards/StandardNewsCard';
import FeaturedNewsCard from './cards/FeaturedNewsCard';
import CompactNewsCard from './cards/CompactNewsCard';
import GameUpdateCard from './cards/GameUpdateCard';
import TournamentTicker from './TournamentTicker';
import SectionHeader from './SectionHeader';

function NewsSection() {
  // Sample news data - in a real app, this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "Team Liquid Dominates International Tournament",
      excerpt: "Team Liquid secured a decisive victory at the latest international tournament, showcasing exceptional teamwork and strategy.",
      category: "Tournament",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Team+Liquid",
      date: "2 hours ago",
      game: "Dota 2"
    },
    {
      id: 2,
      title: "Major Update Coming to Valorant Next Week",
      excerpt: "Riot Games announced a significant update to Valorant, introducing new agents and map changes that will reshape the meta.",
      category: "Game Updates",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Valorant",
      date: "5 hours ago",
      game: "Valorant"
    },
    {
      id: 3,
      title: "Rising Star Signs with Cloud9",
      excerpt: "An emerging talent in the competitive scene has been signed by Cloud9, strengthening their roster for upcoming tournaments.",
      category: "Team News",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Cloud9",
      date: "Yesterday",
      game: "CS2"
    },
    {
      id: 4,
      title: "ESL Announces New Tournament Series",
      excerpt: "ESL has revealed plans for a new tournament series with an unprecedented prize pool, attracting top teams worldwide.",
      category: "Tournament",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=ESL",
      date: "2 days ago",
      game: "Multiple"
    },
    {
      id: 5,
      title: "Pro Player Retires After Legendary Career",
      excerpt: "After a decade of competitive play and numerous championships, a legendary player announces retirement from professional gaming.",
      category: "Player News",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Retirement",
      date: "3 days ago",
      game: "League of Legends"
    },
    {
      id: 6,
      title: "New Esports Arena Opens in Los Angeles",
      excerpt: "A state-of-the-art esports facility has opened its doors in LA, featuring cutting-edge technology and space for major events.",
      category: "Industry",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Arena",
      date: "4 days ago"
    },
    {
      id: 7,
      title: "Game Developer Announces New Competitive Mode",
      excerpt: "Popular title receives major competitive overhaul with ranked system changes and new tournament features.",
      category: "Game Updates",
      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Updates",
      date: "5 days ago",
      game: "Fortnite"
    }
  ];

  // Get the first item for the featured card
  const featuredNews = newsItems[0];
  // Get the next 3 items for standard cards
  const standardNews = newsItems.slice(1, 4);
  // Get the next 3 items for compact cards
  const compactNews = newsItems.slice(4, 7);
  // Use the last 2 items for game update cards
  const gameUpdates = newsItems.slice(2, 4);

  return (
    <>
      <TournamentTicker />
      
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Latest News" 
            subtitle="Stay updated with the latest in esports" 
          />

          {/* Featured News */}
                    <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-purple-600 pl-3">Featured Story</h3>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-all duration-200">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <FeaturedNewsCard 
              title={featuredNews.title}
              excerpt={featuredNews.excerpt}
              category={featuredNews.category}
              image={featuredNews.image}
              date={featuredNews.date}
            />
          </div>

          {/* Standard News Cards */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-purple-600 pl-3">Top Stories</h3>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-all duration-200">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standardNews.map(item => (
                <StandardNewsCard 
                  key={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  image={item.image}
                  date={item.date}
                />
              ))}
            </div>
          </div>

          {/* Game Updates */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-purple-600 pl-3">Game Updates</h3>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-all duration-200">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameUpdates.map(item => (
                <GameUpdateCard 
                  key={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  image={item.image}
                  date={item.date}
                  game={item.game}
                />
              ))}
            </div>
          </div>

          {/* Compact News */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-purple-600 pl-3">Quick Reads</h3>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-all duration-200">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="space-y-4">
              {compactNews.map(item => (
                <CompactNewsCard 
                  key={item.id}
                  title={item.title}
                  category={item.category}
                  image={item.image}
                  date={item.date}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/30">
              View All News
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsSection;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AdBoard from './AdBoard';
import SimilarPostsSection from './SimilarPostsSection';
import TagsSection from './TagsSection';
import AuthorInfo from './AuthorInfo';
import ShareButtons from './ShareButtons';
import CommentSection from './CommentSection';
import HorizontalAdBanner from '../ads/HorizontalAdBanner';
import InlineAdBanner from '../ads/InlineAdBanner';
import RectangleAdBanner from '../ads/RectangleAdBanner';
import SidebarAdBanner from '../ads/SidebarAdBanner';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';

// Sticky Ad Banner Component
const StickyAdBanner = ({ title = "Community" }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-50">
      <div className="p-1 bg-gray-700 text-xs text-gray-400 uppercase tracking-wider text-center">
        {title}
      </div>
      <div className="h-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Join our community of esports enthusiasts</p>
            <p className="text-gray-400 text-xs">Connect with players and fans worldwide</p>
          </div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200">
          Join Now
        </button>
        <button 
          onClick={handleClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-300"
          aria-label="Close banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Stats Item Component
const StatsItem = ({ icon, text }) => (
  <div className="flex items-center text-gray-400">
    {icon}
    <span>{text}</span>
  </div>
);

// Tournament Match Component
const TournamentMatch = ({ time, game, team1, team2 }) => (
  <div className="p-3 bg-gray-800/90 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs text-purple-400 font-medium">{time}</span>
      <span className="text-xs text-gray-400">{game}</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={team1.logo} alt={team1.name} className="w-6 h-6 rounded-full" />
        <span className="text-white text-sm ml-2">{team1.name}</span>
      </div>
      <span className="text-gray-400 text-xs">vs</span>
      <div className="flex items-center justify-end">
        <span className="text-white text-sm mr-2">{team2.name}</span>
        <img src={team2.logo} alt={team2.name} className="w-6 h-6 rounded-full" />
      </div>
    </div>
  </div>
);

// Related Article Component
const RelatedArticle = ({ image, title, date }) => (
  <div className="flex items-start space-x-3 group">
    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
      <img className="w-full h-full object-cover" src={image} alt={title} />
    </div>
    <div>
      <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors duration-200">{title}</h4>
      <p className="text-sm text-gray-400 mt-1">{date}</p>
    </div>
  </div>
);

// Key Takeaway Item Component
const KeyTakeawayItem = ({ text }) => (
  <li className="flex items-start">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span className="text-gray-300">{text}</span>
  </li>
);

function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              post: {
                id: parseInt(id),
                title: "Team Liquid's Dominant Performance Secures Championship",
                excerpt: "An in-depth analysis of how Team Liquid outplayed their opponents with superior strategy and teamwork.",
                content: `<p>The esports world was treated to a masterclass in teamwork and strategy as Team Liquid secured their championship victory with a dominant 3-1 performance in the finals. Their journey through the tournament showcased why they're considered one of the most adaptable and well-prepared teams in the competitive scene.</p>
                
                <h2 class="text-2xl font-bold text-white mt-6 mb-4">Strategic Brilliance</h2>
                <p>What set Team Liquid apart from their competition was their meticulous preparation and strategic depth. Their coach revealed in the post-match interview that they had prepared specific counter-strategies for each potential opponent, allowing them to adapt on the fly during the draft phase.</p>
                <p>The team's ability to pivot between aggressive early-game compositions and more measured late-game approaches kept their opponents guessing and unable to settle into a comfortable rhythm. This flexibility was particularly evident in their semi-final match against Evil Geniuses, where they completely changed their approach after losing the first game.</p>
                
                <h2 class="text-2xl font-bold text-white mt-6 mb-4">Individual Performances</h2>
                <p>While team coordination was the foundation of their success, several standout individual performances deserve recognition. Their support player, in particular, created space and opportunities that allowed the carries to shine in teamfights.</p>
                <p>The captain's shot-calling was impeccable throughout tense moments, maintaining team composure even when facing significant gold deficits in game three of the finals. This mental fortitude has become a trademark of the organization.</p>
                
                <h2 class="text-2xl font-bold text-white mt-6 mb-4">Looking Ahead</h2>
                <p>With this victory, Team Liquid has secured their spot in the world championship later this year. The team's manager indicated they plan to take a short break before beginning preparation for the even more competitive international stage.</p>
                <p>As the meta continues to evolve with upcoming patches, Team Liquid's adaptability will be their greatest asset. Their coach emphasized the importance of continuing to expand their strategic repertoire rather than becoming complacent with their current success.</p>`,
                category: "Tournament Coverage",
                image: "https://placehold.co/1200x600/3b0764/e9d5ff?text=Team+Liquid+Victory",
                date: "June 15, 2023",
                readTime: "6 min read",
                views: 12547,
                comments: 89,
                author: {
                  name: "Alex Johnson",
                  role: "Esports Analyst",
                  image: "https://placehold.co/100x100/3b0764/e9d5ff?text=AJ",
                  bio: "Former pro player with 5+ years of analytical experience covering major tournaments."
                },
                tags: ["Team Liquid", "Tournament", "Championship", "Strategy", "Dota 2"],
                game: "Dota 2"
              },
              similarPosts: [
                {
                  id: 101,
                  title: "Evil Geniuses Roster Shuffle: Analyzing the Changes",
                  excerpt: "Following their semi-final defeat, EG has announced significant changes to their lineup. We break down what this means for the team.",
                  category: "Team News",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Evil+Geniuses",
                  date: "June 12, 2023",
                  game: "Dota 2"
                },
                {
                  id: 102,
                  title: "The Meta Evolution: Post-Tournament Analysis",
                  excerpt: "How the tournament meta shifted throughout the event and what it means for future competitions.",
                  category: "Analysis",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Meta+Analysis",
                  date: "June 14, 2023",
                  game: "Dota 2"
                },
                {
                  id: 103,
                  title: "Rising Stars: Newcomers Who Made Their Mark",
                  excerpt: "Several new players made impressive debuts at this tournament. We highlight the ones to watch.",
                  category: "Player Spotlight",
                  image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Rising+Stars",
                  date: "June 13, 2023",
                  game: "Dota 2"
                }
              ]
            });
          }, 800);
        });
        
        setPost(response.post);
        setSimilarPosts(response.similarPosts);
      } catch (err) {
        console.error("Error fetching post data:", err);
        setError("Failed to load the article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading article..." />
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

  // Handle case where post is not found
  if (!post) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <ErrorDisplay message="Article not found" />
      </div>
    );
  }

  // Prepare content sections with proper IDs for anchor links
  const firstContentPart = post.content
    .split('<h2 class="text-2xl font-bold text-white mt-6 mb-4">Individual Performances</h2>')[0]
    .replace(
      '<h2 class="text-2xl font-bold text-white mt-6 mb-4">Strategic Brilliance</h2>', 
      '<h2 id="strategic-brilliance" class="text-2xl font-bold text-white mt-6 mb-4">Strategic Brilliance</h2>'
    );

  const secondContentPart = post.content
    .split('<h2 class="text-2xl font-bold text-white mt-6 mb-4">Individual Performances</h2>')[1] || '';
  
  const formattedSecondPart = '<h2 id="individual-performances" class="text-2xl font-bold text-white mt-6 mb-4">Individual Performances</h2>' + 
    secondContentPart.replace(
      '<h2 class="text-2xl font-bold text-white mt-6 mb-4">Looking Ahead</h2>', 
      '<h2 id="looking-ahead" class="text-2xl font-bold text-white mt-6 mb-4">Looking Ahead</h2>'
    );

  // Key takeaways data
  const keyTakeaways = [
    "Team Liquid's strategic preparation was key to their tournament victory",
    "Individual performances, especially from support players, created opportunities for the team",
    "The team has qualified for the world championship later this year",
    "Continued evolution of strategy will be necessary to maintain their competitive edge"
  ];

  // Author's latest articles
  const authorArticles = [
    {
      title: "The Evolution of Team Liquid's Drafting Strategy",
      date: "June 10, 2023",
      image: "https://placehold.co/100x100/3b0764/e9d5ff?text=Article"
    },
    {
      title: "Top 5 Support Players to Watch This Season",
      date: "June 5, 2023",
      image: "https://placehold.co/100x100/3b0764/e9d5ff?text=Article"
    },
    {
      title: "How the Meta Shift Affected Tournament Outcomes",
      date: "May 28, 2023",
      image: "https://placehold.co/100x100/3b0764/e9d5ff?text=Article"
    }
  ];

  // Upcoming matches data
  const upcomingMatches = [
    {
      time: "Today, 18:00 CEST",
      game: "Dota 2",
      team1: { name: "Team Liquid", logo: "https://placehold.co/30x30/3b0764/e9d5ff?text=TL" },
      team2: { name: "OG", logo: "https://placehold.co/30x30/3b0764/e9d5ff?text=OG" }
    },
    {
      time: "Tomorrow, 15:30 CEST",
      game: "Dota 2",
      team1: { name: "Evil Geniuses", logo: "https://placehold.co/30x30/3b0764/e9d5ff?text=EG" },
      team2: { name: "PSG.LGD", logo: "https://placehold.co/30x30/3b0764/e9d5ff?text=PSG" }
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Helmet>
        <title>{post.title} | Esports Daily</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero section with post image */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ad Banner 1: Horizontal banner below hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-8 relative z-20">
        <HorizontalAdBanner title="Featured Sponsor" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Post stats bar - views, reading time, etc. */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <StatsItem 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              text={`${post.views.toLocaleString()} views`}
            />
            <StatsItem 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
              text={`${post.comments} comments`}
            />
            <StatsItem 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              text={post.readTime}
            />
          </div>
          <div className="flex items-center">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save for later
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                {/* Category and date */}
                <div className="flex items-center mb-4">
                  <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center">
                    {post.date} • {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {post.title}
                </h1>

                {/* Author info */}
                <AuthorInfo author={post.author} />

                {/* Table of Contents */}
                <div className="my-8 p-4 bg-gray-800/90 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Table of Contents</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#strategic-brilliance" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Strategic Brilliance
                      </a>
                    </li>
                    <li>
                      <a href="#individual-performances" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Individual Performances
                      </a>
                    </li>
                    <li>
                      <a href="#looking-ahead" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Looking Ahead
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Content - first part */}
                <div className="mt-8 text-gray-300 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: firstContentPart }} />
                </div>

                {/* Ad Banner 2: Inline ad banner within content */}
                <InlineAdBanner title="Special Offer" />

                {/* Content - second part */}
                <div className="mt-4 text-gray-300 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: formattedSecondPart }} />
                </div>

                {/* Key Takeaways Section */}
                <div className="mt-8 p-5 bg-gray-800/90 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
                  <ul className="space-y-2">
                    {keyTakeaways.map((takeaway, index) => (
                      <KeyTakeawayItem key={index} text={takeaway} />
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <TagsSection tags={post.tags} />
                </div>

                {/* Author's Note */}
                <div className="mt-8 p-5 bg-gray-800/90 rounded-lg border border-purple-900/30">
                  <h3 className="text-lg font-semibold text-white mb-2">Author's Note</h3>
                  <p className="text-gray-300 text-sm italic">
                    This article is based on my observations during the tournament and post-match interviews. 
                    For more in-depth analysis of Team Liquid's strategies, check out my upcoming tactical breakdown video.
                  </p>
                  <div className="mt-3 flex">
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Subscribe to video series
                    </button>
                  </div>
                </div>

                {/* Ad Banner 3: Rectangle banner before share buttons */}
                <div className="mt-8">
                  <RectangleAdBanner title="Premium Content" />
                </div>

                {/* Share buttons */}
                <div className="mt-8 border-t border-gray-700 pt-6">
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </div>

            {/* Related Tournament Section */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Tournament Bracket</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-800/90 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Round</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team 1</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-300">Quarter-finals</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Team Liquid</td>
                        <td className="px-4 py-3 text-sm text-gray-300">2-0</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Fnatic</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="px-4 py-3 text-sm text-gray-300">Quarter-finals</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Evil Geniuses</td>
                        <td className="px-4 py-3 text-sm text-gray-300">2-1</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Team Secret</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-300">Semi-finals</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Team Liquid</td>
                        <td className="px-4 py-3 text-sm text-gray-300">2-1</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Evil Geniuses</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="px-4 py-3 text-sm text-gray-300">Semi-finals</td>
                        <td className="px-4 py-3 text-sm text-gray-300">PSG.LGD</td>
                        <td className="px-4 py-3 text-sm text-gray-300">2-0</td>
                        <td className="px-4 py-3 text-sm text-gray-300">OG</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-300">Finals</td>
                        <td className="px-4 py-3 text-sm font-medium text-purple-400">Team Liquid</td>
                        <td className="px-4 py-3 text-sm font-medium text-purple-400">3-1</td>
                        <td className="px-4 py-3 text-sm text-gray-300">PSG.LGD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-200">
                    View full tournament details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Comment section */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <CommentSection postId={post.id} commentCount={post.comments} />
              </div>
            </div>

            {/* Similar posts section */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <SimilarPostsSection posts={similarPosts} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Author's other articles */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">More from {post.author.name}</h3>
                <div className="space-y-4">
                  {authorArticles.map((article, index) => (
                    <RelatedArticle 
                      key={index}
                      image={article.image}
                      title={article.title}
                      date={article.date}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-200">
                    View all articles
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Ad Banner 4: Sidebar ad banner */}
            <div className="mb-8">
              <SidebarAdBanner title="Featured Game" />
            </div>

            {/* Upcoming matches */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Matches</h3>
                <div className="space-y-3">
                  {upcomingMatches.map((match, index) => (
                    <TournamentMatch 
                      key={index}
                      time={match.time}
                      game={match.game}
                      team1={match.team1}
                      team2={match.team2}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-200">
                    View full schedule
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Ad Banner 5: Rectangle ad banner in sidebar */}
            <div className="mb-8">
              <RectangleAdBanner title="Esports Gear" />
            </div>

            {/* Newsletter signup */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">Get the latest esports news and analysis delivered to your inbox.</p>
                <form className="space-y-3">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="consent" className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-500 rounded" />
                    <label htmlFor="consent" className="text-xs text-gray-400">I agree to receive emails about esports news and offers.</label>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Popular tags */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Dota 2</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">League of Legends</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">CS:GO</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Valorant</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Team Liquid</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Evil Geniuses</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Tournament</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Strategy</a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md text-sm transition-colors duration-200">Meta</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner 6: Sticky ad banner at the bottom */}
      <StickyAdBanner title="Community" />
    </div>
  );
}

export default BlogDetailPage;
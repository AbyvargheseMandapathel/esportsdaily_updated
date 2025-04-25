import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';
import { FaUsers } from 'react-icons/fa';

// Import our new components
import OrganizerHero from './common/OrganizerHero';
import OrganizerTabs from './common/OrganizerTabs';
import OrganizerAbout from './common/OrganizerAbout';
import OrganizerEvents from './common/OrganizerEvents';
import OrganizerContactSidebar from './common/OrganizerContactSidebar';

function OrganizerDetailPage() {
  const { slug } = useParams();
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchOrganizer = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            // Mock data for ESports Daily organizer
            if (slug === 'esports-daily') {
              resolve({
                id: 1,
                name: "ESports Daily",
                slug: "esports-daily",
                logo: "https://placehold.co/200/3b0764/e9d5ff?text=ESD",
                coverImage: "https://placehold.co/1200x400/3b0764/e9d5ff?text=ESports+Daily",
                description: "ESports Daily is a premier esports organization dedicated to hosting high-quality tournaments and scrims for various games. We focus on creating competitive environments for players of all skill levels.",
                longDescription: "Founded in 2020, ESports Daily has quickly established itself as a leading organizer in the Indian esports scene. Our mission is to provide players with professional tournament experiences and help grow the esports ecosystem in India. We specialize in mobile esports, particularly BGMI and Free Fire, but also host events for PC titles.\n\nOur team consists of experienced tournament administrators, content creators, and esports enthusiasts who are passionate about delivering the best competitive experience possible.",
                location: "Mumbai, India",
                founded: "2020",
                website: "https://esportsdaily.com",
                email: "contact@esportsdaily.com",
                twitter: "esportsdaily",
                discord: "discord.gg/esportsdaily",
                stats: {
                  tournamentsHosted: 45,
                  scrimsHosted: 120,
                  totalPrizePool: "₹25,00,000+",
                  totalParticipants: "5,000+"
                },
                upcomingEvents: [
                    {
                      id: 101,
                      title: "BGMI Pro League Season 3",
                      type: "tournament",
                      game: "BGMI",
                      startDate: "August 15, 2023",
                      endDate: "August 30, 2023",
                      prizePool: "₹15,00,000",
                      status: "Registration Open",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=BGMI+Pro+League"
                    },
                    {
                      id: 102,
                      title: "Free Fire Cup",
                      type: "tournament",
                      game: "Free Fire",
                      startDate: "September 5, 2023",
                      endDate: "September 12, 2023",
                      prizePool: "₹5,00,000",
                      status: "Coming Soon",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Free+Fire+Cup"
                    },
                    {
                      id: 103,
                      title: "Daily BGMI Scrims",
                      type: "scrim",
                      game: "BGMI",
                      startDate: "July 25, 2023",
                      endDate: "July 28, 2023",
                      prizePool: "₹50,000",
                      status: "Registration Open",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Daily+BGMI+Scrims"
                    }
                  ],
                  pastEvents: [
                    {
                      id: 201,
                      title: "BGMI Pro League Season 2",
                      type: "tournament",
                      game: "BGMI",
                      startDate: "May 10, 2023",
                      endDate: "May 25, 2023",
                      prizePool: "₹12,00,000",
                      winner: "Team SouL",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=BGMI+Pro+League+S2"
                    },
                    {
                      id: 202,
                      title: "Valorant Showdown",
                      type: "tournament",
                      game: "Valorant",
                      startDate: "April 5, 2023",
                      endDate: "April 12, 2023",
                      prizePool: "₹3,00,000",
                      winner: "Global Esports",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Valorant+Showdown"
                    },
                    {
                      id: 203,
                      title: "Weekly BGMI Scrims",
                      type: "scrim",
                      game: "BGMI",
                      startDate: "June 15, 2023",
                      endDate: "June 18, 2023",
                      prizePool: "₹25,000",
                      winner: "Team XSpark",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Weekly+BGMI+Scrims"
                    },
                    {
                      id: 204,
                      title: "Free Fire Tournament",
                      type: "tournament",
                      game: "Free Fire",
                      startDate: "March 1, 2023",
                      endDate: "March 10, 2023",
                      prizePool: "₹4,00,000",
                      winner: "Total Gaming",
                      image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Free+Fire+Tournament"
                    }
                  ]
              });
            } else {
              resolve(null);
            }
          }, 1000);
        });
        
        setOrganizer(response);
      } catch (err) {
        setError(err.message || "Failed to load organizer details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganizer();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading organizer details..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  // Not found state
  if (!organizer) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 text-center max-w-md">
          <FaUsers className="text-gray-600 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Organizer Not Found</h2>
          <p className="text-gray-400 mb-4">The organizer you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <OrganizerHero organizer={organizer} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-gray-800 rounded-t-lg overflow-hidden mb-6">
              <OrganizerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="p-6">
                {activeTab === 'about' && <OrganizerAbout organizer={organizer} />}
                
                {activeTab === 'upcoming' && (
                  <OrganizerEvents 
                    events={organizer.upcomingEvents} 
                    title="Upcoming Events" 
                    isPast={false} 
                  />
                )}
                
                {activeTab === 'past' && (
                  <OrganizerEvents 
                    events={organizer.pastEvents} 
                    title="Past Events" 
                    isPast={true} 
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80">
            <OrganizerContactSidebar organizer={organizer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerDetailPage;
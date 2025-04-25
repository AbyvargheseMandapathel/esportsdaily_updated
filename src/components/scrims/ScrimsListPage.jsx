import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ScrimCard from './common/ScrimCard';
import ScrimHero from './common/ScrimHero';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';

function ScrimsListPage() {
  const [scrims, setScrims] = useState({
    premium: [],
    featured: [],
    normal: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchScrims = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              premium: [
                {
                  id: 1,
                  title: "BGMI Pro Scrims Series",
                  game: "BGMI",
                  entryFee: "Free",
                  prizePool: "₹10,000",
                  startDate: "July 15, 2023",
                  endDate: "July 18, 2023",
                  time: "8:00 PM - 11:00 PM IST",
                  location: "Online",
                  slots: 20,
                  slotsRemaining: 8,
                  status: "Registration Open",
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=BGMI+Pro+Scrims",
                  organizer: "ESports Daily",
                  description: "Daily scrims for professional and semi-professional BGMI teams. Perfect practice environment with top-tier competition."
                },
                {
                  id: 2,
                  title: "Pokemon Unite Championship Practice",
                  game: "Pokemon Unite",
                  entryFee: "₹100",
                  prizePool: "₹5,000",
                  startDate: "July 20, 2023",
                  endDate: "July 22, 2023",
                  time: "7:00 PM - 10:00 PM IST",
                  location: "Online",
                  slots: 16,
                  slotsRemaining: 4,
                  status: "Registration Open",
                  image: "https://placehold.co/1200x400/172554/bae6fd?text=Pokemon+Unite+Scrims",
                  organizer: "Unite India",
                  description: "High-level practice scrims for Pokemon Unite teams preparing for upcoming tournaments. Structured format with professional casting."
                },
                {
                  id: 3,
                  title: "Indus Battle Royale Elite Scrims",
                  game: "Indus Battle Royale",
                  entryFee: "₹200",
                  prizePool: "₹15,000",
                  startDate: "July 25, 2023",
                  endDate: "July 28, 2023",
                  time: "9:00 PM - 12:00 AM IST",
                  location: "Online",
                  slots: 25,
                  slotsRemaining: 10,
                  status: "Registration Open",
                  image: "https://placehold.co/1200x400/422006/fef3c7?text=Indus+Battle+Royale+Scrims",
                  organizer: "Indus Esports",
                  description: "Premium practice environment for Indus Battle Royale teams. Custom lobbies with professional observers and post-match analysis."
                }
              ],
              featured: [
                {
                  id: 4,
                  title: "Free Fire Weekend Warriors",
                  game: "Free Fire",
                  entryFee: "Free",
                  prizePool: "₹2,000",
                  startDate: "July 22, 2023",
                  endDate: "July 23, 2023",
                  time: "6:00 PM - 9:00 PM IST",
                  location: "Online",
                  slots: 12,
                  slotsRemaining: 5,
                  status: "Registration Open",
                  image: "https://placehold.co/800x400/831843/fce7f3?text=Free+Fire+Scrims",
                  organizer: "FF Community",
                  description: "Weekend scrims for Free Fire teams of all skill levels. Great environment to practice strategies and improve team coordination."
                },
                {
                  id: 5,
                  title: "BGMI Tier 2 Practice Rooms",
                  game: "BGMI",
                  entryFee: "₹50",
                  prizePool: "₹1,000",
                  startDate: "July 19, 2023",
                  endDate: "July 19, 2023",
                  time: "7:00 PM - 10:00 PM IST",
                  location: "Online",
                  slots: 16,
                  slotsRemaining: 6,
                  status: "Registration Open",
                  image: "https://placehold.co/800x400/3b0764/e9d5ff?text=BGMI+T2+Scrims",
                  organizer: "BGMI Practice Hub",
                  description: "Daily practice rooms for tier 2 and emerging BGMI teams. Structured format with point system similar to official tournaments."
                },
                {
                  id: 6,
                  title: "Pokemon Unite Casual Scrims",
                  game: "Pokemon Unite",
                  entryFee: "Free",
                  prizePool: "₹500",
                  startDate: "July 21, 2023",
                  endDate: "July 21, 2023",
                  time: "8:00 PM - 10:00 PM IST",
                  location: "Online",
                  slots: 8,
                  slotsRemaining: 3,
                  status: "Registration Open",
                  image: "https://placehold.co/800x400/172554/bae6fd?text=Pokemon+Unite+Casual",
                  organizer: "Unite Beginners",
                  description: "Casual scrims for Pokemon Unite teams looking to improve. All skill levels welcome with constructive feedback provided."
                }
              ],
              normal: [
                {
                  id: 7,
                  title: "Indus BR Daily Practice",
                  game: "Indus Battle Royale",
                  entryFee: "Free",
                  prizePool: "None",
                  startDate: "July 18, 2023",
                  endDate: "July 18, 2023",
                  time: "9:00 PM - 11:00 PM IST",
                  location: "Online",
                  slots: 20,
                  slotsRemaining: 15,
                  status: "Registration Open",
                  image: "https://placehold.co/600x300/422006/fef3c7?text=Indus+Daily",
                  organizer: "Indus Community",
                  description: "Daily practice lobbies for Indus Battle Royale players of all skill levels."
                },
                {
                  id: 8,
                  title: "Free Fire Beginners Lobby",
                  game: "Free Fire",
                  entryFee: "Free",
                  prizePool: "None",
                  startDate: "July 20, 2023",
                  endDate: "July 20, 2023",
                  time: "6:00 PM - 8:00 PM IST",
                  location: "Online",
                  slots: 12,
                  slotsRemaining: 8,
                  status: "Registration Open",
                  image: "https://placehold.co/600x300/831843/fce7f3?text=FF+Beginners",
                  organizer: "FF Learning Hub",
                  description: "Beginner-friendly scrims for new Free Fire teams looking to improve."
                },
                {
                  id: 9,
                  title: "BGMI Morning Practice",
                  game: "BGMI",
                  entryFee: "Free",
                  prizePool: "None",
                  startDate: "July 19, 2023",
                  endDate: "July 19, 2023",
                  time: "10:00 AM - 12:00 PM IST",
                  location: "Online",
                  slots: 16,
                  slotsRemaining: 10,
                  status: "Registration Open",
                  image: "https://placehold.co/600x300/3b0764/e9d5ff?text=BGMI+Morning",
                  organizer: "Early Birds BGMI",
                  description: "Morning practice sessions for BGMI teams. Perfect for teams with evening commitments."
                },
                {
                  id: 10,
                  title: "Pokemon Unite Team Finder Scrims",
                  game: "Pokemon Unite",
                  entryFee: "Free",
                  prizePool: "None",
                  startDate: "July 22, 2023",
                  endDate: "July 22, 2023",
                  time: "5:00 PM - 7:00 PM IST",
                  location: "Online",
                  slots: 10,
                  slotsRemaining: 7,
                  status: "Registration Open",
                  image: "https://placehold.co/600x300/172554/bae6fd?text=Unite+Team+Finder",
                  organizer: "Unite Connect",
                  description: "Scrims designed to help solo players find teams and practice together."
                }
              ]
            });
          }, 1000);
        });
        
        setScrims(response);
      } catch (err) {
        setError(err.message || "Failed to load scrims");
      } finally {
        setLoading(false);
      }
    };
    
    fetchScrims();
  }, []);

  // Handle carousel navigation for premium scrims
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === scrims.premium.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? scrims.premium.length - 1 : prev - 1));
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading scrims..." />
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

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Premium Scrims Carousel */}
      {scrims.premium.length > 0 && (
        <div className="relative">
          {scrims.premium.map((scrim, index) => (
            <div
              key={scrim.id}
              className={`transition-opacity duration-500 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              style={{ display: index === activeSlide ? 'block' : 'none' }}
            >
              <ScrimHero scrim={scrim} />
            </div>
          ))}
          
          {/* Carousel Controls */}
          {scrims.premium.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hover:bg-black/70 transition-colors"
                aria-label="Next slide"
              >
                <FaChevronRight size={24} />
              </button>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {scrims.premium.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Scrims */}
        {scrims.featured.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-purple-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Featured Scrims</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scrims.featured.map(scrim => (
                <ScrimCard key={scrim.id} scrim={scrim} />
              ))}
            </div>
          </div>
        )}

        {/* Normal Scrims */}
        {scrims.normal.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-gray-400 mr-2" />
              <h2 className="text-2xl font-bold text-white">All Scrims</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scrims.normal.map(scrim => (
                <ScrimCard key={scrim.id} scrim={scrim} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* No Scrims Message */}
        {scrims.premium.length === 0 && scrims.featured.length === 0 && scrims.normal.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <FaShieldAlt className="text-gray-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Scrims Available</h2>
            <p className="text-gray-400">There are no scrims scheduled at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrimsListPage;
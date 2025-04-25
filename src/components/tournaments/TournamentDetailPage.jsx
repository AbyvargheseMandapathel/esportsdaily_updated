import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
// Import the reusable components
import TournamentLayout from './common/TournamentLayout';
import TournamentHero from './common/TournamentHero';
import TournamentAbout from './common/TournamentAbout';
import TournamentInfoSidebar from './common/TournamentInfoSidebar';
import TournamentSocialLinks from './common/TournamentSocialLinks';
import TournamentRegistrationCTA from './common/TournamentRegistrationCTA';
import TournamentRegistrationModal from './common/TournamentRegistrationModal';

function TournamentDetailPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            // Find tournament by ID from a mock dataset
            const mockTournaments = [
                {
                  id: "1",
                  title: "The International 2023",
                  game: "Dota 2",
                  prizePool: "$40,000,000",
                  startDate: "October 12, 2023",
                  endDate: "October 29, 2023",
                  location: "Seattle, USA",
                  venue: "Climate Pledge Arena",
                  teams: 18,
                  status: "Upcoming",
                  registrationOpen: true,
                  registrationDeadline: "September 15, 2023",
                  ticketsAvailable: true,
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=The+International+2023",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=TI",
                  organizer: "Valve Corporation",
                  description: "The biggest Dota 2 tournament of the year, featuring the world's top teams competing for the Aegis of Champions.",
                  longDescription: "The International is the pinnacle of the Dota 2 competitive scene, featuring the world's best teams competing for the largest prize pool in esports. The tournament features a group stage followed by a double-elimination playoff bracket. Teams qualify through the Dota Pro Circuit or regional qualifiers, with the final teams battling it out on the main stage for the Aegis of Champions.",
                  format: "Group Stage into Double Elimination Bracket",
                  schedule: [
                    { date: "October 12-15, 2023", stage: "Group Stage", description: "18 teams divided into two groups of nine teams each" },
                    { date: "October 17-20, 2023", stage: "Main Event (Early Rounds)", description: "Double elimination bracket matches" },
                    { date: "October 21-22, 2023", stage: "Main Event (Semifinals)", description: "Upper and Lower Bracket Semifinals" },
                    { date: "October 28, 2023", stage: "Lower Bracket Final", description: "Best of 3 series" },
                    { date: "October 29, 2023", stage: "Grand Final", description: "Best of 5 series" }
                  ],
                  participants: [
                    { name: "Team Liquid", region: "Europe", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Liquid" },
                    { name: "PSG.LGD", region: "China", logo: "https://placehold.co/100/3b0764/e9d5ff?text=PSG.LGD" },
                    { name: "Evil Geniuses", region: "North America", logo: "https://placehold.co/100/3b0764/e9d5ff?text=EG" },
                    { name: "OG", region: "Europe", logo: "https://placehold.co/100/3b0764/e9d5ff?text=OG" },
                    { name: "Team Spirit", region: "Eastern Europe", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Spirit" },
                    { name: "Tundra Esports", region: "Europe", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Tundra" }
                  ],
                  socialLinks: {
                    website: "https://www.dota2.com/international",
                    twitter: "https://twitter.com/DOTA2",
                    twitch: "https://www.twitch.tv/dota2ti",
                    youtube: "https://www.youtube.com/user/dota2"
                  },
                  previousWinners: [
                    { year: 2022, team: "Tundra Esports", prize: "$8,500,000" },
                    { year: 2021, team: "Team Spirit", prize: "$18,200,000" },
                    { year: 2019, team: "OG", prize: "$15,600,000" }
                  ]
                },
                {
                  id: "2",
                  title: "League of Legends World Championship",
                  game: "League of Legends",
                  prizePool: "$2,500,000",
                  startDate: "September 25, 2023",
                  endDate: "November 4, 2023",
                  location: "Seoul, South Korea",
                  venue: "Gocheok Sky Dome",
                  teams: 24,
                  status: "Upcoming",
                  registrationOpen: false,
                  ticketsAvailable: true,
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=LoL+Worlds+2023",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=Worlds",
                  organizer: "Riot Games",
                  description: "The pinnacle of League of Legends esports, where regional champions compete for the Summoner's Cup.",
                  longDescription: "The League of Legends World Championship is the annual professional League of Legends tournament hosted by Riot Games. Teams compete for the champion title, the 70-pound Summoner's Cup, and a multi-million-dollar prize. The tournament has gained tremendous popularity and is now one of the world's most prestigious and watched tournaments.",
                  format: "Play-In Stage, Group Stage, Knockout Stage",
                  schedule: [
                    { date: "September 25-30, 2023", stage: "Play-In Stage", description: "12 teams compete for 4 spots in the Group Stage" },
                    { date: "October 5-16, 2023", stage: "Group Stage", description: "16 teams divided into four groups of four" },
                    { date: "October 19-22, 2023", stage: "Quarterfinals", description: "Best of 5 series" },
                    { date: "October 28-29, 2023", stage: "Semifinals", description: "Best of 5 series" },
                    { date: "November 4, 2023", stage: "Finals", description: "Best of 5 series" }
                  ],
                  participants: [
                    { name: "T1", region: "Korea", logo: "https://placehold.co/100/3b0764/e9d5ff?text=T1" },
                    { name: "JD Gaming", region: "China", logo: "https://placehold.co/100/3b0764/e9d5ff?text=JDG" },
                    { name: "G2 Esports", region: "Europe", logo: "https://placehold.co/100/3b0764/e9d5ff?text=G2" },
                    { name: "Cloud9", region: "North America", logo: "https://placehold.co/100/3b0764/e9d5ff?text=C9" }
                  ],
                  socialLinks: {
                    website: "https://lolesports.com/worlds",
                    twitter: "https://twitter.com/lolesports",
                    twitch: "https://www.twitch.tv/riotgames",
                    youtube: "https://www.youtube.com/lolesports"
                  },
                  previousWinners: [
                    { year: 2022, team: "DRX", prize: "$489,500" },
                    { year: 2021, team: "EDward Gaming", prize: "$489,500" },
                    { year: 2020, team: "DAMWON Gaming", prize: "$556,000" }
                  ]
                }
              ];
            
            const foundTournament = mockTournaments.find(t => t.id === id);
            
            if (foundTournament) {
              resolve(foundTournament);
            } else {
              throw new Error("Tournament not found");
            }
          }, 800);
        });
        
        setTournament(response);
      } catch (err) {
        console.error("Error fetching tournament:", err);
        setError(err.message || "Failed to load tournament details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false);
  };

  const handleRegisterSubmit = (formData) => {
    console.log('Registration submitted:', formData);
    // Here you would typically send the data to your API
    setShowRegisterModal(false);
    // You could also show a success message or notification
  };

  // Create a schedule component for MOBA tournaments
  const TournamentSchedule = ({ tournament }) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">Tournament Schedule</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-600"></div>
        <div className="space-y-6">
          {tournament.schedule.map((item, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute left-0 top-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <FaClock className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.stage}</h3>
                <p className="text-purple-400 text-sm mb-1">{item.date}</p>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Create a participants component for MOBA tournaments
  const TournamentParticipants = ({ tournament }) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">Participating Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tournament.participants.map((team, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-start">
            <div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{team.name}</h3>
              <p className="text-gray-400 text-sm">{team.region}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Create a previous winners component for MOBA tournaments
  const TournamentPreviousWinners = ({ tournament }) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">Previous Champions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Year</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Champion</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Prize</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tournament.previousWinners.map((winner, index) => (
              <tr key={index} className="hover:bg-gray-700/50">
                <td className="py-3 px-4 text-white">{winner.year}</td>
                <td className="py-3 px-4 text-white">{winner.team}</td>
                <td className="py-3 px-4 text-white">{winner.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <TournamentLayout 
        tournament={tournament} 
        loading={loading} 
        error={error}
        leftColumn={
          <>
            {/* Registration CTA Banner - Only show for tournaments with open registration */}
            {tournament && tournament.registrationOpen && (
              <TournamentRegistrationCTA 
                tournament={tournament} 
                onRegisterClick={handleRegisterClick} 
                variant="banner" 
              />
            )}
            
            {/* About Section */}
            <TournamentAbout tournament={tournament} />
            
            {/* Schedule Section */}
            {tournament && tournament.schedule && (
              <TournamentSchedule tournament={tournament} />
            )}
            
            {/* Participants Section */}
            {tournament && tournament.participants && (
              <TournamentParticipants tournament={tournament} />
            )}
            
            {/* Previous Winners Section */}
            {tournament && tournament.previousWinners && (
              <TournamentPreviousWinners tournament={tournament} />
            )}
          </>
        }
        rightColumn={
          <>
            {/* Registration CTA Sidebar - Only show for tournaments with open registration */}
            {tournament && tournament.registrationOpen && (
              <TournamentRegistrationCTA 
                tournament={tournament} 
                onRegisterClick={handleRegisterClick} 
              />
            )}
            
            {/* Tournament Info */}
            <TournamentInfoSidebar tournament={tournament} />
            
            {/* Social Links */}
            <TournamentSocialLinks socialLinks={tournament?.socialLinks} />
          </>
        }
      >
        {/* Hero Section */}
        <TournamentHero tournament={tournament} />
      </TournamentLayout>

      {/* Registration Modal */}
      {tournament && (
        <TournamentRegistrationModal
          isOpen={showRegisterModal}
          onClose={handleCloseModal}
          onSubmit={handleRegisterSubmit}
          tournament={tournament}
        />
      )}
    </>
  );
}

export default TournamentDetailPage;
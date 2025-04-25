import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import the reusable components
import TournamentLayout from './common/TournamentLayout';
import TournamentHero from './common/TournamentHero';
import TournamentAbout from './common/TournamentAbout';
import TournamentTabs from './common/TournamentTabs';
import TournamentInfoSidebar from './common/TournamentInfoSidebar';
import TournamentSocialLinks from './common/TournamentSocialLinks';
import TournamentRegistrationCTA from './common/TournamentRegistrationCTA';
import TournamentRegistrationModal from './common/TournamentRegistrationModal';
import TournamentRegistrationBanner from './common/TournamentRegistrationBanner';

function BRTournamentDetailPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
                  title: "BGMI Pro League Season 5",
                  game: "BGMI",
                  tournamentType: "entryForAll", // New field: invited or entryForAll
                  prizePool: "$100,000",
                  prizeDistribution: [
                    { position: "1st", prize: "$40,000" },
                    { position: "2nd", prize: "$20,000" },
                    { position: "3rd", prize: "$10,000" },
                    { position: "4th", prize: "$8,000" },
                    { position: "5th", prize: "$6,000" },
                    { position: "6th-10th", prize: "$3,200 each" }
                  ],
                  pointsSystem: [
                    { action: "Victory Royale", points: 15 },
                    { action: "2nd Place", points: 12 },
                    { action: "3rd Place", points: 10 },
                    { action: "4th Place", points: 8 },
                    { action: "5th Place", points: 6 },
                    { action: "6th-10th Place", points: 4 },
                    { action: "11th-15th Place", points: 2 },
                    { action: "Each Elimination", points: 1 }
                  ],
                  startDate: "August 15, 2023",
                  endDate: "September 5, 2023",
                  location: "Mumbai, India",
                  venue: "Dome Arena",
                  teams: 20,
                  status: "Upcoming",
                  registrationOpen: true, // Invited tournaments don't need registration
                  registrationDeadline: "",
                  ticketsAvailable: false,
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=BGMI+Pro+League",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=BGMI",
                  organizer: "Krafton Inc.",
                  description: "The premier BGMI tournament featuring the top 20 invited teams from across India.",
                  longDescription: "The BGMI Pro League is the most prestigious Battlegrounds Mobile India tournament, featuring the top 20 invited professional teams from across the country. Teams will compete in a series of matches across multiple days to determine the champion. The tournament features a round-robin format followed by a grand finals weekend with the top performing teams.",
                  format: "Round Robin followed by Grand Finals",
                  rules: [
                    "All matches will be played on Erangel and Miramar maps",
                    "Teams must be present 30 minutes before their scheduled match time",
                    "Substitutes must be registered before the tournament begins",
                    "Any form of cheating will result in immediate disqualification",
                    "Tournament admins have final say on all disputes",
                    "Stream sniping is strictly prohibited",
                    "All players must use tournament-provided equipment",
                    "Teams must maintain proper sportsmanship throughout the event"
                  ],
                  schedule: [
                    { date: "August 15-20, 2023", stage: "Group Stage", description: "20 teams compete in round-robin format" },
                    { date: "August 25-27, 2023", stage: "Semifinals", description: "Top 16 teams advance" },
                    { date: "September 2-5, 2023", stage: "Grand Finals", description: "Top 8 teams compete for the championship" }
                  ],
                  participants: [
                    { name: "Team Soul", region: "North India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Soul" },
                    { name: "Team XSpark", region: "South India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=XSpark" },
                    { name: "GodLike Esports", region: "West India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=GodLike" },
                    { name: "Team IND", region: "East India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=IND" },
                    { name: "Orange Rock", region: "North India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=OR" },
                    { name: "Team Fnatic", region: "South India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Fnatic" }
                  ],
                  invitedTeams: [
                    { name: "Team Soul", region: "North India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Soul", achievements: "BGMI Masters Series 2022 Champions" },
                    { name: "Team XSpark", region: "South India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=XSpark", achievements: "BMPS Season 1 Champions" },
                    { name: "GodLike Esports", region: "West India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=GodLike", achievements: "BGIS 2021 Runner-up" },
                    { name: "Team IND", region: "East India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=IND", achievements: "BMOC 2022 Champions" },
                    { name: "Orange Rock", region: "North India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=OR", achievements: "PMWL East 2020 Runner-up" },
                    { name: "Team Fnatic", region: "South India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=Fnatic", achievements: "PMIS 2020 Champions" }
                  ],
                  socialLinks: {
                    website: "https://www.battlegroundsmobileindia.com",
                    twitter: "https://twitter.com/BGMI_Official",
                    youtube: "https://www.youtube.com/BattlegroundsMobileIndiaOfficial"
                  },
                  previousWinners: [
                    { year: 2022, team: "Team Soul", prize: "$40,000" },
                    { year: 2021, team: "GodLike Esports", prize: "$35,000" },
                    { year: 2020, team: "Orange Rock", prize: "$30,000" }
                  ]
                },
                {
                  id: "2",
                  title: "PUBG Mobile Open Championship",
                  game: "PUBG Mobile",
                  tournamentType: "entryForAll", // Open tournament
                  prizePool: "$50,000",
                  prizeDistribution: [
                    { position: "1st", prize: "$20,000" },
                    { position: "2nd", prize: "$10,000" },
                    { position: "3rd", prize: "$5,000" },
                    { position: "4th", prize: "$3,000" },
                    { position: "5th", prize: "$2,000" },
                    { position: "6th-10th", prize: "$2,000 (split)" }
                  ],
                  pointsSystem: [
                    { action: "Victory Royale", points: 15 },
                    { action: "2nd Place", points: 12 },
                    { action: "3rd Place", points: 10 },
                    { action: "4th Place", points: 8 },
                    { action: "5th Place", points: 6 },
                    { action: "6th-10th Place", points: 4 },
                    { action: "11th-15th Place", points: 2 },
                    { action: "Each Elimination", points: 1 }
                  ],
                  startDate: "October 10, 2023",
                  endDate: "November 15, 2023",
                  location: "Delhi, India",
                  venue: "IGX Arena",
                  teams: 100,
                  status: "Upcoming",
                  registrationOpen: true,
                  registrationDeadline: "September 30, 2023",
                  ticketsAvailable: true,
                  image: "https://placehold.co/1200x400/3b0764/e9d5ff?text=PUBG+Mobile+Open",
                  logo: "https://placehold.co/200/3b0764/e9d5ff?text=PUBGM",
                  organizer: "Tencent Games",
                  description: "An open championship for all PUBG Mobile players with qualifiers and finals.",
                  longDescription: "The PUBG Mobile Open Championship is an inclusive tournament open to all players. Starting with online qualifiers, teams will battle through multiple stages to reach the grand finals. This tournament aims to discover new talent and provide a platform for amateur teams to showcase their skills alongside established professionals.",
                  format: "Open Qualifiers, Group Stage, Finals",
                  rules: [
                    "All participants must be at least 16 years old",
                    "Teams must consist of 4 players and up to 1 substitute",
                    "All matches will be played on the latest version of PUBG Mobile",
                    "Participants must use their own devices",
                    "Emulators are not allowed",
                    "Any form of cheating will result in permanent ban",
                    "Tournament officials' decisions are final",
                    "Teams must check in 30 minutes before their scheduled matches"
                  ],
                  schedule: [
                    { date: "October 10-20, 2023", stage: "Online Qualifiers", description: "Open registration, top 50 teams advance" },
                    { date: "October 25-30, 2023", stage: "Group Stage", description: "50 teams divided into 5 groups" },
                    { date: "November 5-10, 2023", stage: "Semifinals", description: "Top 25 teams compete" },
                    { date: "November 15, 2023", stage: "Grand Finals", description: "Top 16 teams battle for the championship" }
                  ],
                  participants: [
                    { name: "Team Insidious", region: "North India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=INS" },
                    { name: "Team Mayhem", region: "South India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=MYM" },
                    { name: "Team Entity", region: "West India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=ETG" },
                    { name: "Team Celtz", region: "East India", logo: "https://placehold.co/100/3b0764/e9d5ff?text=CLZ" }
                  ],
                  registeredTeams: [
                    { name: "Team Insidious", region: "North India", registrationDate: "August 15, 2023" },
                    { name: "Team Mayhem", region: "South India", registrationDate: "August 16, 2023" },
                    { name: "Team Entity", region: "West India", registrationDate: "August 17, 2023" },
                    { name: "Team Celtz", region: "East India", registrationDate: "August 18, 2023" },
                    { name: "Team VSG", region: "North India", registrationDate: "August 19, 2023" },
                    { name: "Team Reckoning", region: "South India", registrationDate: "August 20, 2023" },
                    { name: "Team 8Bit", region: "West India", registrationDate: "August 21, 2023" },
                    { name: "Team Hydra", region: "East India", registrationDate: "August 22, 2023" }
                  ],
                  socialLinks: {
                    website: "https://www.pubgmobile.com",
                    twitter: "https://twitter.com/PUBGMOBILE",
                    youtube: "https://www.youtube.com/PUBGMobile"
                  },
                  previousWinners: [
                    { year: 2022, team: "Team Entity", prize: "$20,000" },
                    { year: 2021, team: "Team Insidious", prize: "$15,000" },
                    { year: 2020, team: "Team Mayhem", prize: "$10,000" }
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

  return (
    <>
      <TournamentLayout 
        tournament={tournament} 
        loading={loading} 
        error={error}
        leftColumn={
          <>
            {/* Registration Banner Component */}
            <TournamentRegistrationBanner 
              tournament={tournament} 
              onRegisterClick={handleRegisterClick} 
            />
            
            {/* Tournament Tabs */}
            <TournamentTabs 
              tournament={tournament} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
            
            {/* About Section */}
            <TournamentAbout tournament={tournament} />
          </>
        }
        rightColumn={
          <>
            {/* Registration CTA Sidebar - Only show for entryForAll tournaments */}
            {tournament && tournament.tournamentType === "entryForAll" && tournament.registrationOpen && (
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

      {/* Registration Modal - Only render for entryForAll tournaments */}
      {tournament && tournament.tournamentType === "entryForAll" && (
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

export default BRTournamentDetailPage;
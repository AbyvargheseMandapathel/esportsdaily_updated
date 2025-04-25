import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import BlogDetailPage from './components/blog/BlogDetailPage';
import NewsListPage from './components/blog/NewsListPage';
import TournamentListPage from './components/tournaments/TournamentListPage';
import TournamentDetailPage from './components/tournaments/TournamentDetailPage';
import BRTournamentDetailPage from './components/tournaments/BRTournamentDetailPage';
import LiveTournamentsPage from './components/tournaments/LiveTournamentsPage';
import ScoreEntryPage from './components/tournaments/match/ScoreEntryPage';
import GameListPage from './components/games/GameListPage';
import GameDetailPage from './components/games/GameDetailPage';
import ScrimsListPage from './components/scrims/ScrimsListPage';
import ScrimDetailPage from './components/scrims/ScrimDetailPage';
import OrganizerDetailPage from './components/organizers/OrganizerDetailPage';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main App Routes (with Navbar and Footer) */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<NewsSection />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/news" element={<NewsListPage />} />
                <Route path="/tournaments" element={<TournamentListPage />} />
                <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
                <Route path="/tournaments/br/:id" element={<BRTournamentDetailPage />} />
                <Route path="/live" element={<LiveTournamentsPage />} />
                <Route path="/match/:matchId/score" element={<ScoreEntryPage />} />
                <Route path="/games" element={<GameListPage />} />
                <Route path="/games/:id" element={<GameDetailPage />} />
                <Route path="/organizers/:slug" element={<OrganizerDetailPage />} />
                <Route path="/scrims" element={<ScrimsListPage />} />
                <Route path="/scrims/:id" element={<ScrimDetailPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes (with separate layout) */}
        <Route path="dashboard/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import AdminSidebar from './common/AdminSidebar';
import AdminHeader from './common/AdminHeader';
import AdminDashboard from './AdminDashboard';
import TournamentsManagement from './sections/TournamentsManagement';
import ScrimsManagement from './sections/ScrimsManagement';
import OrganizersManagement from './sections/OrganizersManagement';
import UsersManagement from './sections/UsersManagement';
import GamesManagement from './sections/GamesManagement';
import SettingsPanel from './sections/SettingsPanel';

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual auth check
  const [activeSection, setActiveSection] = useState('overview');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="tournaments" element={<TournamentsManagement />} />
            <Route path="scrims" element={<ScrimsManagement />} />
            <Route path="organizers" element={<OrganizersManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="games" element={<GamesManagement />} />
            <Route path="settings" element={<SettingsPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
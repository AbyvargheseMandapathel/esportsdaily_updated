import React from 'react';
import { FaPlus } from 'react-icons/fa';
import AdminPageHeader from './common/AdminPageHeader';
import StatCards from './dashboard/StatCards';
import UserGrowthChart from './dashboard/UserGrowthChart';
import RecentActivitiesList from './dashboard/RecentActivitiesList';
import UpcomingEventsTable from './dashboard/UpcomingEventsTable';
import QuickActionCards from './dashboard/QuickActionCards';

function AdminDashboard() {
  return (
    <div>
      <AdminPageHeader 
        title="Admin Dashboard" 
        description="Overview of your esports platform" 
        actionButton={{
          label: "Create Report",
          icon: <FaPlus />,
          onClick: () => console.log("Create report clicked")
        }}
      />

      {/* Stats Grid */}
      <StatCards />

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2">
          <UserGrowthChart />
        </div>

        {/* Recent Activities */}
        <div>
          <RecentActivitiesList />
        </div>
      </div>

      {/* Upcoming Events */}
      <UpcomingEventsTable />

      {/* Quick Actions */}
      <QuickActionCards />
    </div>
  );
}

export default AdminDashboard;
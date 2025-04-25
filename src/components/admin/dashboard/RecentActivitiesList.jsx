import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import ActivityItem from './ActivityItem';

function RecentActivitiesList() {
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: "User Registration",
      subject: "Rahul Sharma",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      action: "Tournament Created",
      subject: "BGMI Weekly Cup",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      action: "Game Added",
      subject: "Call of Duty Mobile",
      timestamp: "1 day ago"
    },
    {
      id: 4,
      action: "Organizer Approved",
      subject: "GamersHub India",
      timestamp: "2 days ago"
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 h-full">
      <h3 className="text-lg font-medium text-white mb-6">Recent Activities</h3>
      <div className="space-y-4">
        {recentActivities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default RecentActivitiesList;
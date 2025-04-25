import React from 'react';
import { Link } from 'react-router-dom';

function UpcomingEventsTable() {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "BGMI Pro League Season 3",
      date: "Aug 15, 2023",
      type: "Tournament",
      teams: 24
    },
    {
      id: 2,
      title: "Valorant Daily Scrims",
      date: "Aug 10, 2023",
      type: "Scrim",
      teams: 8
    },
    {
      id: 3,
      title: "Free Fire Championship",
      date: "Aug 20, 2023",
      type: "Tournament",
      teams: 16
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
      <h3 className="text-lg font-medium text-white mb-6">Upcoming Events</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Teams</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {upcomingEvents.map(event => (
              <tr key={event.id} className="hover:bg-gray-700/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.teams}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/dashboard/admin/${event.type.toLowerCase()}s/${event.id}`} className="text-purple-400 hover:text-purple-300 transition-colors duration-150">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpcomingEventsTable;
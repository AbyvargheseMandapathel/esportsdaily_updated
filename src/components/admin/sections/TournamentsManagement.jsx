import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import AdminTable from '../common/AdminTable';
import AdminPageHeader from '../common/AdminPageHeader';

function TournamentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for tournaments
  const tournaments = [
    {
      id: 1,
      title: "The International 2023",
      game: "Dota 2",
      organizer: "Valve Corporation",
      startDate: "October 12, 2023",
      endDate: "October 29, 2023",
      status: "Upcoming",
      teams: 18,
      prizePool: "$40,000,000"
    },
    // ... existing tournament data ...
  ];

  // Filter tournaments based on search term and status filter
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || tournament.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Table columns configuration
  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Game', accessor: 'game' },
    { header: 'Organizer', accessor: 'organizer' },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (value) => {
        let statusConfig = {
          'Active': { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-600/30' },
          'Upcoming': { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
          'Completed': { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-600/30' }
        };
        
        const config = statusConfig[value] || { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-600/30' };
        
        return (
          <span className={`${config.bg} ${config.text} ${config.border} text-xs px-3 py-1.5 rounded-full border font-medium`}>
            {value}
          </span>
        );
      }
    },
    { header: 'Teams', accessor: 'teams' },
    { header: 'Prize Pool', accessor: 'prizePool' },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value) => (
        <div className="flex space-x-3">
          <button className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 rounded-lg hover:bg-blue-400/20 transition-all duration-200">
            <FaEye />
          </button>
          <button className="p-1.5 text-green-400 hover:text-green-300 bg-green-400/10 rounded-lg hover:bg-green-400/20 transition-all duration-200">
            <FaEdit />
          </button>
          <button className="p-1.5 text-red-400 hover:text-red-300 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-all duration-200">
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="tournaments-management">
      <style jsx>{`
        .tournaments-management {
          /* Custom scrollbar styling */
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(31, 41, 55, 0.5);
        }
        
        /* For Webkit browsers like Chrome/Safari */
        .tournaments-management ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .tournaments-management ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        
        .tournaments-management ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        
        .tournaments-management ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
      
      <AdminPageHeader 
        title="Tournaments Management" 
        description="Create, edit, and manage tournaments"
        actionButton={{
          label: "Create Tournament",
          icon: <FaPlus />,
          onClick: () => console.log("Create tournament clicked")
        }}
      />
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700/50 text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl px-4 py-2 border border-gray-700">
          <FaFilter className="text-purple-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent text-white focus:outline-none"
          >
            <option value="all" className="bg-gray-800">All Status</option>
            <option value="active" className="bg-gray-800">Active</option>
            <option value="upcoming" className="bg-gray-800">Upcoming</option>
            <option value="completed" className="bg-gray-800">Completed</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
        <AdminTable 
          columns={columns} 
          data={filteredTournaments} 
          emptyMessage="No tournaments found"
        />
      </div>
    </div>
  );
}

export default TournamentsManagement;
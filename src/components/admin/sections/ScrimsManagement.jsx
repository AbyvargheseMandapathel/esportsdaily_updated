import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import AdminTable from '../common/AdminTable';
import AdminPageHeader from '../common/AdminPageHeader';

function ScrimsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for scrims
  const scrims = [
    {
      id: 1,
      title: "Daily BGMI Scrims",
      game: "BGMI",
      organizer: "ESports Daily",
      startDate: "July 25, 2023",
      endDate: "July 28, 2023",
      status: "Active",
      teams: 16,
      prizePool: "₹50,000"
    },
    {
      id: 2,
      title: "Valorant Practice Scrims",
      game: "Valorant",
      organizer: "ESports Daily",
      startDate: "August 5, 2023",
      endDate: "August 7, 2023",
      status: "Upcoming",
      teams: 8,
      prizePool: "₹25,000"
    },
    {
      id: 3,
      title: "Weekly BGMI Scrims",
      game: "BGMI",
      organizer: "ESports Daily",
      startDate: "June 15, 2023",
      endDate: "June 18, 2023",
      status: "Completed",
      teams: 16,
      prizePool: "₹25,000"
    },
    {
      id: 4,
      title: "Free Fire Daily Scrims",
      game: "Free Fire",
      organizer: "ESports Daily",
      startDate: "July 30, 2023",
      endDate: "August 2, 2023",
      status: "Upcoming",
      teams: 12,
      prizePool: "₹20,000"
    },
    {
      id: 5,
      title: "COD Mobile Practice",
      game: "COD Mobile",
      organizer: "ESports Daily",
      startDate: "July 20, 2023",
      endDate: "July 22, 2023",
      status: "Completed",
      teams: 10,
      prizePool: "₹15,000"
    }
  ];

  // Filter scrims based on search term and status filter
  const filteredScrims = scrims.filter(scrim => {
    const matchesSearch = scrim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scrim.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scrim.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || scrim.status.toLowerCase() === filterStatus.toLowerCase();
    
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
        let bgColor = 'bg-gray-600';
        if (value === 'Active') bgColor = 'bg-green-600';
        if (value === 'Upcoming') bgColor = 'bg-blue-600';
        if (value === 'Completed') bgColor = 'bg-purple-600';
        
        return (
          <span className={`${bgColor} text-white text-xs px-2 py-1 rounded-full`}>
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
        <div className="flex space-x-2">
          <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
            <FaEye />
          </button>
          <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
            <FaEdit />
          </button>
          <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <AdminPageHeader 
        title="Scrims Management" 
        description="Create, edit, and manage scrims"
        actionButton={{
          label: "Create Scrim",
          icon: <FaPlus />,
          onClick: () => console.log("Create scrim clicked")
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
            placeholder="Search scrims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <AdminTable 
        columns={columns} 
        data={filteredScrims} 
        emptyMessage="No scrims found"
      />
    </div>
  );
}

export default ScrimsManagement;
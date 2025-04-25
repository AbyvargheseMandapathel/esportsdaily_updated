import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import AdminTable from '../common/AdminTable';
import AdminPageHeader from '../common/AdminPageHeader';

function GamesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  
  // Mock data for games
  const games = [
    {
      id: 1,
      title: "BGMI",
      fullTitle: "Battlegrounds Mobile India",
      image: "https://placehold.co/200/3b0764/e9d5ff?text=BGMI",
      platforms: ["Mobile"],
      publisher: "Krafton",
      releaseDate: "July 2, 2021",
      tournaments: 35,
      status: "Active"
    },
    {
      id: 2,
      title: "Valorant",
      fullTitle: "Valorant",
      image: "https://placehold.co/200/3b0764/e9d5ff?text=VAL",
      platforms: ["PC"],
      publisher: "Riot Games",
      releaseDate: "June 2, 2020",
      tournaments: 28,
      status: "Active"
    },
    {
      id: 3,
      title: "Free Fire",
      fullTitle: "Garena Free Fire",
      image: "https://placehold.co/200/3b0764/e9d5ff?text=FF",
      platforms: ["Mobile"],
      publisher: "Garena",
      releaseDate: "December 4, 2017",
      tournaments: 30,
      status: "Active"
    },
    {
      id: 4,
      title: "COD Mobile",
      fullTitle: "Call of Duty: Mobile",
      image: "https://placehold.co/200/3b0764/e9d5ff?text=CODM",
      platforms: ["Mobile"],
      publisher: "Activision",
      releaseDate: "October 1, 2019",
      tournaments: 20,
      status: "Active"
    },
    {
      id: 5,
      title: "Dota 2",
      fullTitle: "Dota 2",
      image: "https://placehold.co/200/3b0764/e9d5ff?text=DOTA2",
      platforms: ["PC"],
      publisher: "Valve",
      releaseDate: "July 9, 2013",
      tournaments: 15,
      status: "Inactive"
    }
  ];

  // Filter games based on search term and platform filter
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPlatform === 'all' || 
                          game.platforms.some(platform => platform.toLowerCase() === filterPlatform.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  // Table columns configuration
  const columns = [
    { 
      header: 'Game', 
      accessor: 'title',
      cell: (value, row) => (
        <div className="flex items-center">
          <img 
            src={row.image} 
            alt={value} 
            className="w-10 h-10 rounded-lg mr-3"
          />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-gray-400">{row.fullTitle}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Platforms', 
      accessor: 'platforms',
      cell: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.map((platform, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded-full ${
                platform === 'PC' ? 'bg-blue-600' : 
                platform === 'Mobile' ? 'bg-green-600' : 
                platform === 'Console' ? 'bg-purple-600' : 'bg-gray-600'
              } text-white`}
            >
              {platform}
            </span>
          ))}
        </div>
      )
    },
    { header: 'Publisher', accessor: 'publisher' },
    { header: 'Release Date', accessor: 'releaseDate' },
    { header: 'Tournaments', accessor: 'tournaments' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (value) => {
        let bgColor = value === 'Active' ? 'bg-green-600' : 'bg-red-600';
        
        return (
          <span className={`${bgColor} text-white text-xs px-2 py-1 rounded-full`}>
            {value}
          </span>
        );
      }
    },
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
        title="Games Management" 
        description="Add, edit, and manage games"
        actionButton={{
          label: "Add Game",
          icon: <FaPlus />,
          onClick: () => console.log("Add game clicked")
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
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Platforms</option>
            <option value="pc">PC</option>
            <option value="mobile">Mobile</option>
            <option value="console">Console</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <AdminTable 
        columns={columns} 
        data={filteredGames} 
        emptyMessage="No games found"
      />
    </div>
  );
}

export default GamesManagement;
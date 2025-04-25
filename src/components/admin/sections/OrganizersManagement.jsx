import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import AdminTable from '../common/AdminTable';
import AdminPageHeader from '../common/AdminPageHeader';

function OrganizersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for organizers
  const organizers = [
    {
      id: 1,
      name: "ESports Daily",
      logo: "https://placehold.co/200/3b0764/e9d5ff?text=ESD",
      location: "Mumbai, India",
      founded: "2020",
      tournamentsHosted: 45,
      scrimsHosted: 120,
      status: "Active",
      verified: true
    },
    {
      id: 2,
      name: "ESL Gaming",
      logo: "https://placehold.co/200/3b0764/e9d5ff?text=ESL",
      location: "Cologne, Germany",
      founded: "2000",
      tournamentsHosted: 250,
      scrimsHosted: 500,
      status: "Active",
      verified: true
    },
    {
      id: 3,
      name: "NODWIN Gaming",
      logo: "https://placehold.co/200/3b0764/e9d5ff?text=NODWIN",
      location: "Gurugram, India",
      founded: "2014",
      tournamentsHosted: 120,
      scrimsHosted: 200,
      status: "Active",
      verified: true
    },
    {
      id: 4,
      name: "Skyesports",
      logo: "https://placehold.co/200/3b0764/e9d5ff?text=SKY",
      location: "Chennai, India",
      founded: "2018",
      tournamentsHosted: 75,
      scrimsHosted: 150,
      status: "Active",
      verified: true
    },
    {
      id: 5,
      name: "GamingMonk",
      logo: "https://placehold.co/200/3b0764/e9d5ff?text=GM",
      location: "Delhi, India",
      founded: "2014",
      tournamentsHosted: 60,
      scrimsHosted: 90,
      status: "Inactive",
      verified: false
    }
  ];

  // Filter organizers based on search term and status filter
  const filteredOrganizers = organizers.filter(organizer => {
    const matchesSearch = organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          organizer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || organizer.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Table columns configuration
  const columns = [
    { 
      header: 'Organizer', 
      accessor: 'name',
      cell: (value, row) => (
        <div className="flex items-center">
          <img 
            src={row.logo} 
            alt={value} 
            className="w-8 h-8 rounded-full mr-3"
          />
          <span>{value}</span>
          {row.verified && (
            <span className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>
      )
    },
    { header: 'Location', accessor: 'location' },
    { header: 'Founded', accessor: 'founded' },
    { header: 'Tournaments', accessor: 'tournamentsHosted' },
    { header: 'Scrims', accessor: 'scrimsHosted' },
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
        title="Organizers Management" 
        description="Create, edit, and manage organizers"
        actionButton={{
          label: "Add Organizer",
          icon: <FaPlus />,
          onClick: () => console.log("Add organizer clicked")
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
            placeholder="Search organizers..."
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
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <AdminTable 
        columns={columns} 
        data={filteredOrganizers} 
        emptyMessage="No organizers found"
      />
    </div>
  );
}

export default OrganizersManagement;
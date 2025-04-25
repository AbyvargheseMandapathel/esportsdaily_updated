import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye, FaLock, FaUnlock } from 'react-icons/fa';
import AdminTable from '../common/AdminTable';
import AdminPageHeader from '../common/AdminPageHeader';

function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  // Mock data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://placehold.co/200/3b0764/e9d5ff?text=JD",
      role: "Admin",
      status: "Active",
      joinDate: "Jan 15, 2023",
      lastLogin: "Jul 20, 2023"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://placehold.co/200/3b0764/e9d5ff?text=JS",
      role: "Moderator",
      status: "Active",
      joinDate: "Feb 10, 2023",
      lastLogin: "Jul 19, 2023"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      avatar: "https://placehold.co/200/3b0764/e9d5ff?text=RK",
      role: "Organizer",
      status: "Active",
      joinDate: "Mar 5, 2023",
      lastLogin: "Jul 18, 2023"
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      avatar: "https://placehold.co/200/3b0764/e9d5ff?text=PS",
      role: "User",
      status: "Active",
      joinDate: "Apr 20, 2023",
      lastLogin: "Jul 15, 2023"
    },
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "https://placehold.co/200/3b0764/e9d5ff?text=AJ",
      role: "User",
      status: "Suspended",
      joinDate: "May 12, 2023",
      lastLogin: "Jun 30, 2023"
    }
  ];

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Table columns configuration
  const columns = [
    { 
      header: 'User', 
      accessor: 'name',
      cell: (value, row) => (
        <div className="flex items-center">
          <img 
            src={row.avatar} 
            alt={value} 
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-gray-400">{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: 'role',
      cell: (value) => {
        let bgColor = 'bg-gray-600';
        if (value === 'Admin') bgColor = 'bg-red-600';
        if (value === 'Moderator') bgColor = 'bg-blue-600';
        if (value === 'Organizer') bgColor = 'bg-purple-600';
        if (value === 'User') bgColor = 'bg-green-600';
        
        return (
          <span className={`${bgColor} text-white text-xs px-2 py-1 rounded-full`}>
            {value}
          </span>
        );
      }
    },
    { header: 'Join Date', accessor: 'joinDate' },
    { header: 'Last Login', accessor: 'lastLogin' },
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
      cell: (value, row) => (
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
          <button className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
            {row.status === 'Active' ? <FaLock /> : <FaUnlock />}
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <AdminPageHeader 
        title="Users Management" 
        description="Manage user accounts and permissions"
        actionButton={{
          label: "Add User",
          icon: <FaPlus />,
          onClick: () => console.log("Add user clicked")
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="organizer">Organizer</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <AdminTable 
        columns={columns} 
        data={filteredUsers} 
        emptyMessage="No users found"
      />
    </div>
  );
}

export default UsersManagement;
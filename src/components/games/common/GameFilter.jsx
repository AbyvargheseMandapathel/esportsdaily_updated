import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

function GameFilter({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  filterOptions = [
    { value: 'all', label: 'All Games' },
    { value: 'popular', label: 'Popular' },
    { value: 'new', label: 'New Releases' },
    { value: 'tournaments', label: 'Active Tournaments' }
  ],
  className = ''
}) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search games..."
            className="bg-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-gray-700 text-white pl-10 pr-8 py-2 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameFilter;
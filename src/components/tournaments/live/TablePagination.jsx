import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function TablePagination({ currentPage, totalPages, indexOfFirstTeam, indexOfLastTeam, totalTeams, paginate }) {
  return (
    <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
      <div className="hidden sm:flex sm:items-center">
        <p className="text-sm text-gray-400">
          Showing {indexOfFirstTeam + 1}-{Math.min(indexOfLastTeam, totalTeams)} of {totalTeams} teams
        </p>
      </div>
      
      <div className="flex items-center justify-end space-x-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Prev
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          // Only show current page, first, last, and pages around current
          const pageNum = index + 1;
          const isVisible = 
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
            
          if (!isVisible) {
            // Show ellipsis for skipped pages, but only once
            if (pageNum === 2 || pageNum === totalPages - 1) {
              return (
                <span key={index} className="px-2 py-1 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          }
          
          return (
            <button
              key={index}
              onClick={() => paginate(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? 'bg-yellow-500 text-white font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Next
        </button>
      </div>
      
      {/* Mobile pagination */}
      <div className="sm:hidden text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default TablePagination;
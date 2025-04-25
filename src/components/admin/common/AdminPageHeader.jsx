import React from 'react';

function AdminPageHeader({ title, description, actionButton }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && <p className="text-gray-400 mt-1">{description}</p>}
      </div>
      
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
          {actionButton.label}
        </button>
      )}
    </div>
  );
}

export default AdminPageHeader;
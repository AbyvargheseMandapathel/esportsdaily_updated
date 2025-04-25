import React from 'react';
import { Link } from 'react-router-dom';

function TagsSection({ tags }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link 
            key={tag} 
            to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-gray-700 hover:bg-purple-700 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TagsSection;
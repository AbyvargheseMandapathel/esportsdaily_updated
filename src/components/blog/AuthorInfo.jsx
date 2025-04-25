import React from 'react';
import { Link } from 'react-router-dom';

function AuthorInfo({ author }) {
  return (
    <div className="flex items-center">
      <Link to={`/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center group">
        <img 
          src={author.avatar} 
          alt={author.name} 
          className="w-12 h-12 rounded-full mr-4 border-2 border-transparent group-hover:border-purple-500 transition-all duration-200"
        />
        <div>
          <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors duration-200">
            {author.name}
          </h3>
          <p className="text-gray-400 text-sm">{author.role}</p>
        </div>
      </Link>
    </div>
  );
}

export default AuthorInfo;
import React from 'react';
import { Link } from 'react-router-dom';

function SimilarPostsSection({ posts }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Similar Posts</h3>
      <div className="space-y-4">
        {posts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="block">
            <div className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-purple-400">{post.category}</span>
                <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimilarPostsSection;
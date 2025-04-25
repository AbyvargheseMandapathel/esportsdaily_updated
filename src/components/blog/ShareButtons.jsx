import React from 'react';
import { FaTwitter, FaFacebook, FaReddit, FaLink } from 'react-icons/fa';

function ShareButtons({ title }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Share this article</h3>
      <div className="flex space-x-3">
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] hover:bg-opacity-80 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={18} />
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4267B2] hover:bg-opacity-80 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={18} />
        </a>
        <a 
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF4500] hover:bg-opacity-80 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Share on Reddit"
        >
          <FaReddit size={18} />
        </a>
        <button 
          onClick={handleCopyLink}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Copy link"
        >
          <FaLink size={18} />
        </button>
      </div>
    </div>
  );
}

export default ShareButtons;
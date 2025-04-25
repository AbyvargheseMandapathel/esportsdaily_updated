import React from 'react';
import { FaDesktop, FaMobileAlt, FaPlaystation, FaXbox, FaGamepad } from 'react-icons/fa';

function PlatformIcons({ platforms, className = "text-gray-300" }) {
  if (!platforms || platforms.length === 0) return null;
  
  return (
    <div className="flex space-x-2">
      {platforms.map((platform, index) => {
        let icon;
        switch (platform.toLowerCase()) {
          case 'pc':
            icon = <FaDesktop key={index} title="PC" className={className} />;
            break;
          case 'mobile':
            icon = <FaMobileAlt key={index} title="Mobile" className={className} />;
            break;
          case 'playstation':
            icon = <FaPlaystation key={index} title="PlayStation" className={className} />;
            break;
          case 'xbox':
            icon = <FaXbox key={index} title="Xbox" className={className} />;
            break;
          default:
            icon = <FaGamepad key={index} title={platform} className={className} />;
        }
        return icon;
      })}
    </div>
  );
}

export default PlatformIcons;
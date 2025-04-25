import React from 'react';

function GameBadge({ text, color = "purple", size = "md", className = "" }) {
  const colorClasses = {
    purple: "bg-purple-600 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
    yellow: "bg-yellow-500 text-black",
    gray: "bg-gray-600 text-white",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
  };

  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5 rounded",
    sm: "text-xs px-2 py-1 rounded",
    md: "text-sm px-2.5 py-1 rounded-md",
    lg: "text-sm px-3 py-1.5 rounded-md",
    xl: "text-base px-4 py-2 rounded-lg"
  };

  const classes = `${colorClasses[color] || colorClasses.purple} ${sizeClasses[size] || sizeClasses.md} font-bold ${className}`;

  return (
    <span className={classes}>
      {text}
    </span>
  );
}

export default GameBadge;
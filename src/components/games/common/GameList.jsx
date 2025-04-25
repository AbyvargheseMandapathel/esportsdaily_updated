import React from 'react';
import GameCard from './GameCard';

function GameList({ 
  games, 
  variant = 'default', 
  columns = { 
    sm: 1, 
    md: 2, 
    lg: 3 
  },
  className = '',
  emptyMessage = 'No games found'
}) {
  if (!games || games.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  const getGridClasses = () => {
    const cols = {
      sm: `grid-cols-${columns.sm || 1}`,
      md: `md:grid-cols-${columns.md || 2}`,
      lg: `lg:grid-cols-${columns.lg || 3}`
    };
    return `grid ${cols.sm} ${cols.md} ${cols.lg} gap-6`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {games.map(game => (
        <GameCard 
          key={game.id} 
          game={game} 
          variant={variant}
        />
      ))}
    </div>
  );
}

export default GameList;
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorDisplay from '../../common/ErrorDisplay';

function TournamentLayout({ 
  tournament, 
  loading, 
  error, 
  children,
  leftColumn,
  rightColumn
}) {
  // Handle loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading tournament details..." />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  // Handle tournament not found
  if (!tournament) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Tournament Not Found</h2>
          <p className="text-gray-400 mb-6">The tournament you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/tournaments" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Browse All Tournaments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Helmet>
        <title>{tournament.title} | Esports Daily</title>
        <meta name="description" content={tournament.description} />
      </Helmet>

      {children}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {leftColumn}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            {rightColumn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentLayout;
import React from 'react';
import OrganizerEventCard from './OrganizerEventCard';

function OrganizerEvents({ events, title, isPast = false }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(event => (
            <OrganizerEventCard 
              key={event.id} 
              event={event} 
              isPast={isPast} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-300">No {isPast ? 'past' : 'upcoming'} events at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default OrganizerEvents;
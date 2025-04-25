import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ScrimRules({ scrim }) {
  if (!scrim || !scrim.rules) return null;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <FaShieldAlt className="text-purple-400 mr-2 text-xl" />
        <h2 className="text-xl font-bold text-white">Rules & Format</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Format</h3>
        <p className="text-gray-300 mb-6">{scrim.format}</p>
        
        <h3 className="text-lg font-bold text-white mb-3">Point System</h3>
        <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-600">
              {scrim.pointSystem && scrim.pointSystem.map((point, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {point.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {point.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-white mb-3">Rules</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {scrim.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      
      {/* Organizer information with link */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-bold text-white mb-3">Organized by</h3>
        <Link 
          to={`/organizers/${scrim.organizer.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center bg-gray-700 hover:bg-gray-600 transition-colors p-3 rounded-lg"
        >
          {scrim.organizerLogo && (
            <img 
              src={scrim.organizerLogo} 
              alt={scrim.organizer} 
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <span className="text-white font-medium">{scrim.organizer}</span>
        </Link>
      </div>
    </div>
  );
}

export default ScrimRules;
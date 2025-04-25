import React from 'react';

function PointsTable({ teams }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Rank
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Team Name
            </th>
            {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Group
            </th> */}
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Matches
            </th>
            {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Damage
            </th> */}
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Pos. Pts.
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fin. Pts.
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Tot. Pts.
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {teams.map((team) => (
            <tr key={team.rank} className="hover:bg-gray-700 transition-colors duration-150">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white font-bold">
                  {team.rank}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full mr-2" src={team.logo} alt={team.name} />
                  <div className="text-sm font-medium text-white">{team.name}</div>
                </div>
              </td>
              {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {team.group}
              </td> */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {team.matches}
              </td>
              {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {team.damage}
              </td> */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {team.positionPts}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {team.finishPts}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-bold text-yellow-500">
                  {team.totalPts}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PointsTable;
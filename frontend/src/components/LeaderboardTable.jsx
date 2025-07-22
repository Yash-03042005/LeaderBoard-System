// src/components/LeaderboardTable.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LeaderboardTable = () => {
  const { users } = useContext(AppContext);

  // Sort users by totalPoints in descending order
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="mt-10 mb-10 px-4 w-full flex justify-center">
      <div className="w-full max-w-4xl overflow-x-auto shadow-lg rounded-lg border border-gray-300 bg-white">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-gradient-to-r from-blue-200 to-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">🏆 Rank</th>
              <th className="py-3 px-4 border-b">👤 Name</th>
              <th className="py-3 px-4 border-b">📊 Total Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-blue-50 transition-all duration-200"
              >
                <td className="py-3 px-4 border-b font-semibold">{index + 1}</td>
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b text-blue-700 font-medium">
                  {user.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;

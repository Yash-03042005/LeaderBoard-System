import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { claimHistory, getAllClaimHistory } = useContext(AppContext);

  useEffect(() => {
    getAllClaimHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-900 transition"
          >
            🔙 Back to Home
          </button>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">
          📜 Points Claimed History
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Latest claim history entries appear first.
        </p>

        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white rounded-xl text-sm text-gray-700">
            <thead>
              {/* First Header Row for grouping */}
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4" rowSpan="2">#</th>
                <th className="py-2 px-4" rowSpan="2">User</th>
                <th className="py-2 px-4" rowSpan="2">Points</th>
                <th className="py-2 px-4 text-center" colSpan="2">Claimed At</th>
              </tr>

              {/* Second Header Row */}
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {claimHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No history available
                  </td>
                </tr>
              ) : (
                [...claimHistory].reverse().map((item, index) => {
                  const claimedDate = new Date(item.claimedAt);
                  const date = claimedDate.toLocaleDateString();
                  const time = claimedDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr
                      key={item._id}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 capitalize">{item.userName || 'Unknown'}</td>
                      <td className="py-3 px-4 font-semibold">{item.pointsClaimed}</td>
                      <td className="py-3 px-4">{date}</td>
                      <td className="py-3 px-4">{time}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

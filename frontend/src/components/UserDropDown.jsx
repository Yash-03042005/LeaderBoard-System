import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserDropdown = () => {
  const { users, backendUrl, getAllUsers } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState("");

  const selectedUser = users.find(user => user._id === selectedUserId);

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user before claiming points");
      return;
    }

    try {
      const { data } = await axios.post(backendUrl + '/api/user/claim-points', { userId: selectedUserId });
      if (data.success) {
        toast.success(data.message);

        const pointsClaimed = data.claimedPoints || 0;

        if (pointsClaimed > 0) {
          await axios.post(backendUrl + '/api/user/create-history', {
            userId: selectedUserId,
            pointsClaimed: pointsClaimed
          });
        }

        await getAllUsers();
        setSelectedUserId("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 my-6">
      {/* Wrapper for buttons and content */}
      <div className="flex flex-col items-center gap-4">

        {/* Add User + Claim History buttons */}
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/add-user")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            ➕ Add User
          </button>
          <button
            onClick={() => navigate("/claim-history")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            📜 Claim History
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center">
          🎯 Select a User to Claim Points and Climb the Leaderboard!
        </h2>

        {/* User Dropdown */}
        <div className="w-full flex justify-center">
          <select
            className="border border-gray-300 p-2 rounded-md shadow-md w-full sm:w-64 text-gray-700"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Selected User & Claim Button */}
      {selectedUser && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <span className="text-lg font-semibold text-blue-800">
            Selected User: {selectedUser.name}
          </span>
          <button
            onClick={handleClaimPoints}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            🎯 Claim Points
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

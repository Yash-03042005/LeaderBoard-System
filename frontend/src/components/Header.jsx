// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 shadow-md mb-10">
      <button onClick={() => navigate('/')} className="w-full focus:outline-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center  transition duration-300">
          🏆 Claim & Climb: The Live Leaderboard System
        </h1>
      </button>
    </div>
  );
};

export default Header;

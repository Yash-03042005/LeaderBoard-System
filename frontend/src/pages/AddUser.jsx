import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUser = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { backendUrl, getAllUsers } = useContext(AppContext);

  const handleAdd = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/add-user', { name });

      if (data.success) {
        toast.success(data.message);
        setName("");
        await getAllUsers();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Header />

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center lg:justify-end">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded shadow-md transition"
        >
          🔙 Back to Home
        </button>
      </div>

      {/* Form Card */}
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-blue-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          ➕ Add a New User
        </h2>

        <input
          type="text"
          placeholder="Enter user name"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 rounded-lg mb-6 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          🚀 Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;

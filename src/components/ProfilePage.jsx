// src/components/ProfilePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <img
        src="/assets/images/profile.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-white mb-4"
      />
      <h1 className="text-xl font-semibold mb-2">Username</h1>
      <p className="text-gray-400 text-center mb-6">
        This is a dummy profile page.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
      >
        Back to Reels
      </button>
    </div>
  );
};

export default ProfilePage;

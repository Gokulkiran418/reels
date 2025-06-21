// src/components/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('userID', username);
      onLogin(username);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md space-y-4">
        <h1 className="text-lg font-bold">Login</h1>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 text-black rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

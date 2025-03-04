import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { account } from '../../appwriteConfig';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const { user, logoutUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (currentPassword && newPassword) {
        await account.updatePassword(newPassword, currentPassword);
        setMessage('Password updated successfully!');
      } else {
        setMessage('Please enter both current and new passwords.');
      }
    } catch (error) {
      setMessage('Error updating password: ' + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-2 text-white space-y-2">
      <h2 className="text-3xl font-bold text-[#D82934]">Settings</h2>
      <p className="text-gray-400">Manage your account details.</p>

      {message && <p className="text-green-500 p-2">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 pb-1">Name</label>
          <input
            type="text"
            value={name}
            disabled
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-400 border border-gray-600 rounded-lg focus:ring-4 focus:ring-[#D82934]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 pb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 bg-gray-700 text-gray-400 border border-gray-600 rounded-lg"
          />
        </div>

    
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 pb-1">Current Password</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-4 focus:ring-[#D82934] pr-10"
            placeholder="Enter current password"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-4 top-9 text-gray-400 hover:text-white"
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 pb-1">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-4 focus:ring-[#D82934] pr-10"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-9 text-gray-400 hover:text-white"
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#D82934] hover:bg-[#b71f2a] px-4 py-2 rounded-lg text-white font-semibold shadow-md focus:ring-4 focus:ring-[#D82934]"
        >
          Update Profile
        </button>
      </form>

      <button
        onClick={logoutUser}
        className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;

import React from 'react';

const Settings = () => (
  <div className="bg-gray-100 min-h-screen p-4">
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h1>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile Settings</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
            <input id="name" type="text" className="w-full border-gray-300 rounded-lg p-2" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
            <input id="email" type="email" className="w-full border-gray-300 rounded-lg p-2" placeholder="john.doe@example.com" />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="bio" className="block text-gray-600 mb-1">Bio</label>
          <textarea id="bio" rows="4" className="w-full border-gray-300 rounded-lg p-2" placeholder="Write a short bio..."></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Save Changes</button>
      </form>
    </div>
  </div>
);

export default Settings;

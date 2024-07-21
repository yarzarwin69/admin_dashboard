import React from 'react';

const Tables = () => (
  <div className="bg-gray-100 min-h-screen p-4">
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Tables</h1>
    <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Doe</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.doe@example.com</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-blue-500 hover:text-blue-700">Edit</button>
              <button className="ml-4 text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  </div>
);

export default Tables;

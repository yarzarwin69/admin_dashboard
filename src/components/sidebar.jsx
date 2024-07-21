import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="h-screen bg-gray-800 text-white w-64 fixed">
    <div className="flex items-center justify-center mt-10">
      <div className="text-white text-3xl font-semibold">MyApp</div>
    </div>
    <nav className="mt-10">
      <NavLink to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" activeClassName="bg-gray-700">Dashboard</NavLink>
      <NavLink to="/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" activeClassName="bg-gray-700">Categories</NavLink>
      <NavLink to="/subcategories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" activeClassName="bg-gray-700">Subcategories</NavLink>
      <NavLink to="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" activeClassName="bg-gray-700">Settings</NavLink>
      <NavLink to="/tables" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" activeClassName="bg-gray-700">Tables</NavLink>
    </nav>
  </div>
);

export default Sidebar;

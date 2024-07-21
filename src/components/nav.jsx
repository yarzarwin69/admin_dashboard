import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="bg-gray-800 text-white flex items-center justify-between p-4">
    <div className="text-2xl font-semibold">Admin Panel</div>
    <div className="flex items-center space-x-4">
      <Link to="/login" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <span>Login</span>
      </Link>
      <Link to="/signup" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <span>Sign Up</span>
      </Link>
    </div>
  </nav>
);

export default Nav;

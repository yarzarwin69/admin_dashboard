import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 mt-auto">
    <div className="container mx-auto flex justify-between items-center px-4">
      <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default Footer;

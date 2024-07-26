import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Nav from './components/nav';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Category from './pages/categories/Category';
import Brands from './pages/brands/Brands';
import Subcategory from './pages/subcategories/SubCategory';
import Product from './pages/products/Products';
import './style.css';



const App = () => {
  

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Nav />
          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/categories/*" element={<Category />} />
              <Route path="/subcategories/*" element={<Subcategory />} />
              {/* Redirect from root to dashboard */}
              <Route path="/brands/*" element={<Brands />} /> 
              <Route path="/products/*" element={<Product />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

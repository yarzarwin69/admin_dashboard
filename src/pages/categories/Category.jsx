import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import CategoryDetails from './CategoryDetails';

const Category = () => {
  return (
      <div className="p-4">
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="new" element={<CategoryForm />} />
          <Route path="edit/:id" element={<CategoryForm />} />
          <Route path=":id" element={<CategoryDetails />} />
        </Routes>
      </div>
  );
};

export default Category;

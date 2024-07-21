import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(cat => cat.id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Categories</h1>
      <Link to="/add-category">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6">Add Category</button>
      </Link>
      <ul className="space-y-6">
        {categories.map(category => (
          <li key={category.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="flex space-x-2">
                <Link to={`/edit-category/${category.id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="space-y-4">
              {category.subcategories.map(sub => (
                <li key={sub.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="text-xl font-semibold">{sub.name}</h3>
                  <p className="text-gray-500">{sub.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

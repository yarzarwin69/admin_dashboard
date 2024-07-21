import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryForm = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    image_url: '',
    subcategories: []
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/categories/${id}`)
        .then(response => setCategory(response.data))
        .catch(error => console.error('Error fetching category:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3001/categories/${id}`, category)
        .then(() => navigate('/categories'))  // Redirect to Categories page
        .catch(error => console.error('Error updating category:', error));
    } else {
      axios.post('http://localhost:3001/categories', category)
        .then(() => navigate('/categories'))  // Redirect to Categories page
        .catch(error => console.error('Error creating category:', error));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Category' : 'Add Category'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={category.image_url}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

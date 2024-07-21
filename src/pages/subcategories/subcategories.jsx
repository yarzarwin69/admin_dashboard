// SubcategoriesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubcategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when component mounts
    axios.get('http://localhost:3001/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch subcategories when a category is selected
      axios.get(`http://localhost:3001/categories/${selectedCategory}/subcategories`)
        .then(response => setSubcategories(response.data))
        .catch(error => console.error('Error fetching subcategories:', error));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    navigate(`/categories/${categoryId}/subcategories`); // Optional: navigate to detailed view if needed
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Select a Category</h1>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category:</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">-- Select a Category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <>
          <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {subcategories.map(sub => (
              <li key={sub.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center">
                <img 
                  src={sub.image_url} 
                  alt={sub.name} 
                  className="w-40 h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">{sub.name}</h3>
                  <p className="text-gray-500">{sub.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SubcategoriesPage;

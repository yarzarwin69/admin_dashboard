import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/categories/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setCategories(categories.filter(category => category.id !== id));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Link to="/categories/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add Category</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <div key={category.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={category.image_url} alt={category.name} className="h-48 w-full object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-2">{category.description}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/categories/${category.id}`} className="text-blue-500">View</Link>
                <div className="flex space-x-2">
                  <Link to={`/categories/edit/${category.id}`} className="text-yellow-500">Edit</Link>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

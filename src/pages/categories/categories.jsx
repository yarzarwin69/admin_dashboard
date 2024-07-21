import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate();

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

  const handleSeeMore = (categoryId) => {
    navigate(`/catDetails/${categoryId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <Link to="/add-category">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">Add Category</button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <div key={category.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col relative">
            <img 
              src={category.image_url} 
              alt={category.name} 
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between">
                <Link to={`/edit-category/${category.id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                </Link>
                {!category.subcategories.length ? (
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-3 py-1 rounded cursor-not-allowed"
                  >
                    Cannot Delete
                  </button>
                )}
              </div>
              {category.subcategories.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Subcategories:</h3>
                  <ul className="space-y-2">
                    {category.subcategories.slice(0, expandedCategories[category.id] ? undefined : 2).map(sub => (
                      <li key={sub.id} className="flex items-center space-x-4">
                        <img 
                          src={sub.image_url} 
                          alt={sub.name} 
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">{sub.name}</h4>
                          <p className="text-gray-500 text-sm">{sub.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {category.subcategories.length > 2 && (
                    <button 
                      onClick={() => handleSeeMore(category.id)} 
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      See More
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

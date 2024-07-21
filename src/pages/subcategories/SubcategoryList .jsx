import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/categories/${categoryId}/subcategories`)
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
    
    // Optionally fetch category details
    axios.get(`http://localhost:3001/categories/${categoryId}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error));
  }, [categoryId]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/categories/${categoryId}/subcategories/${id}`)
      .then(() => setSubcategories(subcategories.filter(sub => sub.id !== id)))
      .catch(error => console.error('Error deleting subcategory:', error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Subcategories</h1>
      <Link to={`/categories/${categoryId}/add-subcategory`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">Add Subcategory</button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subcategories.map(sub => (
          <div key={sub.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col relative">
            <img 
              src={sub.image_url} 
              alt={sub.name} 
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{sub.name}</h2>
              <p className="text-gray-600 mb-4">{sub.description}</p>
              <div className="flex justify-between">
                <Link to={`/categories/${categoryId}/edit-subcategory/${sub.id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryList;

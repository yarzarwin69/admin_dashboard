import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SubcategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        const allSubcategories = data.flatMap(category => category.subcategories.map(sub => ({ ...sub, category_id: category.id, category_name: category.name })));
        setSubcategories(allSubcategories);
      });
  }, []);

  const handleDelete = (categoryId, subcategoryId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.filter(sub => sub.id !== subcategoryId)
        };
      }
      return category;
    });

    fetch(`http://localhost:3001/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategories.find(category => category.id === categoryId))
    }).then(() => {
      setCategories(updatedCategories);
      setSubcategories(updatedCategories.flatMap(category => category.subcategories.map(sub => ({ ...sub, category_id: category.id, category_name: category.name }))));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
      <Link to="/subcategories/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add Subcategory</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories.map(subcategory => (
          <div key={subcategory.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={subcategory.image_url} alt={subcategory.name} className="h-48 w-full object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{subcategory.name}</h2>
              <p className="text-gray-600 mb-2">{subcategory.description}</p>
              <p className="text-gray-600 mb-2">Category: {subcategory.category_name}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/subcategories/${subcategory.id}`} className="text-blue-500">View</Link>
                <div className="flex space-x-2">
                  <Link to={`/subcategories/edit/${subcategory.id}`} className="text-yellow-500">Edit</Link>
                  <button onClick={() => handleDelete(subcategory.category_id, subcategory.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryList;

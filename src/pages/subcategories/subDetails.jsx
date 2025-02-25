import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddSubcategoryForm from './addcategoryform';
const SeeMorePage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError('Failed to fetch category details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubcategoryAdded = (newSubcategory) => {
    setCategory(prevCategory => ({
      ...prevCategory,
      subcategories: [...prevCategory.subcategories, newSubcategory]
    }));
  };

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen text-red-600">{error}</div>;
  }

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="text-gray-600 mb-4">{category.description}</p>
      <img 
        src={category.image_url} 
        alt={category.name} 
        className="w-48 h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {category.subcategories && category.subcategories.length > 0 ? (
          category.subcategories.map(sub => (
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
          ))
        ) : (
          <p className="text-gray-500">No subcategories available</p>
        )}
      </ul>

      {/* Add Subcategory Form */}
      <AddSubcategoryForm categoryId={categoryId} onSubcategoryAdded={handleSubcategoryAdded} />
    </div>
  );
};

export default SeeMorePage;

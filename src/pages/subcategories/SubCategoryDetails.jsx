import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubcategoryDetails = () => {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/categories`)
      .then(response => response.json())
      .then(data => {
        const category = data.find(category => category.subcategories.some(sub => sub.id === parseInt(id)));
        if (category) {
          setSubcategory(category.subcategories.find(sub => sub.id === parseInt(id)));
        }
      });
  }, [id]);

  if (!subcategory) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{subcategory.name}</h1>
      <img src={subcategory.image_url} alt={subcategory.name} className="h-64 w-full object-cover mb-4"/>
      <p>{subcategory.description}</p>
      <Link to="/subcategories" className="text-blue-500 mt-4 inline-block">Back to Subcategories</Link>
    </div>
  );
};

export default SubcategoryDetails;

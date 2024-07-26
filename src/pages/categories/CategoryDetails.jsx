import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/categories/${id}`)
      .then(response => response.json())
      .then(data => setCategory(data));
  }, [id]);

  if (!category) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <img src={category.image_url} alt={category.name} className="h-64 w-full object-cover mb-4"/>
      <p>{category.description}</p>
      <Link to="/categories" className="text-blue-500 mt-4 inline-block">Back to Categories</Link>
    </div>
  );
};

export default CategoryDetails;

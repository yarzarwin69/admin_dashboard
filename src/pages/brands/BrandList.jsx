import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/brands')
      .then(response => response.json())
      .then(data => setBrands(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/brands/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setBrands(brands.filter(brand => brand.id !== id));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      <Link to="/brands/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add Brand</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(brand => (
          <div key={brand.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-2">
            <img src={brand.logo_url} alt={`${brand.name} logo`} className="h-32 w-full object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{brand.name}</h2>
              <p className="text-gray-600 mb-4">{brand.description}</p>
              <div className="flex justify-between items-center">
                <Link to={`/brands/${brand.id}`} className="text-blue-500">View</Link>
                <div className="flex space-x-2">
                  <Link to={`/brands/edit/${brand.id}`} className="text-yellow-500">Edit</Link>
                  <button onClick={() => handleDelete(brand.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;

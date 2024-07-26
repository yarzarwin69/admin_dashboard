import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BrandDetails = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/brands/${id}`)
      .then(response => response.json())
      .then(data => setBrand(data));
  }, [id]);

  if (!brand) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{brand.name}</h1>
      <p>{brand.description}</p>
      {brand.logo_url && <img src={brand.logo_url} alt={`${brand.name} logo`} className="h-16 w-16"/>}
      <Link to="/brands" className="text-blue-500">Back to Brands</Link>
    </div>
  );
};

export default BrandDetails;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setProducts(products.filter(product => product.id !== id));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link to="/products/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add Product</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

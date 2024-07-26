import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const colors = product.colors ? product.colors.map(color => color.code).join(', ') : '';

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={product.image_url} alt={`${product.name}`} className="h-48 w-full object-cover"/>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-2">${product.price}</p>
        {product.discount && <p className="text-red-500 mb-2">Discount: {product.discount}%</p>}
        <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
        {product.sizes && (
          <div className="mb-2">
            <span className="font-bold">Sizes: </span>
            {product.sizes.join(', ')}
          </div>
        )}
        {product.colors && (
          <div className="mb-2">
            <span className="font-bold">Colors: </span>
            {product.colors.map(color => (
              <span key={color.code} style={{ backgroundColor: color.code }} className="inline-block w-4 h-4 rounded-full mr-1"></span>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <Link to={`/products/${product.id}`} className="text-blue-500">View</Link>
          <div className="flex space-x-2">
            <Link to={`/products/edit/${product.id}`} className="text-yellow-500">Edit</Link>
            <button onClick={() => onDelete(product.id)} className="text-red-500">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

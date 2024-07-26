import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="h-64 w-full object-cover mb-4"/>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.price}</p>
      {product.discount && <p className="text-red-500">Discount: {product.discount}%</p>}
      <p>Brand: {product.brand}</p>
      {product.sizes && (
        <div>
          <span className="font-bold">Sizes: </span>
          {product.sizes.join(', ')}
        </div>
      )}
      {product.colors && (
        <div>
          <span className="font-bold">Colors: </span>
          {product.colors.map(color => (
            <span key={color.code} style={{ backgroundColor: color.code }} className="inline-block w-4 h-4 rounded-full mr-1"></span>
          ))}
        </div>
      )}
      <Link to="/products" className="text-blue-500 mt-4 inline-block">Back to Products</Link>
    </div>
  );
};

export default ProductDetails;
